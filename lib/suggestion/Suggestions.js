const { StringRange } = require('../context')

class Suggestions {
  constructor (range, suggestions) {
    this.range = range
    this.suggestions = suggestions
  }

  isEmpty () {
    return this.suggestions.length === 0
  }

  static async empty () {
    return EMPTY
  }

  static merge (command, input) {
    if (input.length === 0) return EMPTY
    else if (input.length === 1) return input[0]

    const texts = new Set()
    for (const suggestions of input) for (const suggestion of suggestions.suggestions) texts.add(suggestion)
    return Suggestions.create(command, texts)
  }

  static create (command, suggestions) {
    if (suggestions.length === 0) return EMPTY
    let start = 2147483647
    let end = -2147483648
    for (const suggestion of suggestions) {
      start = Math.min(suggestion.range.start, start)
      end = Math.max(suggestion.range.end, end)
    }
    const range = new StringRange(start, end)
    const texts = new Set()
    for (const suggestion of suggestions) texts.add(suggestion.expand(command, range))
    const sorted = Array.from(texts)
    sorted.sort((a, b) => a.compareToIgnoreCase(b))
    return new Suggestions(range, sorted)
  }
}

const EMPTY = new Suggestions(StringRange.at(0), [])

module.exports = Suggestions
