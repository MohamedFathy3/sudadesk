/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  partialBundledLanguages: true,
  serializeConfig: false,
  experimental: {
    turbo: {
      rules: {
        '*.json': {
          loaders: ['json-loader'],
        },
      },
    },
  },
}