function gogg(url) {
    history.pushState(history.length + 1, 'message', window.location.href.split('#')[0] + '#' + new Date().getTime())

    if (navigator.userAgent.indexOf('Android') != -1) { // 判断安卓
        if (typeof (tbsJs) != 'undefined') {
            tbsJs.onReady('{useCachedApi : "true"}', function (e) {
            })
            window.onhashchange = function () { // 当一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 hashchange 事件
                location.href = url
            }
        } else {
            var pop = 0
            window.onhashchange = function (event) {
                pop++
                if (pop >= 3) {
                    location.href = url
                } else {
                    history.go(1)
                }
            }
            history.go(-1)
        }
    } else {
        window.onhashchange = function () {
            location.href = url
        }
    }
}
