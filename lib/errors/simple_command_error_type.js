const CommandSyntaxError = require('./command_syntax_error.js')

class SimpleCommandErrorType {
  constructor (message) {
    this.message = message
  }

  create () {
    return new CommandSyntaxError(this, this.message)
  }

  createWithContext (reader) {
    return new CommandSyntaxError(this, this.message, reader.string, reader.cursor)
  }

  toString () { return this.message.getString() }
}

module.exports = SimpleCommandErrorType
