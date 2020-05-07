const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不支持热更新，在线上环境使用
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css生成的代码
const PurgecssPlugin = require('purgecss-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const prodConfig = { // 配置好后 npx webpack
    mode: 'production', // development  production
    devtool: 'cheap-module-source-map', // production 生成环境
    module: {
        rules: [
            { // css-loader合并所有的css文件
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // css厂商前缀 npm i postcss-loader -D 配合 autoprefixer 插件
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../postcss.config.js'),
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // 加上这个保证 index.scss里引入的scss也经过下面的loader处理
                            importLoaders: 2,
                            modules: false // css模块化
                        }
                    },
                    {
                        loader: 'postcss-loader', // css厂商前缀 npm i postcss-loader -D 配合 autoprefixer 插件
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../postcss.config.js'),
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            { // 支持vue文件的处理
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader' // npm install vue-loader -D
                }
            },
        ]
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin({ // 压缩css生成的代码

        })]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        // new PurgecssPlugin({ // 去除没用到的css
        //     paths: glob.sync(path.join(__dirname, '../src/index.html')) // src下所有的html
        // }),
    ],
    output: { // 为了防止浏览器缓存加入[contenthash],
        // 代码改变[contenthash]才会改变，否则不会改变
        filename: '[name].[contenthash].js', // 打包文件的文件名
        chunkFilename: '[name].[contenthash].chunk.js',
    }
}

module.exports = prodConfig
