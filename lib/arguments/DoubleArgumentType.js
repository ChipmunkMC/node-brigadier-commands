const ArgumentType = require('./ArgumentType.js')
const { CommandSyntaxException } = require('../exceptions')

const MAXIMUM_DOUBLE = 1.7976931348623157E308
const EXAMPLES = ['0', '1.2', '.5', '-1', '-.5', '-1234.56']

class DoubleArgumentType extends ArgumentType {
  constructor (minimum, maximum) {
    super()
    this.minumum = +minimum
    this.maximum = +maximum
  }

  static double (min = -MAXIMUM_DOUBLE, max = MAXIMUM_DOUBLE) {
    return new DoubleArgumentType(min, max)
  }

  parse (reader) {
    const start = reader.cursor
    const result = reader.readDouble()
    if (result < this.minumum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.doubleTooLow.createWithContext(reader, result, this.minimum)
    }
    if (result > this.maximum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.doubleTooHigh.createWithContext(reader, result, this.maximum)
    }
    return result
  }

  toString () {
    if (this.minumum === -MAXIMUM_DOUBLE && this.maximum === MAXIMUM_DOUBLE) return 'double()'
    if (this.maximum === MAXIMUM_DOUBLE) return `double(${this.minimum})`
    return `double(${this.minimum}, ${this.maximum})`
  }

  getExamples () {
    return EXAMPLES
  }
}

module.exports = DoubleArgumentType
