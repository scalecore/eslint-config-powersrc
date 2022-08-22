import type { Linter } from 'eslint'

const config: Linter.Config = {
  reportUnusedDisableDirectives: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  overrides: [
    // CommonJS
    {
      files: ['*.js', '*.cjs'],
      extends: ['./configs/commonjs']
    },
    // ECMAScript Modules
    {
      files: ['*.mjs', '*.jsx'],
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
