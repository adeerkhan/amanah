// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/block-tag-newline': 'off',
      'vue/padding-line-between-blocks': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/attributes-order': 'off',
      '@stylistic/max-statements-per-line': 'off'
    }
  }
)
