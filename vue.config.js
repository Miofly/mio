const path = require('path')
// 配置uni-router的路由页面
const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
    includes: ['path', 'name', 'meta']
})

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './', // 部署应用包时的基本 URL
    transpileDependencies: ['uni-simple-router'],
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 生产环境不输出日志
        } else { // 开发环境配置

        }
    },
    chainWebpack: config => {
        // 配置快捷访问文件夹
        config.resolve.alias
            .set('@', resolve('src'))
            .set('zj', resolve('src/components'))
            .set('mioJs', resolve('src/common/js'))
            .set('json', resolve('src/static/mockJson'))
        // 配置uni-router
        config.plugin('provide').use(tfPages.webpack.DefinePlugin, [{
            ROUTES: JSON.stringify(tfPages.routes)
        }])
    },
    devServer: { // 测试环境跨域处理
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
            '/mv': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'http://123.0t038.cn/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/mv': ''
                }
            },
            '/lz': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'http://api.lezhuan2020.cn/api',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/lz': ''
                }
            },
            '/wx': {
                // target: "http://10.19.193.135:8870/ssyth",
                target: 'https://mp.weixin.qq.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/wx': ''
                }
            }
        }
    },
}
