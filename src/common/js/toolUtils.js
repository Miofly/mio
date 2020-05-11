import ClipboardJS from 'mioJs/utils/clipboard.min.js'
import {ui} from 'mioJs/uniapp'

const tu = {

    arrChange (a, b) { // 两个数组相减，大数组中去除小数组含有的项
        for (let i = 0; i < b.length; i++) {
            for (let j = 0; j < a.length; j++) {
                if (a[ j ] === b[ i ]) { // 如果是id相同的，那么a[ j ].id === b[ i ].id
                    a.splice(j, 1)
                    j = j - 1
                }
            }
        }
        return a
    },
    judgeType (obj) { // 判断数据类型
        let class2type = {};
        'Array Date RegExp Object Error'.split(' ').forEach(e =>
            class2type['[object ' + e + ']'] = e.toLowerCase()
        )
        if (obj == null) return String(obj)
        return typeof obj === 'object' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj
    },
    getSpecialDays(y) { // 判断是否是余年
        if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0))
            return 29;
        return 28;
    },
    getShengXiao(birth) { // 生肖计算
        birth += '';
        var len = birth.length;
        if (len < 4 && len != 2) {
            return "";
        }
        if (len == 2) {
            birth - 0 > 30 ? birth = '19' + birth : birth = '20' + birth;
        }
        var year = (new Date(birth)).getFullYear();
        var arr = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
        return /^\d{4}$/.test(year) ? arr[year % 12] : "";
    },
    getAstro(m, d) { // 星座计算 getAstro(parseInt('09'), 26)
        return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m * 2 - (d < "102223444433".charAt(m - 1) - -19) * 2, 2);
    },
    getAge(strBirthday) { // 根据出生日期算出年龄 getAge('1995-09-26')
        let returnAge;
        let strBirthdayArr = strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }

        return returnAge;//返回周岁年龄
    },
    isArrayFn(value) { // 判断是否是数组
        if (typeof Array.isArray === "function") {
            return Array.isArray(value);
        } else {
            return Object.prototype.toString.call(value) === "[object Array]";
        }
    },
    /* 返回随机数 第二个参数为true则变成整数
       commonUtil.mathRandom(),             100以内的整数
       commonUtil.mathRandom(100, false),    100以内的两位小数
       commonUtil.mathRandom(10, false, 4),   10以内的4位小数
    */
    mathRandom(num, ifint, decimal) {
        if (num === undefined) num = 100
        if (ifint === undefined) ifint = true
        if (decimal === undefined) decimal = 2
        let number = (Math.random() * num).toFixed(decimal)
        if (ifint) number = Math.round(number)
        return number
    },
    arrDelBlank(arrDelBlank) { // 去除空数组
        for (let i = 0; i < arrDelBlank.length; i++) {
            if (arrDelBlank[i] === '' || arrDelBlank[i] === null || typeof (arrDelBlank[i]) === 'undefined') {
                arrDelBlank.splice(i, 1)
                i = i - 1
            }
        }
        return arrDelBlank
    },
    // 删除指定位置字符(字符串从0开始数， index代表删除的位置)
    delSpecifiedLocation (str, index) {
        return str.substr(0, index) + str.substr(index + 1)
    },
    delSpecifiedLocationOne (str, index) {
        return str.substring(0, index) + str.substring(index + 1)
    },
    delSpecifiedLocationTwo (str, index) {
        return str.slice(0, index) + str.slice(index + 1)
    },
    // 为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
    insertStr (soure, start, newStr) {
        return soure.substring(0, start) + newStr + soure.substring(start)
    },
    isNumStr (str) { // 检测字符串是否全为数字
        let n = 0
        for (let i = 0; i < str.length; i++) {
            n = str.charCodeAt(i)
            if (n < 48 || n > 57) {
                return false
            }
        }
        return true
    },
    delSpecifiedLocation (str, index) { // 删除指定位置字符(字符串从0开始数， index代表删除的位置)
        return str.substr(0, index) + str.substr(index + 1)
    },
    back () {
        window.history.back()
    },
    getUrlParmas () { // 得到当前网站地址？后面的语句
        return decodeURI(window.location.href.split('?')[1])
    },
    getUrl () { // 得到当前网站地址
        return window.location.href
    },
    jumpWX () {
        window.location.replace('weixin://')
    },
    loadAsyncScript(src, callback = function () {}) { // 同步加载js
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')
        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', src)
        script.setAttribute('async', true)
        script.setAttribute('defer', true)
        head.appendChild(script)

        if (script.readyState) { // ie
            script.onreadystatechange = function () {
                var state = this.readyState
                if (state === 'loaded' || state === 'complete') {
                    callback()
                }
            }
        } else {
            script.onload = function () {
                callback()
            }
        }
    },
    loadJS(src) { // 异步加载js
        const s = document.createElement('script')
        s.setAttribute('src', src)
        s.setAttribute('charset', 'utf-8')
        document.body.appendChild(s)
    },
    addEllipsis(str, num, ellipsis = '...') { // 文字过长在指定位置加省略号
        return str.slice(0, num) + ellipsis
    },
    sha1(s) { // 字符串加密成 hex 字符串 shal加密
        var data = new Uint8Array(this.encodeUTF8(s))
        var i, j, t
        var l = ((data.length + 8) >>> 6 << 4) + 16
        var s = new Uint8Array(l << 2)
        s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer)
        for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2)
        s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8)
        s[l - 1] = data.length << 3
        var w = []
        var f = [
            function () {
                return m[1] & m[2] | ~m[1] & m[3]
            },
            function () {
                return m[1] ^ m[2] ^ m[3]
            },
            function () {
                return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]
            },
            function () {
                return m[1] ^ m[2] ^ m[3]
            }
        ]
        var rol = function (n, c) {
            return n << c | n >>> (32 - c)
        }
        var k = [1518500249, 1859775393, -1894007588, -899497514]
        var m = [1732584193, -271733879, null, null, -1009589776]
        m[2] = ~m[0], m[3] = ~m[1]
        for (i = 0; i < s.length; i += 16) {
            var o = m.slice(0)
            for (j = 0; j < 80; j++) {
                w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                    t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                    m[1] = rol(m[1], 30), m.pop(), m.unshift(t)
            }
            for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0
        }
        t = new DataView(new Uint32Array(m).buffer)
        for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2)

        var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
            return (e < 16 ? '0' : '') + e.toString(16)
        }).join('')
        return hex
    },
    encodeUTF8(s) {
        let i
        const r = []
        let c
        let x
        for (i = 0; i < s.length; i++) {
            if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
            else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F))
            else {
                if ((x = c ^ 0xD800) >> 10 == 0) { // 对四字节UTF-16转换为Unicode
                    c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
                        r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F))
                } else r.push(0xE0 + (c >> 12 & 0xF))
                r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F))
            }
        }
        return r
    },
    randomNum(min, max) { // 生成随机数 min<=num<=max
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    makeRandomArr(arrList, num) { // 随机取出数组元素
        if (num > arrList.length) {
            num = arrList.length
        }
        const tempArr = arrList.slice(0)
        const newArrList = []
        for (var i = 0; i < num; i++) {
            const random = Math.floor(Math.random() * (tempArr.length - 1))
            const arr = tempArr[random]
            tempArr.splice(random, 1)
            newArrList.push(arr)
        }
        return newArrList
    },
    sortBy(attr, rev) { // 第二个参数没有传递 默认升序排列 true表示升序排列，false降序排序
        if (rev == undefined) {
            rev = 1
        } else {
            rev = (rev) ? 1 : -1
        }

        return function (a, b) {
            a = a[attr]
            b = b[attr]
            if (a < b) {
                return rev * -1
            }
            if (a > b) {
                return rev * 1
            }
            return 0
        }
    },
    conver(limit) { // 文件大小转换
        let size = ''
        if (limit < 0.1 * 1024) { // 如果小于0.1KB转化成B
            size = `${limit.toFixed(2)}B`
        } else if (limit < 0.1 * 1024 * 1024) { // 如果小于0.1MB转化成KB
            size = `${(limit / 1024).toFixed(2)}KB`
        } else if (limit < 0.1 * 1024 * 1024 * 1024) { // 如果小于0.1GB转化成MB
            size = `${(limit / (1024 * 1024)).toFixed(2)}MB`
        } else { // 其他转化成GB
            size = `${(limit / (1024 * 1024 * 1024)).toFixed(2)}GB`
        }

        const sizestr = `${size}`
        const len = sizestr.indexOf('.')
        const dec = sizestr.substr(len + 1, 2)
        if (dec == '00') { // 当小数点后为00时 去掉小数部分
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
        }
        return sizestr
    },
    debounce(fn, delay = 1000) { // 防抖 实时搜索
        // 记录上一次的延时器
        let timer = null
        return function () {
            const args = arguments
            const that = this
            // 清除上一次延时器
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn.apply(that, args)
            }, delay)
        }
    },
    throttle(fn, wait = 1000) { // 节流 滚动条 点击搜索按钮
        let last
        let timer
        const interval = wait
        return function () {
            const th = this
            const args = arguments
            const now = +new Date()
            if (last && now - last < interval) {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    last = now
                    fn.apply(th, args)
                }, interval)
            } else {
                last = now
                fn.apply(th, args)
            }
        }
    },
    arrDelDuplicate(arr) { // 数组去重
        return [...new Set(arr)]
    },
    arrCombineDelDuplicate() { // 数组合并去重
        const arr = [].concat.apply([], arguments) // 没有去重复的新数组
        return Array.from(new Set(arr))
    },
    getClipboardData(data, callback = (res) => {
        if (res) {
            ui.showToast('复制成功')
        } else {
            ui.showToast('复制失败')
        }
    }) {
        // #ifdef APP-PLUS || MP
        uni.setClipboardData({
            data: data,
            success(res) {
                uni.getClipboardData({
                    success(res) {
                        (typeof callback === 'function') && callback(true)
                    },
                    fail(res) {
                        (typeof callback === 'function') && callback(false)
                    }
                })
            },
            fail(res) {
                (typeof callback === 'function') && callback(false)
            }
        })
        // #endif

        // #ifdef H5
        console.log(data, 213123)
        const event = window.event || {}
        const clipboard = new ClipboardJS('', {
            text: () => data
        })
        clipboard.on('success', (e) => {
            (typeof callback === 'function') && callback(true)
            clipboard.off('success')
            clipboard.off('error')
            clipboard.destroy()
        })
        clipboard.on('error', (e) => {
            (typeof callback === 'function') && callback(false)
            console.log(321312)

            clipboard.off('success')
            clipboard.off('error')
            clipboard.destroy()
        })
        clipboard.onClick(event)
        // #endif
    },
    isObj(obj) { // 判断是否是对象
        if (typeof obj !== 'object' && obj !== null) throw Error('传入的不是对象')
    },
    copyNew(constructorFn, ...args) { // 模拟实现new方法
        if (typeof constructorFn !== 'function') throw Error('传入的不是构造函数')
        const obj = Object.create(constructorFn.prototype) // 将obj的隐式原型指向构造函数的显式原型
        const res = constructorFn.apply(obj, args) // 将构造函数的this绑定到obj上
        const isObj = typeof res === 'object' && res !== 'null' // 构造函数可能返回一个对象
        const isFn = typeof res === 'function'
        return isObj || isFn ? res : obj
    },
    getNotEnumerable(obj) { // 获取一个对象自身的不可枚举属性数组
        const target = obj
        const enum_and_nonenum = Object.getOwnPropertyNames(target) // 获取一个对象的所有自身属性的属性名（包括不可枚举属性）的数组
        const enum_only = Object.keys(target) // 获取一个对象的所有自身可枚举属性的属性名的数组
        return enum_and_nonenum.filter((key) => {
            const indexInEnum = enum_only.indexOf(key)
            return indexInEnum === -1
        })
    },
    deepFreeze(obj) { // 深冻结对象
        // 取回定义在obj上的属性名
        const propNames = Object.getOwnPropertyNames(obj)

        for (const item of propNames) {
            const prop = obj[item]
            // 如果prop是个对象，冻结它
            if (typeof prop === 'object' && prop !== null) {
                this.deepFreeze(prop)
            }
        }
        // 冻结自身
        return Object.freeze(obj)
    },
    getUrlParam(name) { // 获取地址栏参数
        var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg) // 匹配目标参数
        if (r != null) return unescape(r[2])
        return null // 返回参数值
    }

}

export {
    tu
}
