module.exports = {
  // 当前项目使用这个配置文件, 不会往父级目录找.eslintrc.js文件
  root: true,
  // 指定eslint启动环境(vuecli底层是node支持), browser: true也可以在浏览器设置
  env: {
    node: true
  },
  // vue里必须的规则
  // 使eslint继承@vue/cli脚手架里的 - standard标准
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'space-before-function-paren': 0,
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
        vue: 'never'
      }
    ],
    // 控制逗号在行尾出现还是在行首出现
    // http://eslint.org/docs/rules/comma-style
    // 'comma-style': [2, 'last'],
    // 'comma-dangle': ['error', 'always'],
    // // or
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'never',
    //     objects: 'never',
    //     imports: 'never',
    //     exports: 'never',
    //     functions: 'never',
    //   },
    // ],
    'prefer-destructuring': ['error', { object: true, array: false }]
  },
  // 对新语法使用eslint
  parserOptions: {
    // 使用babel-eslint 来解析新语法ES6
    parser: 'babel-eslint'
  }
}
