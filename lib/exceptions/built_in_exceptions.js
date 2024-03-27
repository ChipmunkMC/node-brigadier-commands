const SimpleCommandExceptionType = require('./SimpleCommandExceptionType.js')
const DynamicCommandExceptionType = require('./DynamicCommandExceptionType.js')
const LiteralMessage = require('../LiteralMessage.js')

module.exports = {
  doubleTooLow: new DynamicCommandExceptionType((found, min) => new LiteralMessage(`Double must not be less than ${min}, found ${found}`)),
  doubleTooHigh: new DynamicCommandExceptionType((found, max) => new LiteralMessage(`Double must not be more than ${max}, found ${found}`)),

  floatTooLow: new DynamicCommandExceptionType((found, min) => new LiteralMessage(`Float must not be less than ${min}, found ${found}`)),
  floatTooHigh: new DynamicCommandExceptionType((found, max) => new LiteralMessage(`Float must not be more than ${max}, found ${found}`)),

  integerTooLow: new DynamicCommandExceptionType((found, min) => new LiteralMessage(`Integer must not be less than ${min}, found ${found}`)),
  integerTooHigh: new DynamicCommandExceptionType((found, max) => new LiteralMessage(`Integer must not be more than ${max}, found ${found}`)),

  longTooLow: new DynamicCommandExceptionType((found, min) => new LiteralMessage(`Long must not be less than ${min}, found ${found}`)),
  longTooHigh: new DynamicCommandExceptionType((found, max) => new LiteralMessage(`Long must not be more than ${max}, found ${found}`)),

  literalIncorrect: new DynamicCommandExceptionType(expected => new LiteralMessage(`Expected literal: ${expected}`)),

  readerExpectedStartOfQuote: new SimpleCommandExceptionType(new LiteralMessage('Expected quote to start a string')),
  readerExpectedEndOfQuote: new SimpleCommandExceptionType(new LiteralMessage('Unclosed quoted string')),
  readerInvalidEscape: new DynamicCommandExceptionType(character => new LiteralMessage(`Invalid escape sequence '${character}' in quoted string`)),
  readerInvalidBool: new DynamicCommandExceptionType(value => new LiteralMessage(`Invalid bool, expected true or false but found '${value}'`)),
  readerInvalidInt: new DynamicCommandExceptionType(value => new LiteralMessage(`Invalid integer '${value}'`)),
  readerExpectedInt: new SimpleCommandExceptionType(new LiteralMessage('Expected integer')),
  readerInvalidLong: new DynamicCommandExceptionType(value => new LiteralMessage(`Invalid long '${value}'`)),
  readerExpectedLong: new SimpleCommandExceptionType(new LiteralMessage('Expected long')),
  readerInvalidDouble: new DynamicCommandExceptionType(value => new LiteralMessage(`Invalid double '${value}'`)),
  readerExpectedDouble: new SimpleCommandExceptionType(new LiteralMessage('Expected double')),
  readerInvalidFloat: new DynamicCommandExceptionType(value => new LiteralMessage(`Invalid float '${value}'`)),
  readerExpectedFloat: new SimpleCommandExceptionType(new LiteralMessage('Expected float')),
  readerExpectedBool: new SimpleCommandExceptionType(new LiteralMessage('Expected bool')),
  readerExpectedSymbol: new DynamicCommandExceptionType(symbol => new LiteralMessage(`Expected '${symbol}'`)),

  dispatcherUnknownCommand: new SimpleCommandExceptionType(new LiteralMessage('Unknown command')),
  dispatcherUnknownArgument: new SimpleCommandExceptionType(new LiteralMessage('Incorrect argument for command')),
  dispatcherExpectedArgumentSeparator: new SimpleCommandExceptionType(new LiteralMessage('Expected whitespace to end one argument, but found trailing data')),
  dispatcherParseException: new DynamicCommandExceptionType(message => new LiteralMessage(`Could not parse command: ${message}`))
}
