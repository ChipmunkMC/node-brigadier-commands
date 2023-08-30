const BUILT_IN_EXCEPTIONS = require('./built_in_exceptions.js')
const CommandSyntaxException = require('./CommandSyntaxException.js')
const DynamicCommandExceptionType = require('./DynamicCommandExceptionType.js')
const SimpleCommandExceptionType = require('./SimpleCommandExceptionType.js')

CommandSyntaxException.BUILT_IN_EXCEPTIONS = BUILT_IN_EXCEPTIONS

module.exports = { CommandSyntaxException, DynamicCommandExceptionType, SimpleCommandExceptionType }
