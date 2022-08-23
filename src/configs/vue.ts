import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [
    './typescript',
    'plugin:vue/recommended',
    '../core/base/standard/vue'
  ],
  rules: {
    // ## Vue ##
    // =========

    // ### Essentials for Vue.js 3.x ###
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-html-element-is': 'error',
    'vue/no-deprecated-props-default-this': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-deprecated-slot-attribute': 'error',
    'vue/no-deprecated-slot-scope-attribute': 'error',
    'vue/require-toggle-inside-transition': 'error',
    'vue/valid-v-slot': ['error', { allowModifiers: true }], // Needed for Vuetify object path slot names.

    // ### Strongly recommended ###
    // Prefer more compact style.
    'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
    'vue/html-closing-bracket-spacing': ['error', { selfClosingTag: 'never' }],
    // Prefer short-hand at all times.
    'vue/v-slot-style': ['error', { atComponent: 'shorthand', default: 'shorthand', named: 'shorthand' }],
    // These rules really make our mark-up hard to navigate.
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // ### Miscellaneous ###
    'vue/block-tag-newline': 'error',
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/html-button-has-type': 'error',
    'vue/html-comment-content-newline': ['error', {}, { exceptions: [' space remover', 'space remover '] }],
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': 'error',
    'vue/next-tick-style': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-empty-component-block': 'error',
    'vue/no-invalid-model-keys': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-potential-component-option-typo': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-static-inline-styles': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-unsupported-features': ['error', { version: '^2.6.0' }],
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/require-name-property': 'error',
    'vue/static-class-names-order': 'error',
    'vue/v-for-delimiter-style': ['error', 'of'],
    'vue/v-on-event-hyphenation': 'error',
    'vue/v-on-function-call': 'error',
    'vue/valid-next-tick': 'error'
  }
}

export = config
