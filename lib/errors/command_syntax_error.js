class CommandSyntaxError extends Error {
  static CONTEXT_AMOUNT = 10
  static ENABLE_COMMAND_STACK_TRACES = true

  constructor (type, message, input = null, cursor = -1) {
    super()
    if (!CommandSyntaxError.ENABLE_COMMAND_STACK_TRACES) delete this.stack
    this.name = 'CommandSyntaxError'

    this.type = type
    this._message = message
    this.input = input
    this.cursor = cursor
  }

  get message () {
    let message = typeof this._message.getString === 'function' ? this._message.getString() : String(this._message)
    const context = this.getContext()
    if (context != null) message += ` at position ${this.cursor}: ${context}`
    return message
  }

  getContext () {
    if (this.input == null || this.cursor < 0) return null
    let context = ''
    const cursor = Math.min(this.input.length, this.cursor)

    if (cursor > CommandSyntaxError.CONTEXT_AMOUNT) context += '...'

    context += this.input.substring(Math.max(0, cursor - CommandSyntaxError.CONTEXT_AMOUNT), cursor)
    context += '<--[HERE]'

    return context
  }
}

module.exports = CommandSyntaxError
