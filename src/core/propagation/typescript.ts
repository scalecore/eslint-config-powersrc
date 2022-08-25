import { z } from 'zod'
import { isOff, mergeStringArray } from './propagate'
import type { PropagationConfiguration } from './propagate'

const kPrefix = '@typescript-eslint/'

// Partial option schema, with catch all.
const Indent = z.number().or(z.literal('tab')).default(4)
const IndentOptions = z.object({
  ignoredNodes: z.array(z.string()).nullable().default(null)
}).catchall(z.unknown())
  .default({})
const NoUseBeforeDefineOptions = z.record(z.boolean()).default({})

export const kTypeScriptConfiguration: PropagationConfiguration = {
  prefix: kPrefix,
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
    'indent': function (name, level, entry) {
      if (isOff(level)) {
        return null
      }

      name = `${kPrefix}${name}`

      const size = Indent.parse(entry?.[0])
      const originals = IndentOptions.parse(entry?.[1])
      const options = {
        ...originals,
        ignoredNodes: mergeStringArray(originals.ignoredNodes, [
          'PropertyDefinition[decorators]',
          'TSUnionType'
        ])
      }

      return [name, [level, size, options]]
    },
    'no-use-before-define': function (name, level, entry) {
      if (isOff(level)) {
        return null
      }

      name = `${kPrefix}${name}`

      const originals = NoUseBeforeDefineOptions.parse(entry?.[0])
      const options = {
        ...originals,
        functions: false,
        classes: false,
        enums: false,
        variables: false,
        // Only the TypeScript rule has this option.
        typedefs: false
      }

      return [name, [level, options]]
    },
    'no-return-await': function (name, level) {
      return isOff(level) ? null : [`@typescript-eslint/${name}`, [level, 'in-try-catch']]
    }
  }
}
