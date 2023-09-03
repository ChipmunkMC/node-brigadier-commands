class Suggestion {
  constructor (range, text, tooltip = null) {
    this.range = range
    this.text = text
    this.tooltip = tooltip
  }

  apply (input) {
    if (this.range.start === 0 && this.range.end === input.length) return this.text
    let result = ''
    if (this.range.start > 0) result += input.substring(0, this.range.start)
    result += this.text
    if (this.range.end < input.length) result += input.substring(this.range.end)
    return result
  }

  compareTo (b) {
    return this.text.localeCompare(b.text)
  }

  compareToIgnoreCase (b) {
    return this.text.toLowerCase().localeCompare(b.text.toLowerCase())
  }

  expand (command, range) {
    if (range.equals(this.range)) return this
    let result = ''
    if (range.start < this.range.start) result += command.substring(this.range.start, this.range.end)
    result += this.text
    if (range.end > this.range.end) result += command.substring(this.range.end, range.end)
    return new Suggestion(range, result, this.tooltip)
  }
}

module.exports = Suggestion
