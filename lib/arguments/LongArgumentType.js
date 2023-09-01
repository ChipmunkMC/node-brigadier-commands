const ArgumentType = require('./ArgumentType.js')
const { CommandSyntaxException } = require('../exceptions')

const MINIMUM_LONG = -9223372036854775808n
const MAXIMUM_LONG = 9223372036854775807n
const EXAMPLES = ['0', '123', '-123']

class LongArgumentType extends ArgumentType {
  constructor (minimum, maximum) {
    super()
    this.minumum = BigInt(minimum)
    this.maximum = BigInt(maximum)
  }

  static long (min = MINIMUM_LONG, max = MAXIMUM_LONG) {
    return new LongArgumentType(min, max)
  }

  parse (reader) {
    const start = reader.cursor
    const result = reader.readLong()
    if (result < this.minumum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.longTooLow.createWithContext(reader, result, this.minimum)
    }
    if (result > this.maximum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.longTooHigh.createWithContext(reader, result, this.maximum)
    }
    return result
  }

  toString () {
    if (this.minumum === MINIMUM_LONG && this.maximum === MAXIMUM_LONG) return 'long()'
    if (this.maximum === MAXIMUM_LONG) return `long(${this.minimum})`
    return `long(${this.minimum}, ${this.maximum})`
  }

  getExamples () {
    return EXAMPLES
  }
}

module.exports = LongArgumentType
