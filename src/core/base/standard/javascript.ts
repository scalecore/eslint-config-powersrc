import standardConfig from 'eslint-config-standard'
import { configExtends, configPlugins } from '../../propagation/propagate'
import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: configExtends(standardConfig),
  plugins: configPlugins(standardConfig),
  rules: { ...standardConfig.rules }
}

export = config
