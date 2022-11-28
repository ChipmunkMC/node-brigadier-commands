const SimpleCommandErrorType = require('./simple_command_error_type.js')
const DynamicCommandErrorType = require('./dynamic_command_error_type.js')
const Dynamic2CommandErrorType = require('./dynamic_2_command_error_type.js')
const LiteralMessage = require('../literal_message.js')

module.exports = {
  doubleTooLow: new Dynamic2CommandErrorType((found, min) => new LiteralMessage(`Double must not be less than ${min}, found ${found}`)),
  doubleTooHigh: new Dynamic2CommandErrorType((found, max) => new LiteralMessage(`Double must not be more than ${max}, found ${found}`)),

  floatTooLow: new Dynamic2CommandErrorType((found, min) => new LiteralMessage(`Float must not be less than ${min}, found ${found}`)),
  floatTooHigh: new Dynamic2CommandErrorType((found, max) => new LiteralMessage(`Float must not be more than ${max}, found ${found}`)),

  integerTooLow: new Dynamic2CommandErrorType((found, min) => new LiteralMessage(`Integer must not be less than ${min}, found ${found}`)),
  integerTooHigh: new Dynamic2CommandErrorType((found, max) => new LiteralMessage(`Integer must not be more than ${max}, found ${found}`)),

  longTooLow: new Dynamic2CommandErrorType((found, min) => new LiteralMessage(`Long must not be less than ${min}, found ${found}`)),
  longTooHigh: new Dynamic2CommandErrorType((found, max) => new LiteralMessage(`Long must not be more than ${max}, found ${found}`)),

  literalIncorrect: new DynamicCommandErrorType(expected => new LiteralMessage(`Expected literal: ${expected}`)),

  readerExpectedStartOfQuote: new SimpleCommandErrorType(new LiteralMessage('Expected quote to start a string')),
  readerExpectedEndOfQuote: new SimpleCommandErrorType(new LiteralMessage('Unclosed quoted string')),
  readerInvalidEscape: new DynamicCommandErrorType(character => new LiteralMessage(`Invalid escape sequence '${character}' in quoted string`)),
  readerInvalidBool: new DynamicCommandErrorType(value => new LiteralMessage(`Invalid bool, expected true or false but found '${value}'`)),
  readerInvalidInt: new DynamicCommandErrorType(value => new LiteralMessage(`Invalid integer '${value}'`)),
  readerExpectedInt: new SimpleCommandErrorType(new LiteralMessage('Expected integer')),
  readerInvalidLong: new DynamicCommandErrorType(value => new LiteralMessage(`Invalid long '${value}'`)),
  readerExpectedLong: new SimpleCommandErrorType(new LiteralMessage('Expected long')),
  readerInvalidDouble: new DynamicCommandErrorType(value => new LiteralMessage(`Invalid double '${value}'`)),
  readerExpectedDouble: new SimpleCommandErrorType(new LiteralMessage('Expected double')),
  readerInvalidFloat: new DynamicCommandErrorType(value => new LiteralMessage(`Invalid float '${value}'`)),
  readerExpectedFloat: new SimpleCommandErrorType(new LiteralMessage('Expected float')),
  readerExpectedBool: new SimpleCommandErrorType(new LiteralMessage('Expected bool')),
  readerExpectedSymbol: new DynamicCommandErrorType(symbol => new LiteralMessage(`Expected '${symbol}'`)),

  dispatcherUnknownCommand: new SimpleCommandErrorType(new LiteralMessage('Unknown command')),
  dispatcherUnknownArgument: new SimpleCommandErrorType(new LiteralMessage('Incorrect argument for command')),
  dispatcherExpectedArgumentSeperator: new SimpleCommandErrorType(new LiteralMessage('Expected whitespace to end one argument, but found trailing data')),
  dispatcherParseException: new DynamicCommandErrorType(message => new LiteralMessage(`Could not parse command: ${message}`))
}
