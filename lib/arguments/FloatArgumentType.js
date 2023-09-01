const ArgumentType = require('./ArgumentType.js')
const { CommandSyntaxException } = require('../exceptions')

const MAXIMUM_FLOAT = 3.4028235E38
const EXAMPLES = ['0', '1.2', '.5', '-1', '-.5', '-1234.56']

class FloatArgumentType extends ArgumentType {
  constructor (minimum, maximum) {
    super()
    this.minumum = +minimum
    this.maximum = +maximum
  }

  static float (min = -MAXIMUM_FLOAT, max = MAXIMUM_FLOAT) {
    return new FloatArgumentType(min, max)
  }

  parse (reader) {
    const start = reader.cursor
    const result = reader.readFloat()
    if (result < this.minumum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.floatTooLow.createWithContext(reader, result, this.minimum)
    }
    if (result > this.maximum) {
      reader.cursor = start
      throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.floatTooHigh.createWithContext(reader, result, this.maximum)
    }
    return result
  }

  toString () {
    if (this.minumum === -MAXIMUM_FLOAT && this.maximum === MAXIMUM_FLOAT) return 'float()'
    if (this.maximum === MAXIMUM_FLOAT) return `float(${this.minimum})`
    return `float(${this.minimum}, ${this.maximum})`
  }

  getExamples () {
    return EXAMPLES
  }
}

module.exports = FloatArgumentType
