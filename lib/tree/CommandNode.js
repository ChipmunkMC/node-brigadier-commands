let ArgumentCommandNode, LiteralCommandNode, RootCommandNode

class CommandNode {
  children = {}
  literals = {}
  arguments = {}

  constructor ({ command, requirement, redirect, redirectModifier, forks = false }) {
    this.command = command
    this.requirement = requirement
    this.redirect = redirect
    this.redirectModifier = redirectModifier
    this.forks = forks
  }

  getChildren () { return Object.values(this.children) }

  canUse (source) { return Boolean(this.requirement(source)) }

  addChild (node) {
    if (node instanceof RootCommandNode) throw new TypeError('Cannot add a RootCommandNode as a child to any other CommandNode')

    const child = this.children[node.name]

    if (child !== undefined) {
      // We've found something to merge onto
      if (node.command !== undefined) child.command = this.command
      for (const grandchild of node.getChildren()) child.addChild(grandchild)
    } else {
      this.children[node.name] = node
      if (node instanceof LiteralCommandNode) this.literals[node.name] = node
      else if (node instanceof ArgumentCommandNode) this.literals[node.name] = node
    }
  }

  findAmbiguities (consumer) {
    let matches = new Set()

    for (const child of Object.values(this.children)) {
      for (const sibling of Object.values(this.children)) {
        if (child === sibling) continue

        for (const input of child.getExamples()) {
          if (sibling.isValidInput(input)) {
            matches.add(input)
          }
        }

        if (matches.size > 0) {
          consumer.ambiguous(this, child, sibling, matches)
          matches = new Set()
        }
      }

      child.findAmbiguities(consumer)
    }
  }

  equals (that) {
    if (this === that) return true
    if (!(that instanceof CommandNode)) return false

    const childrenEntries = Object.entries(this.children)
    if (childrenEntries.length !== Object.entries(that.children).length) return false
    for (const entry of childrenEntries) {
      if (!Object.hasOwn(that, entry.key) || !entry.value.equals(that[entry.key])) {
        return false
      }
    }

    if (this.command !== that.command) return false

    return true
  }

  // TODO: hashCode

  getRelaventNodes (input) {
    if (Object.keys(this.literals).length > 0) {
      const cursor = input.cursor
      while (input.canRead() && input.peek() !== ' ') input.skip()
      const text = input.string.substring(cursor, input.cursor)
      input.cursor = cursor
      const literal = this.literals[text]
      if (literal !== undefined) return [literal]
      return Object.values(this.arguments)
    }

    return Object.values(this.arguments)
  }

  compareTo (object) {
    if ((this instanceof LiteralCommandNode) === (object instanceof LiteralCommandNode)) {
      return this.getSortedKey().compareTo(object.getSortedKey())
    }

    return (object instanceof LiteralCommandNode) ? 1 : -1
  }

  static _setSubclasses (c) { // ? Is there a better way to do this?
    ({ ArgumentCommandNode, LiteralCommandNode, RootCommandNode } = c)
    delete CommandNode._setSubclasses
  }
}

module.exports = CommandNode
