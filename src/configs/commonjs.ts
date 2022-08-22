import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [
    'plugin:n/recommended',
    './javascript'
  ],
  parserOptions: { ecmaVersion: 2020 },
  plugins: ['n'],
  rules: {
    // ## Node ##
    // ============

    // ### Overrides ###
    // Our package is not published to NPM.
    'n/no-unpublished-import': 'off',
    'n/no-unpublished-require': 'off',

    // ## Import ##
    // ============

    // ### Module systems ###
    'import/no-commonjs': 'off'
  }
}

export = config
