// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
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

// eslint-disable-next-line no-undef
module.exports = withTM({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/\\:tree/:path*',
        destination: '/__self__/tree/:path*',
      },
      {
        source: '/\\:blob/:path*',
        destination: '/__self__/blob/:path*',
      },
      {
        source: '/\\:new/:path*',
        destination: '/__self__/new/:path*',
      },
      {
        source: '/\\:edit/:path*',
        destination: '/__self__/edit/:path*',
      },
      {
        source: '/:path+.html',
        destination: '/__self__/show/:path+.html',
      },
      {
        source: '/:path*',
        destination: '/__self__/index/:path*',
      },
      {
        source: '/',
        destination: '/__self__/index',
      },
    ]
  },
})
