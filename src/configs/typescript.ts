import { propagate } from '../core/propagation/propagate'
import { kTypeScriptConfiguration } from '../core/propagation/typescript'
import jsConfig from './javascript'
import type { Linter } from 'eslint'

const kAllExtensions = ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs']

const config: Linter.Config = {
  extends: [
    './esmodule',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '../core/base/standard/typescript'
  ],
  parserOptions: {
    extraFileExtensions: ['.vue']
  },
  settings: {
    'import/extensions': kAllExtensions,
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue']
    },
    'import/resolver': {
      node: { extensions: kAllExtensions },
      typescript: { alwaysTryTypes: true }
    }
  },
  rules: {
    // Propagate our rules
    ...propagate(jsConfig.rules ?? { }, kTypeScriptConfiguration),

    // ## TypeScript ##
    // ================

    // ### Standard rules ###
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/class-literal-property-style': 'error',
    // Standard TS is strict to the point of completely breaking certain TypeScript features.
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow'
      }
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
    '@typescript-eslint/no-implicit-any-catch': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],

    // ## Import ##
    // ============

    // ### Style guide ###
    'import/extensions': ['error', 'always', { ts: 'never', tsx: 'never' }],

    // ## Overrides ##
    // ===============
    // ### Standard TS too strict
    '@typescript-eslint/no-redeclare': 'off', // TypeScript handles this, and we do same types and variables.

    // ### Conflicting rules ###
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-missing-import': 'off',
    'import/no-duplicates': 'off'
  }
}

export = config
