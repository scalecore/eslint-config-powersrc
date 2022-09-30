import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [
    './javascript'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // ## Import ##
    // ============

    // ### Module systems ###
    'import/no-commonjs': 'error',
    'import/no-nodejs-modules': 'error'
  }
}

export = config
