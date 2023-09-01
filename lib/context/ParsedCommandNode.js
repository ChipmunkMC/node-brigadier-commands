class ParsedCommandNode {
  constructor (node, range) {
    this.node = node
    this.range = range
  }

  toString () {
    return this.node + '@' + this.range
  }
}

module.exports = ParsedCommandNode
