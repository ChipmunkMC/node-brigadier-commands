const StringReader = require('./StringReader.js')

class ParseResults {
  constructor (context, reader = new StringReader(''), exceptions = new Map()) {
    this.context = context
    this.reader = reader
    this.exceptions = exceptions
  }
}

module.exports = ParseResults
