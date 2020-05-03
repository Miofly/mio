const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

function resolve(dir) {
    return path.join(__dirname, '../../../../', dir)
}

const commonConfig = { // 配置好后 npx webpack
    entry: { // 上面是简写
        // lodash: './src/lodash.js',
        main1: './src/index.ts',
        // sub: './src/index.js'
    },
    output: { // 输出到bundle/bundle.js
        // publicPath: 'https://localhost:8080//', // 类似base_url
        filename: '[name].js', // 打包文件的文件名 这样entry可以配置两个入口js 入口文件走这里
        chunkFilename: '[name].chunk.js', // index.js里又引入的js走这里
        // path: path.resolve(__dirname, './dist') //  __dirname指webpack.config.js文件的当前路径
    },
    resolve: {
        // extensions: ['.js', '.vue', '.json'], // 可以导入的时候忽略的拓展名范围
        extensions: ['.js', '.json', '.vue', 'ts', 'tsx'], // 省略文件名后缀
        alias: {
            '@': resolve('src'),
            zj: resolve('src/components'),
            mioJs: resolve('src/common/js'),
            json: resolve('src/static/mockJson')
        }
    },
    module: { // loader的顺序从下到上，从右到左
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/, // 排除在外
                loader: 'ts-loader', // 使用babel-loader把es6语法转成es5语法
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除在外
                loader: 'babel-loader', // 使用babel-loader把es6语法转成es5语法
                options: {
                    presets: [['@babel/preset-env', {
                        // targets: {
                        //     chrome: '67' // 此版本中的浏览器不需要转es5语法
                        // },
                        // 弥补低版本浏览器不支持转es5语法
                        // 使用下面这个属性，不需要 import '@babel/polyfill'
                        // 他会根据使用es6的情况只代码使用到的es6语法
                        useBuiltIns: 'usage',
                        // corejs: 3
                    }]]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: { // 把图片变成base64，适合小图片
                    loader: 'url-loader', // npm install url-loader -D
                    options: {
                        // placeholder 占位符 [ext]后缀
                        name: '[name]_[hash].[ext]', // 使打包出的图片文件名+后缀和以前一样
                        outputPath: 'images/', // 图片打包到images/文件夹
                        limit: 2048 // <2kb生成base64 >2kb会在images/生成文件
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // 打包后自动生成一个HTML文件，并把打包生成的js自动引入到这个html文件中
            template: './src/index.html' // 以index.html为模板打包
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: { // treeshaking在开发环境下未使用的js仍然存在，但提示只使用了某一个
        usedExports: true,
        runtimeChunk: { // 老版本的webpack会由于manifest造成因为没改代码
            // 也会让contenthash改变, 配置上runtimeChunk会把manifest造成的
            // 不同js代码单独抽离出来（抽离的文件runtime.js）
            name: 'runtime'
        },
        // // production下不需要 // 在mode: 'development'配置Tree Shaking
        // splitChunks: { // 默认配置即可 代码分割
        //     chunks: 'all',
        //     cacheGroups: { // 缓存组
        //         vendors: { // 如果代码是node_modules里的则打包成vendors.js
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10, // 优先级
        //             // filename: 'vendor11s.js'
        //             name: 'vendor'
        //         },
        //     }
        // }
        /* splitChunks: { // 默认配置
            chunks: "all", // 只对异步代码生效 all同步异步都分割 initial同步（配合cacheGroups使用）
            minSize: 30000, // >30kb就做代码分割
            minChunks: 1, // 当一个模块用了多少次才进行代码分割
            maxAsyncRequests: 5, // 同时加载的模块数
            maxInitialRequests: 3, // 入口文件的代码分割个数
            automaticNameDelimiter: '~', // 组合文件连接的连接符
            name: true, // 让cacheGroups里的名字有效
            cacheGroups: { // 缓存组
                vendors: { // 如果代码是node_modules里的则打包成vendors.js
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 优先级
                    fileName: 'vendors.js'
                },
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true, // 如果一个模块被打包过直接复用
                    fileName: 'common.js'
                }
            }
        }*/
    },
    performance: false // 不提示性能上的问题
}

module.exports = (env) => {
    if (env && env.production) { // 线上环境
        return merge(commonConfig, prodConfig)
    } else { // 开发环境
        return merge(commonConfig, devConfig)
    }
}
