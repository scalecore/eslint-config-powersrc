import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    '../core/base/standard/javascript'
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    // ## ESLint rules ##
    // ==================

    // ### Possible errors ###
    'no-await-in-loop': 'warn',
    'no-promise-executor-return': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-useless-backreference': 'error',

    // ### Best practices ###
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    'default-case': 'error',
    'default-param-last': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-constructor-return': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-loop-func': 'error',
    'no-script-url': 'error',
    'no-useless-concat': 'error',
    'radix': 'error',
    'require-await': 'error',
    'require-unicode-regexp': 'error',

    // ### Strict mode ###
    'strict': 'error',

    // ### Variables ###
    'no-label-var': 'error',
    'no-shadow': 'error',

    // ### Stylistic issues ###
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'func-name-matching': 'warn',
    'linebreak-style': ['error', 'unix'],
    'no-continue': 'warn',
    'no-lonely-if': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'warn',
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
    'prefer-exponentiation-operator': 'error',
    'prefer-object-spread': 'error',
    'quote-props': /* Stricter than Standard JS `as-needed` */ ['error', 'consistent-as-needed'],
    'semi-style': 'error',
    'switch-colon-spacing': 'error',
    'wrap-regex': 'warn',

    // ### ECMAScript 6 ###
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-var': /* Stricter than Standard JS warn */ 'error',
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',

    // ## Import ##
    // ============

    // ### Static analysis ###
    'import/no-dynamic-require': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',

    // ### Helpful warnings ###
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'error',

    // ### Module systems ###
    'import/no-amd': 'error',

    // ### Style guide ###
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
        alphabetize: { order: 'asc' }
      }
    ],
    'import/newline-after-import': 'error',
    'import/no-anonymous-default-export': 'error'
  }
}

export = config
