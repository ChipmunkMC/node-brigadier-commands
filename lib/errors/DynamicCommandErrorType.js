const CommandSyntaxError = require('./CommandSyntaxError.js')

class DynamicCommandErrorType {
  constructor (_function) {
    this.function = _function
  }

  create (arg) {
    return new CommandSyntaxError(this, this.function(arg))
  }

  createWithContext (reader, arg) {
    return new CommandSyntaxError(this, this.function(arg), reader.string, reader.cursor)
  }
}

module.exports = DynamicCommandErrorType
