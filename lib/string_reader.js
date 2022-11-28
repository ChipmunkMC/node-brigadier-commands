const { CommandSyntaxError } = require('./errors')

const SYNTAX_ESCAPE = '\\'
const SYNTAX_DOUBLE_QUOTE = '"'
const SYNTAX_SINGLE_QUOTE = "'"

class StringReader {
  constructor (value) {
    if (value instanceof StringReader) {
      this.string = value.string
      this.cursor = value.cursor
    } else {
      this.string = String(value)
      this.cursor = 0
    }
  }

  getRemainingLength () { return this.string.length - this.cursor }

  getTotalLength () { return this.string.length }

  getRead () { return this.string.substring(0, this.cursor) }

  getRemaining () { return this.string.substring(this.cursor) }

  canRead (length = 1) { return this.cursor + length <= this.string.length }

  peek () { return this.string[this.cursor] }

  read () { return this.string[this.cursor++] }

  skip () { this.cursor++ }

  isAllowedNumber (c) { return (c >= '0' && c <= '9') || c === '.' || c === '-' }

  isQuotedStringStart (c) { return c === SYNTAX_DOUBLE_QUOTE || c === SYNTAX_SINGLE_QUOTE }

  isWhitespace (c) { return c === ' ' || (c >= '\u2000' && c <= '\u2006') || (c >= '\u2008' && c <= '\u200a') || c === '\u205f' || c === '\u3000' || c === '\t' || c === '\n' || c === '\u000b' || c === '\f' || c === '\r' || c === '\u001c' || c === '\u001d' || c === '\u001e' || c === '\u001f' }

  skipWhitespace () {
    while (this.canRead() && this.isWhitespace(this.peek())) {
      this.skip()
    }
  }

  readInt () {
    const start = this.cursor
    while (this.canRead() && this.isAllowedNumber(this.peek())) {
      this.skip()
    }
    const number = this.string.substring(start, this.cursor)
    if (number === '') throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedInt.createWithContext(this)
    const _number = Number(number)
    if (Number.isNaN(_number) || !Number.isInteger(_number)) throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidInt.createWithContext(this, number)
    return _number
  }

  readLong () {
    const start = this.cursor
    while (this.canRead() && this.isAllowedNumber(this.peek())) {
      this.skip()
    }
    const number = this.string.substring(start, this.cursor)
    if (number === '') throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedLong.createWithContext(this)
    try {
      return BigInt(number)
    } catch (error) {
      throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidLong.createWithContext(this, number)
    }
  }

  readDouble () {
    const start = this.cursor
    while (this.canRead() && this.isAllowedNumber(this.peek())) {
      this.skip()
    }
    const number = this.string.substring(start, this.cursor)
    if (number === '') throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedDouble.createWithContext(this)
    const _number = Number(number)
    if (Number.isNaN(_number)) throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidDouble.createWithContext(this, number)
    return _number
  }

  readFloat () {
    const start = this.cursor
    while (this.canRead() && this.isAllowedNumber(this.peek())) {
      this.skip()
    }
    const number = this.string.substring(start, this.cursor)
    if (number === '') throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedFloat.createWithContext(this)
    const _number = Number(number)
    if (Number.isNaN(_number)) throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidFloat.createWithContext(this, number)
    return _number
  }

  isAllowedInUnquotedString (c) {
    return (c >= '0' && c <= '9') ||
      (c >= 'A' && c <= 'Z') ||
      (c >= 'a' && c <= 'z') ||
      c === '_' || c === '-' ||
      c === '+' || c === '+'
  }

  readUnquotedString () {
    const start = this.cursor
    while (this.canRead() && this.isAllowedInUnquotedString(this.peek())) {
      this.skip()
    }
    return this.string.substring(start, this.cursor)
  }

  readQuotedString () {
    if (!this.canRead) return ''
    const next = this.peek()
    if (!this.isQuotedString(next)) throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedStartOfQuote.createWithContext(this)
    this.skip()
    return this.readStringUntil(next)
  }

  readStringUntil (terminator) {
    let result = ''
    let escaped = false
    while (this.canRead()) {
      const c = this.read()
      if (escaped) {
        if (c === terminator || c === SYNTAX_ESCAPE) {
          result += c
          escaped = false
        } else {
          --this.cursor
          throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidEscape.createWithContext(this)
        }
      } else if (c === SYNTAX_ESCAPE) {
        escaped = true
      } else if (c === terminator) {
        return result.toString()
      } else {
        result += c
      }
    }

    throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedEndOfQuote.createWithContext(this)
  }

  readString () {
    if (!this.canRead) return ''
    const next = this.peek()
    if (this.isQuotedStringStart(next)) {
      this.skip()
      return this.readStringUntil(next)
    }
    return this.readUnquotedString()
  }

  readBoolean () {
    const start = this.cursor
    const value = this.readString()
    if (value === '') throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedBool.createWithContext(this)

    if (value === 'true') return true
    if (value === 'false') return false

    this.cursor = start
    throw CommandSyntaxError.BUILT_IN_ERRORS.readerInvalidBool.createWithContext(this, value)
  }

  expect (c) {
    if (!this.canRead || this.peek() !== c) throw CommandSyntaxError.BUILT_IN_ERRORS.readerExpectedSymbol.createWithContext(this, c)
    this.skip()
  }
}

module.exports = StringReader
