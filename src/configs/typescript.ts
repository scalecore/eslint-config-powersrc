import { propagate } from '../core/propagation/propagate'
import { kTypeScriptConfiguration } from '../core/propagation/typescript'
import jsConfig from './javascript'
import type { Linter } from 'eslint'

// For `import/extensions` and its settings
const kAllExtensions = ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs'] as const
const kResolveExtensions = kAllExtensions.map(ext => `.${ext}` as const)
const kNeverUseExtensions = Object.fromEntries(kAllExtensions.map(ext => [ext, 'never' as const]))

const config: Linter.Config = {
  extends: [
    './esmodule',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '../core/base/standard/typescript'
  ],
  parserOptions: {
    // Support Vue.js components
    extraFileExtensions: ['.vue'],
    // Vue.js requires these options, which the import plug-in will pass to it
    parser: {
      'js': 'espree',
      'ts': '@typescript-eslint/parser',
      '<template>': 'espree'
    }
  },
  settings: {
    'import/extensions': kResolveExtensions,
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue']
    },
    'import/resolver': {
      node: { extensions: kResolveExtensions },
      typescript: { }
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
    'import/extensions': ['error', 'ignorePackages', kNeverUseExtensions],

    // ## Overrides ##
    // ===============
    // ### Standard TS too strict
    // TypeScript handles this, and we use the same names on types and variables at times.
    '@typescript-eslint/no-redeclare': 'off',

    // ### Conflicting rules ###
    // TypeScript supports syntaxes and modules node normally would not.
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-missing-import': 'off',
    // Disable rules that aren't needed or just son't really work in TypeScript.
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/default': 'off'
  }
}

export = config
