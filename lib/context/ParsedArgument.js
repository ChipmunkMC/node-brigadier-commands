const StringRange = require('./StringRange.js')

class ParsedArgument {
  constructor (start, end, result) {
    this.range = StringRange.between(start, end)
    this.result = result
  }
}

module.exports = ParsedArgument
