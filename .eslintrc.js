module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // 自定义规则 - 其实上面集成后有很多内置的规则, 这里可以进行规则的一些修改
    'no-console': 'off',
    'no-debugger': 'off',
    'dot-notation': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'handle-callback-err': 'off',
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
}
