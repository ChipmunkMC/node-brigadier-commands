const ArgumentType = require('./ArgumentType.js')

const EXAMPLES = ['true', 'false']

class BoolArgumentType extends ArgumentType {
  static bool () {
    return new BoolArgumentType()
  }

  parse (reader) {
    return reader.readBoolean()
  }

  async listSuggestions (context, builder) {
    if ('true'.startsWith(builder.remainingLowerCase)) builder.suggest('true')
    if ('false'.startsWith(builder.remainingLowerCase)) builder.suggest('false')
    return builder.buildPromise()
  }

  getExamples () {
    return EXAMPLES
  }
}

module.exports = BoolArgumentType
