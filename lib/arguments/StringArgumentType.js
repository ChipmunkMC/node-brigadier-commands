const ArgumentType = require('./ArgumentType.js')

class StringArgumentType extends ArgumentType {
  constructor (type) {
    super()
    this.type = type
  }

  static word () {
    return new StringArgumentType(StringArgumentType.StringType.SINGLE_WORD)
  }

  static string () {
    return new StringArgumentType(StringArgumentType.StringType.QUOTABLE_PHRASE)
  }

  static greedyString () {
    return new StringArgumentType(StringArgumentType.StringType.GREEDY_PHRASE)
  }

  parse (reader) {
    if (this.type === StringArgumentType.StringType.GREEDY_PHRASE) {
      const text = reader.getRemaining()
      reader.cursor = reader.getTotalLength()
      return text
    }

    if (this.type === StringArgumentType.StringType.SINGLE_WORD) {
      return reader.readUnquotedString()
    }

    return reader.readString()
  }

  getExamples () {
    return this.type.examples
  }

  static StringType = {
    SINGLE_WORD: { examples: ['word', 'words_with_underscores'] },
    QUOTABLE_PHRASE: { examples: ['"quoted phrase"', 'word', '""'] },
    GREEDY_PHRASE: { examples: ['word', 'words with spaces', '"and symbols"'] }
  }
}

module.exports = StringArgumentType
