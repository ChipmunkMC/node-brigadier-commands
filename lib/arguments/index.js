const ArgumentType = require('./ArgumentType.js')
const BoolArgumentType = require('./BoolArgumentType.js')
const DoubleArgumentType = require('./DoubleArgumentType.js')
const FloatArgumentType = require('./FloatArgumentType.js')
const IntegerArgumentType = require('./IntegerArgumentType.js')
const LongArgumentType = require('./LongArgumentType.js')
const StringArgumentType = require('./StringArgumentType.js')

module.exports = {
  ArgumentType,
  BoolArgumentType,
  DoubleArgumentType,
  FloatArgumentType,
  IntegerArgumentType,
  LongArgumentType,
  StringArgumentType,

  // Static methods (for convenience)
  bool: BoolArgumentType.bool,
  double: DoubleArgumentType.double,
  integer: IntegerArgumentType.integer,
  float: FloatArgumentType.float,
  long: LongArgumentType.long,
  word: StringArgumentType.word,
  string: StringArgumentType.string,
  greedyString: StringArgumentType.greedyString
}
