'use strict'

module.exports = {
  root: true,
  env: { node: true },
  extends: './dist',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:n/recommended', './dist/configs/typescript'],
      parserOptions: { project: 'tsconfig.json' }
    }
  ]
}
