const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const commonConfig = { // 配置好后 npx webpack
    entry: { // 上面是简写
        // lodash: './src/lodash.js',
        main: './src/index.js'
    },
    module: { // loader的顺序从下到上，从右到左
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除在外
                loader: "babel-loader",
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
            { // 支持vue文件的处理
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader' // npm install file-loader -D
                }
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' // 以index.html为模板打包
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        runtimeChunk: { // 老版本的webpack会由于manifest造成因为没改代码
            // 也会让contenthash改变, 配置上runtimeChunk会把manifest造成的
            // 不同js代码单独抽离出来（抽离的文件runtime.js）
            name: 'runtime'
        },
        // production下不需要 // 在mode: 'development'配置Tree Shaking
        usedExports: true,
        splitChunks: { // 默认配置即可 代码分割
            chunks: 'all',
            cacheGroups: { // 缓存组
                vendors: { // 如果代码是node_modules里的则打包成vendors.js
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 优先级
                    // filename: 'vendor11s.js'
                    name: 'vendor'
                },
            }
        }
        /*splitChunks: { // 默认配置
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
    output: { // 输出到bundle/bundle.js
        // filename: '[name].js', // 打包文件的文件名
        // chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist') //  __dirname指webpack.config.js文件的当前路径
    },
    performance: false // 不提示性能上的问题
}

module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}
