// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'indent': 'off', // 缩进
        "comma-dangle": 'off', // 禁止逗号的检测
        "no-trailing-spaces": "off", // 允许有多余的空行
        "no-tabs": "off", // tab缩进问题
        "semi": "off", // 不检测加；分号
        "space-before-function-paren": "off", // 空格的问题
        "object-curly-spacing": "off", // {}后需要空格问题
        "no-callback-literal": "off",
        "camelcase": "off",
        "eqeqeq": "off",
        "import/prefer-default-export": 2, // export default导出的问题
        "prefer-template": 2, // + 号拼接字符串
        "arrow-body-style": 2, // 一行的方法不需要return
        "max-len": 0 // 一行文字过长
        // "quotes": [1, "double"], // 使用双引号
        // "no-extend-native": "off", // 关闭不允许使用原型扩展
        // "no-sparse-arrays": "off", // 禁止稀疏数组， [1,,2]
        // "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    },
    globals: {
        uni: true, // 配置支持uni关键字
        wx: true, // 配置支持uni关键字
        ROUTES: true // 配置支持uni关键字
    },
}
