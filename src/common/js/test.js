function isChrome() {
    var ua = navigator.userAgent.toLowerCase()
    var is = 'IE浏览器'
    if (isIE()) {
        is = 'IE浏览器'
        return is
    }
    if (ua.indexOf('chrome') > 1) {
        is = '谷歌浏览器'
    }
    if (ua.indexOf('safari') > 1 && ua.indexOf('macintosh') > 1) {
        is = 'Safari浏览器'
        return is
    }
    if (ua.indexOf('firefox') > 1) {
        is = '火狐浏览器'
        var reg = /firefox\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(')', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if (ua.indexOf('opr') > 1) {
        is = '欧朋浏览器'
        var reg = /opr\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(';', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if ((ua.indexOf('ubrowser') > 1 && ua.indexOf('ubrowser') == 95) || (ua.indexOf('ubrowser') > 1 && ua.indexOf('ubrowser') == 58)) {
        is = 'UC浏览器'
        var reg = /ubrowser\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(')', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if (ua.indexOf('metasr') > 1) {
        is = '搜狗浏览器'
        return is
    }
    if (ua.indexOf('qqbrowser') > 1) {
        is = 'QQ浏览器'
        var reg = /qqbrowser\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(';', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if (ua.indexOf('maxthon') > 1) {
        is = '遨游浏览器'
        var reg = /maxthon\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(';', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if (ua.indexOf('bidubrowser') > 1) {
        is = '百度浏览器'
        if (ua.indexOf('chrome') > 1) {
            var reg = /bidubrowser\/([^ ]*)/
            var b = reg.exec(ua)
            if (b && b[1]) {
                b[1] = b[1].replace(';', '')
                return is + b[1]
            } else {
                return is
            }
        } else {
            var reg = /bidubrowser ([^)]*)/
            var b = reg.exec(ua)
            if (b && b[1]) {
                b[1] = b[1].replace(';', '')
                return is + b[1]
            } else {
                return is
            }
        }
    }
    if (ua.indexOf('2345explorer') > 1) {
        is = '2345浏览器'
        var reg = /2345explorer\/([^ ]*)/
        var b = reg.exec(ua)
        if (b && b[1]) {
            b[1] = b[1].replace(';', '')
            return is + b[1]
        } else {
            return is
        }
    }
    if (ua.indexOf('lbbrowser') > 1) {
        is = '猎豹浏览器'
        return is
    }
    if (ua.indexOf('edge') > 1) {
        is = 'Edge浏览器'
        return is
    }
    var is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
    if (ua.indexOf('chrome') > 1 && is360) {
        is = '360浏览器'
        return is
    }
    return is
}

function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
            return true
        }
    }
    return false
}

// 此方法兼容最新的IE11，IE10
function isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true
    } else {
        return false
    }
}

// 检测IE版本
function IEVersion() {
    var userAgent = navigator.userAgent
    // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
    // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE
    // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp.$1)
        if (fIEVersion == 7) {
            return 7
        } else if (fIEVersion == 8) {
            return 8
        } else if (fIEVersion == 9) {
            return 9
        } else if (fIEVersion == 10) {
            return 10
        } else {
            return 6
            // IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'
        // edge
    } else if (isIE11) {
        return 11
        // IE11
    } else {
        return -1
        // 不是ie浏览器
    }
}

/**
 * 获取手机浏览器方法
 */
function getMobileBrowser() {
    var ua = navigator.userAgent.toLowerCase()
    document.write(ua)
    var name = '谷歌浏览器'
    if (ua.indexOf('firefox') > 1) {
        name = '火狐浏览器'
    }
    if (ua.indexOf('ucbrowser') > 1) {
        name = 'UC浏览器'
    }
    if (ua.indexOf('sogou') > 1) {
        name = '搜狗浏览器'
    }
    if (ua.indexOf('sogou') > 1) {
        name = '搜狗浏览器'
    }
    alert(name)
}
//将RGB转化为16进制颜色值
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
