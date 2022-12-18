const CommandSyntaxError = require('./CommandSyntaxError.js')

class Dynamic2CommandErrorType {
  constructor (_function) {
    this.function = _function
  }

  create (a, b) {
    return new CommandSyntaxError(this, this.function(a, b))
  }

  createWithContext (reader, a, b) {
    return new CommandSyntaxError(this, this.function(a, b), reader.string, reader.cursor)
  }
}

module.exports = Dynamic2CommandErrorType
