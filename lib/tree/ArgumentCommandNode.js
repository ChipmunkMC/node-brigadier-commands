const CommandNode = require('./CommandNode.js')
const StringReader = require('../StringReader.js')
const { ParsedArgument } = require('../context')

const USAGE_ARGUMENT_OPEN = '<'
const USAGE_ARGUMENT_CLOSE = '>'

class ArgumentCommandNode extends CommandNode {
  constructor ({ name, type, command, requirement, redirect, modifier, forks, customSuggestions }) {
    super({ command, requirement, redirect, modifier, forks })
    this.name = name
    this.type = type
    this.customSuggestions = customSuggestions
  }

  getUsageText () { return USAGE_ARGUMENT_OPEN + this.name + USAGE_ARGUMENT_CLOSE }

  parse (reader, contextBuilder) {
    const start = reader.cursor
    const result = this.type.parse(reader)
    const parsed = new ParsedArgument(start, reader.cursor, result)

    contextBuilder.withArgument(this.name, parsed)
    contextBuilder.withNode(this, parsed.range)
  }

  async listSuggestions (context, builder) {
    if (this.customSuggestions == null) return this.type.listSuggestions(context, builder)
    return this.customSuggestions()
  }

  // TODO: createBuilder () {}

  isValidInput (input) {
    try {
      const reader = new StringReader(input)
      this.type.parse(reader)
      return !reader.canRead() || reader.peek() === ' '
    } catch { return false }
  }

  equals (that) {
    if (this === that) return true
    if (!(this instanceof ArgumentCommandNode)) return false

    if (this.name !== that.name) return false
    if (!this.type.equals(that.type)) return false
    return super.equals(that)
  }

  getSortedKey () { return this.name }

  getExamples () { return this.type.getExamples() }

  toString () { return `<argument ${this.name}:${this.type}>` }
}

module.exports = ArgumentCommandNode
