const CommandSyntaxError = require('./command_syntax_error.js')

class DynamicNCommandErrorType {
  constructor (_function) {
    this.function = _function
  }

  create (...args) {
    return new CommandSyntaxError(this, this.function(...args))
  }

  createWithContext (reader, ...args) {
    return new CommandSyntaxError(this, this.function(...args), reader.string, reader.cursor)
  }
}

module.exports = DynamicNCommandErrorType
