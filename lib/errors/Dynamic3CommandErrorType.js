const CommandSyntaxError = require('./CommandSyntaxError.js')

class Dynamic3CommandErrorType {
  constructor (_function) {
    this.function = _function
  }

  create (a, b, c) {
    return new CommandSyntaxError(this, this.function(a, b, c))
  }

  createWithContext (reader, a, b, c) {
    return new CommandSyntaxError(this, this.function(a, b, c), reader.string, reader.cursor)
  }
}

module.exports = Dynamic3CommandErrorType
