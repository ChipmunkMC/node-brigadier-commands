class CommandContext {
  constructor ({ source, input, arguments: _arguments, command, rootNode, nodes, range, child, modifier, forks }) {
    this.source = source
    this.input = input
    this.arguments = _arguments
    this.command = command
    this.rootNode = rootNode
    this.nodes = nodes
    this.range = range
    this.child = child
    this.modifier = modifier
    this.forks = forks
  }

  copyFor (source) {
    if (this.source === source) return this

    return new CommandContext({
      source,
      input: this.input,
      arguments: this.arguments,
      command: this.command,
      rootNode: this.rootNode,
      nodes: this.nodes,
      range: this.range,
      child: this.child,
      modifier: this.modifier,
      forks: this.forks
    })
  }

  getLastChild () {
    let result = this
    while (result.child != null) result = result.getChild()
    return result
  }

  getArgument (name) {
    const argument = this.arguments[name]

    if (argument == null) {
      throw new ReferenceError(`No such argument '${name}' exists on this command`)
    }

    return argument
  }
}

module.exports = CommandContext
