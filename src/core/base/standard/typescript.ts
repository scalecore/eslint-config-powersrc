import standardTypeScriptConfig from 'eslint-config-standard-with-typescript'
import { configExtends, configPlugins, findRules, propagate } from '../../propagation/propagate'
import { kTypeScriptConfiguration } from '../../propagation/support/typescript'
import standardConfig from './javascript'
import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [...configExtends(standardTypeScriptConfig).filter(e => e !== 'eslint-config-standard')],
  plugins: configPlugins(standardTypeScriptConfig),
  parser: '@typescript-eslint/parser',
  rules: {
    ...propagate(standardConfig.rules ?? { }, kTypeScriptConfiguration),
    ...findRules(/\*\.tsx?$/u, standardTypeScriptConfig)
  }
}

export = config
