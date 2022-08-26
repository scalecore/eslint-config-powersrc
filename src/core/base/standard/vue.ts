import standardConfig from 'eslint-config-standard'
import { propagate } from '../../propagation/propagate'
import { kVueConfiguration } from '../../propagation/support/vue'
import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [],
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  rules: { ...propagate(standardConfig.rules ?? { }, kVueConfiguration) }
}

export = config
