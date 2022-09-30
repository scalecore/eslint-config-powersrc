import type { Linter } from 'eslint'

const config: Linter.Config = {
  reportUnusedDisableDirectives: true,
  parserOptions: {
    ecmaVersion: 2021
  },
  overrides: [
    // CommonJS
    {
      files: ['*.cjs'],
      extends: ['./configs/commonjs']
    },
    // ECMAScript Modules
    {
      files: ['*.js', '*.mjs', '*.jsx'],
      extends: ['./configs/esmodule']
    },
    // TypeScript
    {
      files: ['*.ts', '*.tsx'],
      extends: ['./configs/typescript']
    },
    // Vue Components
    {
      files: ['*.vue'],
      extends: ['./configs/vue']
    }
  ]
}

export = config
