const ArgumentBuilder = require('./ArgumentBuilder.js')
const { ArgumentCommandNode } = require('../tree')

class RequiredArgumentBuilder extends ArgumentBuilder {
  suggestionsProvider = null

  constructor (name, type) {
    super()
    this.name = name
    this.type = type
  }

  static argument (name, type) {
    return new RequiredArgumentBuilder(name)
  }

  build () {
    const result = new ArgumentCommandNode({
      literal: this.literal,
      command: this.command,
      requirement: this.requirement,
      redirect: this.target,
      modifier: this.modifier,
      forks: this.forks,
      customSuggestions: this.suggestionsProvider
    })

    for (const argument of this.getArguments()) {
      result.addChild(argument)
    }

    return result
  }
}

module.exports = RequiredArgumentBuilder
