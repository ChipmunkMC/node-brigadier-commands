class StringRange {
  constructor (start, end) {
    this.start = start
    this.end = end
  }

  static at (pos) { return new StringRange(pos, pos) }

  static between (start, end) { return new StringRange(start, end) }

  static encompassing (a, b) {
    return new StringRange(Math.min(a.start, b.start), Math.max(a.end, b.end))
  }

  get (string) {
    if (string.string !== undefined) return this.get(string.string)
    return string.substring(this.start, this.end)
  }

  isEmpty () { return this.start === this.end }

  getLength () { return this.end - this.start }

  equals (that) {
    if (this === that) return true
    if (!(that instanceof StringRange)) return false
    return this.start === that.start && this.end === that.end
  }

  // TODO: hashCode
}

module.exports = StringRange
