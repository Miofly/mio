// 此文件用于 webstorm 快速定位文件
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    resolve: {
        alias: {
            '@': resolve('src'),
            cn: resolve('src/components/common'),
            mioJs: resolve('src/common/js'),
            json: resolve('src/static/mockJson')
        }
    }
}
