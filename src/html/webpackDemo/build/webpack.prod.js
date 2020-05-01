const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = { // 配置好后 npx webpack
    mode: 'production', // development 不压缩 production 默认是被压缩
    // devtool: 'cheap-module-source-map', // production 生成环境
    module: {
        rules: [
            { // css-loader合并所有的css文件
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
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
                            modules: true // css模块化
                        }
                    },
                    'sass-loader',
                    'postcss-loader' // npm i postcss-loader -D
                ]
            },
        ]
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin({

        })]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
    ],
    output: { // 为了防止浏览器缓存加入[contenthash],
        // 代码改变[contenthash]才会改变，否则不会改变
        filename: '[name].[contenthash].js', // 打包文件的文件名
        chunkFilename: '[name].[contenthash].chunk.js',
    }
};

module.exports = prodConfig;
