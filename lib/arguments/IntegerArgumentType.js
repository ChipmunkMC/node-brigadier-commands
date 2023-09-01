const ArgumentType = require('./ArgumentType.js')
const { CommandSyntaxException } = require('../exceptions')

const MINIMUM_INT = -2147483648
const MAXIMUM_INT = 2147483647
const EXAMPLES = ['0', '123', '-123']

class IntegerArgumentType extends ArgumentType {
  constructor (minimum, maximum) {
    super()
    this.minumum = +minimum
    this.maximum = +maximum
  }

  static integer (min = MINIMUM_INT, max = MAXIMUM_INT) {
    return new IntegerArgumentType(min, max)
  }

  parse (reader) {
    const start = reader.cursor
    const result = reader.readInt()
    if (result < this.minumum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.integerTooLow.createWithContext(reader, result, this.minimum)
    }
    if (result > this.maximum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.integerTooHigh.createWithContext(reader, result, this.maximum)
    }
    return result
  }

  toString () {
    if (this.minumum === MINIMUM_INT && this.maximum === MAXIMUM_INT) return 'integer()'
    if (this.maximum === MAXIMUM_INT) return `integer(${this.minimum})`
    return `integer(${this.minimum}, ${this.maximum})`
  }

  getExamples () {
    return EXAMPLES
  }
}

module.exports = IntegerArgumentType
