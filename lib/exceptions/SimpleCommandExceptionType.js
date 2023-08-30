const CommandSyntaxException = require('./CommandSyntaxException.js')

class SimpleCommandExceptionType {
  constructor (message) {
    this.message = message
  }

  create () {
    return new CommandSyntaxException(this, this.message)
  }

  createWithContext (reader) {
    return new CommandSyntaxException(this, this.message, reader.string, reader.cursor)
  }

  toString () { return this.message.getString() }
}

module.exports = SimpleCommandExceptionType
