import type { Linter } from 'eslint'

export type RuleConversion = (name: string, level: Linter.RuleLevel, entry: Linter.RuleEntry) =>
null | [name: string, entry: Linter.RuleEntry]

export interface PropagationConfiguration {
  readonly prefix: string
  readonly extended?: readonly string[]
  readonly conversions?: Record<string, RuleConversion>
}

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

export function findRules (by: RegExp, config: Linter.Config): Linter.RulesRecord {
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

export function propagate (rules: Partial<Linter.RulesRecord>, config: PropagationConfiguration): Partial<Linter.RulesRecord> {
  const transformed: Partial<Linter.RulesRecord> = { }

  if (config.extended != null) {
    for (const extended of config.extended) {
      if (extended in rules) {
        transformed[extended] = 'off'
        transformed[`${config.prefix}${extended}`] = jsonClone(rules[extended])
      }
    }
  }

  if (config.conversions != null) {
    for (const [name, converter] of Object.entries(config.conversions)) {
      if (name in rules) {
        const entry = rules[name]
        if (entry != null) {
          const level = Array.isArray(entry) ? entry[0] : entry
          const converted = converter(name, level, entry)
          if (converted != null) {
            transformed[name] = 'off'
            transformed[converted[0]] = jsonClone(converted[1])
          }
        }
      }
    }
  }

  return transformed
}
