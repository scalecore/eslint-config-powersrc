import { z } from 'zod'
import type { Linter } from 'eslint'

export type Severity = z.infer<typeof Severity>
export const Severity = z.literal(0).or(z.literal(1)).or(z.literal(2))

export type RuleLevel = z.infer<typeof RuleLevel>
export const RuleLevel = Severity.or(z.enum(['off', 'warn', 'error']))

export type RuleOptions = z.infer<typeof RuleOptions>
export const RuleOptions = z.array(z.any())

export type RuleConfig = z.infer<typeof RuleConfig>
export const RuleConfig = RuleLevel.or(z.tuple([RuleLevel]).rest(z.any()))

type RulesRecord = z.infer<typeof RulesRecord>
const RulesRecord = z.record(RuleConfig.optional())

export type RuleEntry = z.infer<typeof RuleEntry>
export const RuleEntry = z.tuple([z.string().min(1), RuleConfig])

type ParsedRule = z.infer<typeof ParsedRule>
const ParsedRule = z.tuple([z.string().min(1), RuleLevel, RuleOptions.nullable()])

export type RuleConversion = z.infer<typeof RuleConversion>
export const RuleConversion = z.function(ParsedRule, RuleEntry.nullable())

export type PropagationConfiguration = z.infer<typeof PropagationConfiguration>
export const PropagationConfiguration = z.object({
  prefix: z.string().min(1).endsWith('/'),
  extended: z.array(z.string().min(1)),
  excluded: z.array(z.string().min(1)),
  conversions: z.record(RuleConversion)
}).partial({
  extended: true,
  excluded: true,
  conversions: true
})

export const isOff = (value: unknown): value is 'off' | 0 => value === 'off' || value === 0
export const isWarn = (value: unknown): value is 'warn' | 1 => value === 'warn' || value === 1
export const isError = (value: unknown): value is 'error' | 2 => value === 'error' || value === 2

function jsonClone<T> (value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function configExtends (config: Linter.Config): string[] {
  return typeof config.extends === 'string'
    ? [config.extends]
    : [...(config.extends ?? [])]
}

export function configPlugins (config: Linter.Config): string[] {
  return config.plugins != null ? config.plugins : []
}

function overrides (by: RegExp, override: Linter.ConfigOverride): boolean {
  if (typeof override.files === 'string') {
    return by.test(override.files)
  }

  if (Array.isArray(override.files)) {
    return override.files.some(files => by.test(files))
  }

  return true
}

export function findRules (by: RegExp, config: Linter.Config): RulesRecord {
  let rules = { }

  // Grab the root rules first
  if (config.rules != null) {
    rules = { ...rules, ...config.rules }
  }

  // Look for any overrides by the file extension
  if (config.overrides != null) {
    for (const override of config.overrides) {
      if (overrides(by, override) && override.rules != null) {
        rules = { ...rules, ...config.rules }
      }
    }
  }

  return jsonClone(rules)
}

export function parseRule (name: string, config: RuleConfig): ParsedRule {
  if (typeof config === 'string' || typeof config === 'number') {
    return [name, config, null]
  }

  const [level, ...options] = config

  return [name, level, options]
}

// Switch to the original after a fix for https://github.com/colinhacks/zod/issues/1362 is released
const Propagate =
  // z.function(z.tuple([RulesRecord, PropagationConfiguration]), RulesRecord)
  z.function().args(RulesRecord, PropagationConfiguration).returns(RulesRecord)
export const propagate = Propagate.implement((rules, config) => {
  const transformed: RulesRecord = { }

  if (config.extended != null) {
    for (const extended of config.extended) {
      const entry = rules[extended]
      if (entry != null) {
        transformed[extended] = 'off'
        transformed[`${config.prefix}${extended}`] = jsonClone(entry)
      }
    }
  }

  if (config.excluded != null) {
    for (const excluded of config.excluded) {
      if (excluded in rules) {
        transformed[excluded] = 'off'
      }
    }
  }

  if (config.conversions != null) {
    for (const [name, converter] of Object.entries(config.conversions)) {
      const entry = rules[name]
      if (entry != null) {
        const args = parseRule(name, entry)
        const converted = converter(...args)
        if (converted != null) {
          transformed[name] = 'off'
          transformed[converted[0]] = jsonClone(converted[1])
        }
      }
    }
  }

  return transformed
})

export function mergeStringArray (first: null | string[], second: null | string[]): string[] {
  if (first == null) {
    return second != null ? [...second] : []
  }

  if (second == null) {
    return [...first]
  }

  const set = new Set([...first, ...second])

  return Array.from(set.values())
}
