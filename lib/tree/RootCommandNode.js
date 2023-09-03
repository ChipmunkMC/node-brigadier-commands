const CommandNode = require('./CommandNode.js')
const { Suggestions } = require('../suggestion')

class RootCommandNode extends CommandNode {
  constructor () { super({ command: null, requirement: () => true, redirect: null }) }

  get name () { return '' }

  getUsageText () { return '' }

  parse (reader, contextBuilder) {}

  async listSuggestions (context, builder) {
    return Suggestions.empty()
  }

  isValidInput (input) { return false }

  equals (that) {
    if (this === that) return true
    if (!(this instanceof RootCommandNode)) return false
    return super.equals(that)
  }

  createBuilder () { throw new TypeError('Cannot convert root into a builder') }

  getSortedKey () { return '' }

  getExamples () { return [] }

  toString () { return '<root>' }
}

module.exports = RootCommandNode
