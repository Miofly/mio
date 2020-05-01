const webpack = require('webpack');
const merge = require('webpack-merge');

const devConfig = { // 配置好后 npx webpack
    mode: 'development', // development 不压缩 production 默认是被压缩
    devtool: 'cheap-module-eval-source-map', // development 开发环境最优配置
    devServer: { // 可以开启一个web服务器
        contentBase: './dist',
        open: true, // 自动打开浏览器
        port: 8888,
        hot: true,
        hotOnly: false // 浏览器不刷新

    },
    module: {
        rules: [
            { // css-loader合并所有的css文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 加上这个保证 index.scss里引入的scss也经过下面的loader处理
                            importLoaders: 2,
                            modules: true // css模块化
                        }
                    },
                    'sass-loader',
                    'postcss-loader' // npm i postcss-loader -D
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js', // 打包文件的文件名
        chunkFilename: '[name].js',
    }
};

module.exports = devConfig
