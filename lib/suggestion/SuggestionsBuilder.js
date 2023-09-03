const Suggestions = require('./Suggestions.js')
const Suggestion = require('./Suggestion.js')
const IntegerSuggestion = require('./IntegerSuggestion.js')
const { StringRange } = require('../context')

class SuggestionsBuilder {
  result = []

  constructor (input, inputLowerCase, start) {
    if (start === undefined) {
      start = inputLowerCase
      inputLowerCase = input.toLowerCase()
    }

    this.input = input
    this.inputLowerCase = inputLowerCase
    this.start = start
    this.remaining = input.substring(start)
    this.remainingLowerCase = inputLowerCase.substring(start)
  }

  build () {
    return Suggestions.create(this.input, this.result)
  }

  buildPromise () {
    return Promise.resolve(this.build())
  }

  suggest (text, tooltip = null) {
    if (text === this.remaining) return this
    this.result.push(new Suggestion(StringRange.between(this.start, this.input.length), text, tooltip))
    return this
  }

  suggestInteger (value, tooltip = null) {
    this.result.push(new IntegerSuggestion(StringRange.between(this.start, this.input.length), +value, tooltip))
    return this
  }

  add (other) {
    this.result.push(...other.result)
  }

  createOffset (start) {
    return new SuggestionsBuilder(this.input, this.inputLowerCase, start)
  }

  restart () {
    this.createOffset(this.start)
  }
}

module.exports = SuggestionsBuilder
