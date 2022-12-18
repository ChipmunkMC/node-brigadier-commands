const CommandSyntaxError = require('./CommandSyntaxError.js')

class Dynamic4CommandErrorType {
  constructor (_function) {
    this.function = _function
  }

  create (a, b, c, d) {
    return new CommandSyntaxError(this, this.function(a, b, c, d))
  }

  createWithContext (reader, a, b, c, d) {
    return new CommandSyntaxError(this, this.function(a, b, c, d), reader.string, reader.cursor)
  }
}

module.exports = Dynamic4CommandErrorType
