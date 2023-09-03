const { CommandContextBuilder } = require('./context')
const { CommandSyntaxException } = require('./exceptions')
const { RootCommandNode } = require('./tree')
const { Suggestions, SuggestionsBuilder } = require('./suggestion')
const ParseResults = require('./ParseResults.js')
const StringReader = require('./StringReader.js')

const USAGE_OPTIONAL_OPEN = '['
const USAGE_OPTIONAL_CLOSE = ']'
const USAGE_REQUIRED_OPEN = '('
const USAGE_REQUIRED_CLOSE = ')'
const USAGE_OR = '|'

class CommandDispatcher {
  static ARGUMENT_SEPARATOR = ' '
  static ARGUMENT_SEPARATOR_CHAR = ' '

  consumer = (context, success, result) => {}

  constructor (root = new RootCommandNode()) {
    this.root = root
  }

  register (command) {
    const node = command.build()
    this.root.addChild(node)
    return node
  }

  execute (input, source) {
    let parse

    if (input instanceof ParseResults) parse = input
    else if (input instanceof StringReader) parse = this.parse(input, source)
    else parse = this.parse(new StringReader(input), source)

    if (parse.reader.canRead()) {
      if (parse.exceptions.size === 1) throw parse.exceptions.values().next().value
      if (parse.context.range.isEmpty()) throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand.createWithContext(parse.reader)
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument.createWithContext(parse.reader)
    }

    let result = 0
    let successfulForks = 0
    let forked = false
    let foundCommand = false
    const command = parse.reader.string
    const original = parse.context.build(command)
    let contexts = [original]
    let next = null

    // TODO: Maybe use guard clauses here?
    while (contexts != null) {
      for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i]
        const child = context.child
        if (child != null) {
          forked ||= context.forks
          if (child.hasNodes()) {
            const modifier = context.modifier
            if (modifier == null) {
              if (next == null) next = []
              next.push(child.copyFor(context.source))
            } else {
              try {
                const results = modifier(context)
                if (results.length !== 0) {
                  if (next == null) {
                    next = []
                  }
                  for (const source of results) {
                    next.add(child.copyFor(source))
                  }
                } else {
                  foundCommand = true
                }
              } catch (error) {
                if (!(error instanceof CommandSyntaxException)) throw error
                this.consumer(context, false, 0)
                if (!forked) throw error
              }
            }
          }
        } else if (context.command != null) {
          foundCommand = true
          try {
            const value = context.command(context)
            result += value
            this.consumer(context, true, value)
            successfulForks++
          } catch (error) {
            if (!(error instanceof CommandSyntaxException)) throw error
            this.consumer(context, false, 0)
            if (!forked) throw error
          }
        }
      }

      contexts = next
      next = null
    }

    if (!foundCommand) {
      this.consumer(original, false, 0)
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand.createWithContext(parse.reader)
    }

    return forked ? successfulForks : result
  }

  parse (command, source) {
    if (!(command instanceof StringReader)) command = new StringReader(command)

    const context = new CommandContextBuilder(this, source, this.root, command.cursor)
    return this.#parseNodes(this.root, command, context)
  }

  #parseNodes (node, originalReader, contextSoFar) {
    const source = contextSoFar.source
    let errors = null
    let potentials = null
    const cursor = originalReader.cursor

    for (const child of node.getRelaventNodes(originalReader)) {
      if (!child.canUse(source)) continue
      const context = contextSoFar.copy()
      const reader = new StringReader(originalReader)
      try {
        try {
          child.parse(reader, context)
        } catch (error) {
          throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherParseException.createWithContext(reader, error.message)
        }
        if (reader.canRead() && reader.peek() !== CommandDispatcher.ARGUMENT_SEPARATOR_CHAR) {
          throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherExpectedArgumentSeparator.createWithContext(reader)
        }
      } catch (error) {
        if (errors == null) errors = new Map()
        errors.set(child, error)
        reader.cursor = cursor
        continue
      }

      context.withCommand(child.command)
      if (reader.canRead(child.redirect == null ? 2 : 1)) {
        reader.skip()
        if (child.redirect != null) {
          const childContext = new CommandContextBuilder(this, source, child.redirect, reader.cursor)
          const parse = this.#parseNodes(child.redirect, reader, childContext)
          context.withChild(parse.context())
          return new ParseResults(context, parse.reader, parse.exceptions)
        } else {
          const parse = this.#parseNodes(child, reader, context)
          if (potentials == null) potentials = []
          potentials.push(parse)
        }
      } else {
        if (potentials == null) potentials = []
        potentials.push(new ParseResults(context, reader, new Map()))
      }
    }

    if (potentials != null) {
      if (potentials.length > 1) {
        potentials.sort((a, b) => {
          if (!a.reader.canRead() && b.reader.canRead()) return -1
          if (a.reader.canRead() && !b.reader.canRead()) return 1
          if (a.exceptions.size === 0 && !b.exceptions.size === 0) return -1
          if (!a.exceptions.size === 0 && b.exceptions.size === 0) return 1
          return 0
        })
      }
      return potentials[0]
    }

    return new ParseResults(contextSoFar, originalReader, errors == null ? new Map() : errors)
  }

  async getCompletionSuggestions (parse, cursor = parse.reader.getTotalLength()) {
    const context = parse.context

    const nodeBeforeCursor = context.findSuggestionContext(cursor)
    const parent = nodeBeforeCursor.parent
    const start = Math.min(nodeBeforeCursor.startPos, cursor)

    const fullInput = parse.reader.string
    const truncatedInput = fullInput.substring(0, cursor)
    const truncatedInputLowerCase = truncatedInput.toLowerCase()
    const promises = []
    for (const node of parent.getChildren()) {
      let promise = Suggestions.empty()
      try {
        promise = node.listSuggestions(context.build(truncatedInput), new SuggestionsBuilder(truncatedInput, truncatedInputLowerCase, start))
      } catch {
      }
      promises.push(promise)
    }

    try {
      const suggestions = await Promise.all(promises)
      return Suggestions.merge(fullInput, suggestions)
    } catch {
      // Errors are currently ignored to have the same behavior of brigadier (maybe this should be changed?)
    }
  }
}

module.exports = CommandDispatcher
