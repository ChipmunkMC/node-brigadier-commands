const { Suggestions } = require('../suggestion')

class ArgumentType {
  async listSuggestions (context, builder) {
    return Suggestions.empty()
  }

  getExamples () {
    return []
  }
}

module.exports = ArgumentType
