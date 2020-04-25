const path = require('path')
// 配置uni-router的路由页面
const TransformPages = require('uni-read-pages')
// const uni-simple-router = require('uni-read-pages')
const tfPages = new TransformPages({
    includes: ['path', 'name', 'meta']
})

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    transpileDependencies: ['uni-simple-router'],
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') { // 生产环境不输出日志
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    devServer: {
        proxy: {
            '/api': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'http://www.okzyw.com',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/foo': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'https://api.apiopen.top',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/foo': ''
                }
            },
            '/db': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'https://movie.douban.com',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/db': ''
                }
            },
            // '/lz': {
            //     // target: "http://10.19.193.135:8870/ssyth",
            //     target: 'http://new-lz-test.52eja.com/api',
            //     changeOrigin: true, // 是否跨域
            //     ws: true,
            //     pathRewrite: {
            //         '^/lz': ''
            //     }
            // },
            '/lz': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'http://api.lezhuan2020.cn/api',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/lz': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('zj', resolve('src/components'))
            .set('mioJs', resolve('src/common/js'))
            .set('json', resolve('src/static/mockJson'))
        config.plugin('provide').use(tfPages.webpack.DefinePlugin, [{
            ROUTES: JSON.stringify(tfPages.routes)
        }])
    },
}
