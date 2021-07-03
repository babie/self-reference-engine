const withTM = require('next-transpile-modules')([
  // for micromark
  'parse-entities',
  'character-entities',
  'micromark-util-combine-extensions',
  'micromark-util-symbol',
  'micromark-util-encode',
  'micromark-util-resolve-all',
  'micromark-util-html-tag-name',
])

module.exports = withTM({
  reactStrictMode: true,
})
