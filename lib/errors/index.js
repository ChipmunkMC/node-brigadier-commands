const BUILT_IN_ERRORS = require('./built_in_errors.js')
const CommandSyntaxError = require('./command_syntax_error.js')
const Dynamic2CommandErrorType = require('./dynamic_2_command_error_type.js')
const Dynamic3CommandErrorType = require('./dynamic_3_command_error_type.js')
const Dynamic4CommandErrorType = require('./dynamic_4_command_error_type.js')
const DynamicCommandErrorType = require('./dynamic_command_error_type.js')
const DynamicNCommandErrorType = require('./dynamic_n_command_error_type.js')
const SimpleCommandErrorType = require('./simple_command_error_type.js')

CommandSyntaxError.BUILT_IN_ERRORS = BUILT_IN_ERRORS

module.exports = { CommandSyntaxError, Dynamic2CommandErrorType, Dynamic3CommandErrorType, Dynamic4CommandErrorType, DynamicCommandErrorType, DynamicNCommandErrorType, SimpleCommandErrorType }
