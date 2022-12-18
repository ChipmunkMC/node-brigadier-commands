const BUILT_IN_ERRORS = require('./built_in_errors.js')
const CommandSyntaxError = require('./CommandSyntaxError.js')
const Dynamic2CommandErrorType = require('./Dynamic2CommandErrorType.js')
const Dynamic3CommandErrorType = require('./Dynamic3CommandErrorType.js')
const Dynamic4CommandErrorType = require('./Dynamic4CommandErrorType.js')
const DynamicCommandErrorType = require('./DynamicCommandErrorType.js')
const DynamicNCommandErrorType = require('./DynamicNCommandErrorType.js')
const SimpleCommandErrorType = require('./SimpleCommandErrorType.js')

CommandSyntaxError.BUILT_IN_ERRORS = BUILT_IN_ERRORS

module.exports = { CommandSyntaxError, Dynamic2CommandErrorType, Dynamic3CommandErrorType, Dynamic4CommandErrorType, DynamicCommandErrorType, DynamicNCommandErrorType, SimpleCommandErrorType }
