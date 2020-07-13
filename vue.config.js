const path = require('path')

const TransformPages = require('uni-read-pages') // 配置uni-router的路由页面
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
        // 配置没有export导出的js
        config.module
            .rule('zepto')
            .test(require.resolve('./src/common/js/utils/zepto.min.js'))
            .use('exports')
            .loader('exports-loader?window.zepto')
            .end()
            .use('script')
            .loader('script-loader')
            .end()
        config.module
            .rule('tvp')
            .test(require.resolve('./src/common/js/utils/tvp.js'))
            .use('exports')
            .loader('exports-loader?window.tvp')
            .end()
            .use('script')
            .loader('script-loader')
            .end()
    },
    devServer: { // 开发环境跨域处理
        proxy: {
            '/api': {
                target: 'http://www.okzyw.com',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/foo': {
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
                target: 'https://mp.weixin.qq.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/wx': ''
                }
            },
            '/ks': {
                target: 'https://v.kuaishou.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/ks': ''
                }
            },
            '/ym': {
                target: 'http://luodi10424.1.0t038.cn/jin-61/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/ym': ''
                }
            },
            '/dy': {
                target: 'https://v.douyin.com/',
                changeOrigin: true, // 是否跨域
                ws: true,
                pathRewrite: {
                    '^/dy': ''
                }
            }
        }
    },
}
