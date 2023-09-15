const StringRange = require('./StringRange.js')
const ParsedCommandNode = require('./ParsedCommandNode.js')
const CommandContext = require('./CommandContext.js')
const SuggestionContext = require('./SuggestionContext.js')

class CommandContextBuilder {
  arguments = Object.create(null)
  nodes = []
  modifier = null
  forks = false

  constructor (dispatcher, source, rootNode, start) {
    this.rootNode = rootNode
    this.dispatcher = dispatcher
    this.source = source
    this.range = StringRange.at(start)
  }

  withSource (source) {
    this.source = source
    return this
  }

  withArgument (name, argument) {
    this.arguments[name] = argument
    return this
  }

  withCommand (command) {
    this.command = command
    return this
  }

  withNode (node, range) {
    this.nodes.push(new ParsedCommandNode(node, range))
    this.range = StringRange.encompassing(this.range, range)
    this.modifier = node.modifier
    this.forks = node.forks
    return this
  }

  copy () {
    const copy = new CommandContextBuilder(this.dispatcher, this.source, this.rootNode, this.range.start)
    copy.command = this.command
    copy.arguments = { ...this.arguments }
    copy.nodes = [...this.nodes]
    copy.child = this.child
    copy.range = this.range
    copy.forks = this.forks
    return copy
  }

  withChild (child) {
    this.child = child
    return this
  }

  build (input) {
    return new CommandContext({
      source: this.source,
      input: this.input,
      arguments: this.arguments,
      command: this.command,
      rootNode: this.rootNode,
      nodes: this.nodes,
      range: this.range,
      child: this.child == null ? null : this.child.build(input),
      modifier: this.modifier,
      forks: this.forks
    })
  }

  findSuggestionContext (cursor) {
    if (this.range.start <= cursor) {
      if (this.range.end < cursor) {
        if (this.child != null) return this.child.findSuggestionContext(cursor)
        if (this.nodes.length !== 0) {
          const last = this.nodes[this.nodes.length - 1]
          return new SuggestionContext(last.node, last.range.end + 1)
        }
        return new SuggestionContext(this.rootNode, this.range.start)
      } else {
        const prev = this.rootNode
        for (const node of this.nodes) {
          const nodeRange = node.range
          if (nodeRange.start <= cursor && cursor <= nodeRange.end) {
            return new SuggestionContext(prev, nodeRange.start)
          }
        }
        if (prev == null) throw new Error("Can't find node before cursor")
        return new SuggestionContext(prev, this.range.start)
      }
    }
    throw new Error("Can't find node before cursor")
  }
}

module.exports = CommandContextBuilder
