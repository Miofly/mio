###### eslint相关
eslint: ^7.2.0,

eslint-plugin-import: ^2.21.2,

eslint-plugin-node: ^11.1.0,

eslint-plugin-promise: ^4.2.1,

eslint-plugin-standard: ^4.0.1,

eslint-plugin-vue: ^6.2.2,

@vue/eslint-config-standard: ^5.1.2

安装vue的官方插件

npm i vue-class-component vue-property-decorator --save

ts-loader typescript 必须安装，其他的相信你以后也会装上的

npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev

这些库大体的作用，可以按需引入：

vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件

vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器

ts-loader：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件

tslint-loader跟tslint：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）

tslint-config-standard：tslint 配置 standard 风格的约束
