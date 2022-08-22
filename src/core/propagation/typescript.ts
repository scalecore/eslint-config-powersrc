import { isOff } from './propagate'
import type { PropagationConfiguration } from './propagate'

export const kTypeScriptConfiguration: PropagationConfiguration = {
  prefix: '@typescript-eslint/',
  extended: [
    'brace-style',
    'comma-dangle',
    'comma-spacing',
    'default-param-last',
    'dot-notation',
    'func-call-spacing',
    'indent',
    'init-declarations',
    'keyword-spacing',
    'lines-between-class-members',
    'no-array-constructor',
    'no-dupe-class-members',
    'no-empty-function',
    'no-extra-parens',
    'no-extra-semi',
    'no-implied-eval',
    'no-invalid-this',
    'no-loop-func',
    'no-loss-of-precision',
    'no-magic-numbers',
    'no-redeclare',
    'no-restricted-imports',
    'no-shadow',
    'no-throw-literal',
    'no-unused-expressions',
    'no-unused-vars',
    'no-use-before-define',
    'no-useless-constructor',
    'object-curly-spacing',
    'padding-line-between-statements',
    'quotes',
    'require-await',
    'semi',
    'space-before-blocks',
    'space-before-function-paren',
    'space-infix-ops'
  ],
  conversions: {
    'no-return-await': (_name, level, _entry) =>
      (isOff(level) ? null : ['@typescript-eslint/return-await', [level, 'in-try-catch']])
  }
}
