import type { Linter } from 'eslint'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matching Linter
export type RuleConversion<Options extends any[] = any[]> =
  (name: string, level: Linter.RuleLevel, entry: null | Partial<Options>) =>
  null | [name: string, entry: Linter.RuleEntry]

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matching Linter
type RuleConversionArgs<Options extends any[] = any[]> = Parameters<RuleConversion<Options>>

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Matching Linter
export function parseRule<Options extends any[] = any[]> (name: string, entry: Linter.RuleEntry<Options>): RuleConversionArgs<Options> {
  if (typeof entry === 'string' || typeof entry === 'number') {
    return [name, entry, null]
  }

  const [level, ...options] = entry

  return [name, level, options]
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
          const args = parseRule(name, entry)
          const converted = converter(...args)
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
