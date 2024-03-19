const ArgumentBuilder = require('./ArgumentBuilder.js')
const LiteralArgumentBuilder = require('./LiteralArgumentBuilder.js')
const RequiredArgumentBuilder = require('./RequiredArgumentBuilder.js')

module.exports = {
  ArgumentBuilder,
  LiteralArgumentBuilder,
  RequiredArgumentBuilder,

  literal: LiteralArgumentBuilder.literal,
  argument: RequiredArgumentBuilder.argument
}
