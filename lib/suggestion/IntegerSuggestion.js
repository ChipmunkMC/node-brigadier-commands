const Suggestion = require('./Suggestion.js')

class IntegerSuggestion extends Suggestion {
  constructor (range, value, tooltip = null) {
    super(range, value.toString(), tooltip)
  }

  compareTo (b) {
    if (b instanceof IntegerSuggestion) {
      if (this.value === b.value) return 0
      if (this.value < b.value) return -1
      if (this.value > b.value) return 1
    }

    return super.compareTo(b)
  }

  compareToIgnoreCase (b) {
    return this.compareTo(b)
  }
}

module.exports = IntegerSuggestion
