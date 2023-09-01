const CommandNode = require('./CommandNode.js')
const StringReader = require('../StringReader.js')
const { CommandSyntaxException } = require('../exceptions')
const { StringRange } = require('../context')

class LiteralCommandNode extends CommandNode {
  constructor ({ literal, command, requirement, redirect, modifier, forks }) {
    super({ command, requirement, redirect, modifier, forks })
    this.literal = literal
    this.literalLowerCase = literal.toLowerCase()
  }

  get name () { return this.literal }

  parse (reader, contextBuilder) {
    const start = reader.cursor
    const end = this.#parse(reader)
    if (end > -1) {
      contextBuilder.withNode(this, StringRange.between(start, end))
      return
    }

    throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.literalIncorrect.createWithContext(reader, this.literal)
  }

  #parse (reader) {
    const start = reader.cursor
    if (reader.canRead(this.literal.length)) {
      const end = start + this.literal.length
      if (reader.string.substring(start, end) === this.literal) {
        reader.cursor = end
        if (!reader.canRead() || reader.peek() === ' ') return end
        else reader.cursor = start
      }
    }
    return -1
  }

  // TODO: async listSuggestions

  isValidInput (input) { return this.#parse(new StringReader(input)) > -1 }

  equals (that) {
    if (this === that) return true
    if (!(that instanceof LiteralCommandNode)) return false

    if (this.literal !== that.literal) return false
    return super.equals(that)
  }

  getUsageText () { return this.literal }

  // TODO: hashCode

  // TODO: createBuilder

  getSortedKey () { return this.literal }

  getExamples () { return [this.literal] }

  toString () { return `<literal ${this.literal}>` }
}

module.exports = LiteralCommandNode
