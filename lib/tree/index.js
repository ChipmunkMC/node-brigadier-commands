const CommandNode = require('./CommandNode.js')
const ArgumentCommandNode = require('./ArgumentCommandNode.js')
const LiteralCommandNode = require('./LiteralCommandNode.js')
const RootCommandNode = require('./RootCommandNode.js')

module.exports = { CommandNode, ArgumentCommandNode, LiteralCommandNode, RootCommandNode }

CommandNode._setSubclasses(module.exports)
