const ArgumentBuilder = require('./ArgumentBuilder.js')
const { LiteralCommandNode } = require('../tree')

class LiteralArgumentBuilder extends ArgumentBuilder {
  constructor (literal) {
    super()
    this.literal = literal
  }

  static literal (name) {
    return new LiteralArgumentBuilder(name)
  }

  build () {
    const result = new LiteralCommandNode({
      literal: this.literal,
      command: this.command,
      requirement: this.requirement,
      redirect: this.target,
      modifier: this.modifier,
      forks: this.forks
    })

    for (const argument of this.getArguments()) {
      result.addChild(argument)
    }

    return result
  }
}

module.exports = LiteralArgumentBuilder
