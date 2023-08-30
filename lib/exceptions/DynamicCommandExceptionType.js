const CommandSyntaxException = require('./CommandSyntaxException.js')

class DynamicCommandExceptionType {
  constructor (_function) {
    this.function = _function
  }

  create (...args) {
    return new CommandSyntaxException(this, this.function(...args))
  }

  createWithContext (reader, ...args) {
    return new CommandSyntaxException(this, this.function(...args), reader.string, reader.cursor)
  }
}

module.exports = DynamicCommandExceptionType
