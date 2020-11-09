function getParam(name, url) { // 获取地址栏参数
    if (typeof name !== 'string') return false
    if (!url) url = window.location.href
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function commonPost(url, data, success, fail) {
    $.ajax({
        type: 'POST',
        url: 'http://xx1-new-lb.52xiaoshuo.cn/api/' + url,
        // url: 'http://lb-manage-api.52xiaoshuo.cn/api/' + url,
        data: data,
        success: success,
        fail: fail
    })
}
