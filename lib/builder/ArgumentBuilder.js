const { RootCommandNode } = require('../tree')

class ArgumentBuilder {
  arguments = new RootCommandNode()
  requirement = s => true
  modifier = null

  then (argument) {
    if (argument instanceof ArgumentBuilder) argument = argument.build()

    if (this.target != null) throw new Error('Cannot add children to a redirected node')
    this.arguments.addChild(argument)
    return this
  }

  getArguments () { return this.arguments.getChildren() }

  executes (command) {
    this.command = command
    return this
  }

  requires (requirement) {
    this.requirement = requirement
    return this
  }

  redirect (target, modifier = null, fork = false) {
    if (this.arguments.getChildren().length !== 0) throw new Error('Cannot forward a node with children')

    let _modifier = null
    if (modifier != null) {
      _modifier = s => {
        const result = modifier(s)
        return Array.isArray(result) ? result : [result]
      }
    }

    this.target = target
    this.modifier = _modifier
    this.forks = fork
    return this
  }
}

module.exports = ArgumentBuilder
