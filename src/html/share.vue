<template>
    <view style="height: 100%;background: black">
        <image mode="widthFix" :src="shareImg" style="height: 100%;width: 100%"></image>
        <mioModal :show="status" @click="handleClick" @cancel="hide" title="请点击右上角分享至群继续观看视频" :button="button3"
                  content="您的分享是我们的动力！"></mioModal>
    </view>
</template>

<script>
    import mioModal from '@/components/common/modal/modal'
    import Router from '@/router'
    import {mapState} from 'vuex'

    var wx = require('weixin-js-sdk')
    export default {
        data () {
            return {
                shareImg: '/static/share/z1.gif',
                status: true,
                button3: [{
                    text: '确定',
                    type: 'primary'
                }],
            }
        },
        onShow () {
            console.log(this.$store.state.times)
            this.$store.state.times = this.$store.state.times + 1
            if (this.$store.state.times == 2) {
                this.shareImg = '/static/share/z2.gif'
            }
            if (this.$store.state.times == 3) {
                this.shareImg = '/static/share/z3.gif'
            }
            if (this.$store.state.times == 4) {
                this.shareImg = '/static/share/z4.gif'
            }
            if (this.$store.state.times == 5) {
                this.shareImg = '/static/share/z5.gif'
            }
            if (this.$store.state.times == 6) {
                this.shareImg = '/static/share/z6.gif'
            }
            if (this.$store.state.times == 7) {
                this.shareImg = '/static/share/z7.gif'
            }
            if (this.$store.state.times == 8) {
                Router.replace({name: 'index'})
            }
        },
        async created () {
            const timestamp = parseInt(new Date().getTime() / 1000)
            const str = `jsapi_ticket=HoagFKDcsGMVCIY2vOjf9txntvvkykCDEPmzHimZjoxSzowS5ie_l1iIfXdvXDe1CE92az7m0eZtkwiK8lFOSA&noncestr=Wm3WZYTPz0wzccnC&timestamp=${timestamp}&url=http://192.168.3.116:8080/h5/pages/index/share`
            const signature = this.sha1(str)
            console.log(signature)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wxa4cec9585a0c00d6', // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: 'Wm3WZYTPz0wzccnC', // 必填，生成签名的随机串
                signature: signature, // 必填，签名//
                jsApiList: ['hideAllNonBaseMenuItem', 'hideMenuItems']
            })
            wx.ready(() => {
                console.log(wx)
                this.test()
                // wx.showMenuItems({
                //     menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
                // })
                // // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                // // wx.showMenuItems({
                // //     menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
                // // })
                // wx.onMenuShareAppMessage = function (e) {
                //     console.log(e)
                //     console.log(21213)
                // }
                // wx.onMenuShareTimeline({ // 朋友圈
                //     title: '', // 分享标题
                //     desc: '', // 分享描述
                //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                //     imgUrl: '', // 分享图标
                //     success: function () {
                //         Router.replace({name: 'index'})
                //     },
                //     error: function () {
                //         console.log(213123)
                //     }
                // })
                wx.hideAllNonBaseMenuItem()
            })
            wx.error(function (res) {
                console.log(res)
            })
        },
        methods: {
            test () {
                wx.hideMenuItems({
                    menuList: ['menuItem:share:timeline']
                })
            },
            encodeUTF8 (s) {
                var i
                var r = []
                var c
                var x
                for (i = 0; i < s.length; i++) {
                    if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
                    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F))
                    else {
                        if ((x = c ^ 0xD800) >> 10 == 0) // 对四字节UTF-16转换为Unicode
                        {
                            c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
                                r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F))
                        } else r.push(0xE0 + (c >> 12 & 0xF))
                        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F))
                    }
                }
                ;
                return r
            },
            // 字符串加密成 hex 字符串
            sha1 (s) {
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
                ;
                t = new DataView(new Uint32Array(m).buffer)
                for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2)

                var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
                    return (e < 16 ? '0' : '') + e.toString(16)
                }).join('')
                return hex
            },
            handleClick () {
                this.hide()
            },
            hide () {
                this.status = false
            },
        },

        components: {
            mioModal
        },
        computed: {
            ...mapState(['times']),
        },
    }
</script>

<style>
    page {
        height: 100%;
    }
</style>
