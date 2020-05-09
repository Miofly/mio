const path = require('path')
const webpack = require('webpack')

// function resolve(dir) {
//     return path.join(__dirname, '../../../../', dir)
// }

const devConfig = { // 配置好后 npx webpack
    mode: 'development',
    // sourceMap 是一个映射关系，便于快捷定位文件错误位置
    devtool: 'cheap-module-eval-source-map', // development 开发环境最优配置
    devServer: { // 可以开启一个web服务器， 不生成dist目录，放到内存中
        contentBase: './dist',
        open: true, // 自动打开浏览器
        port: 9999,
        // historyApiFallback: false,
        // hot: true,
        // hotOnly: true, // 浏览器不刷新
        proxy: { // 跨域代理
            '/api': 'http://localhost:3030'
        }
    },
    module: {
        rules: [
            { // css-loader合并所有的css文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader', // css厂商前缀 npm i postcss-loader -D 配合 autoprefixer 插件
                    options: {
                        config: {
                            path: path.resolve(__dirname, '../postcss.config.js'),
                        }
                    }
                }]
            },
            { // loader 执行的时候有先后顺序，由下到上，postcss-sass-css-style
                test: /\.scss$/,
                use: [
                    'style-loader', // 用于挂载到html的head
                    {
                        loader: 'css-loader', // 用于把 css 文件合并成一个 css 文件
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
                    'sass-loader',
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
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 使用这个进行浏览器自动刷新和hot hotOnly有冲突
    ],
    output: {
        filename: '[name].js', // 打包文件的文件名
        chunkFilename: '[name].js',
    }
}

module.exports = devConfig
