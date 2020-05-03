npm  --registry https://registry.npm.taobao.org i -D postcss-loader
npm i -D postcss-loader --registry=https://registry.nodejitsu.com/
npm i -D postcss-loader --registry=https://registry.nodejitsu.com/
npm i -D clean-webpack-plugin
旧版本
const CleanWebpackPlugin = require('clean-webpack-plugin');
new CleanWebpackPlugin(['dist'])
新版本
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
new CleanWebpackPlugin()


npm i -D webpack-dev-middleware express
import counter form './counter.js'
import number form './number.js'
if (module.hot) {
    module.hot.accept('./number', () => {

        number();
    })
}

npm i -D babel-loader @babel/core
npm i -D babel-loader@8
npm i -D @babel/preset-env // 把es6语法翻译成es5语法

npm i --save @babel/polyfill // 弥补低版本浏览器不支持转es5语法

npm i -D @babel/plugin-transform-runtime
npm i --save @babel/runtime
npm i --save @babel/runtime-corejs2

Tree Shaking 只支持 ES Module
在package.json需配置"sideEffects": false,
"sideEffects": ["@babel/polly-fill"]
支持import {add} from './math.js'
不支持const add = require('./math.js')

npm i -D webpack-merge

npm i lodash --save

动态引入组件的插件
npm i -D @babel/plugin-syntax-dynamic-import

把打包过程的描述放到 stats.json中
webpack --profile --json > stats.json

css代码分割
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin // 代码压缩合并
        "dev-build": "webpack --profile --json > stats.json --config ./build/webpack.dev.js",

{
 'plugins': [["@ba"]]
}

"sideEffects": [
        "*.css"
    ],
