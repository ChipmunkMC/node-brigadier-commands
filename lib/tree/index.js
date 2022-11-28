const CommandNode = require('./command_node.js')
const ArgumentCommandNode = require('./argument_command_node.js')
const LiteralCommandNode = require('./literal_command_node.js')
const RootCommandNode = require('./root_command_node.js')

module.exports = { CommandNode, ArgumentCommandNode, LiteralCommandNode, RootCommandNode }

CommandNode._setChildClasses(module.exports)
