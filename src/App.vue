<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'

    export default {
        // #ifdef MP-WEIXIN
        onLaunch () {
            this.autoUpdate()
            console.log('onLaunch：初始化完成')
            if (!wx.cloud) { // 使用微信云函数
                console.error('请使用 2.2.3 或以上的基础库以使用云能力')
            } else {
                /*
                    在用户管理中会显示使用云能力的小程序的访问用户列表，默认以访问时间倒叙排列，
                    访问时间的触发点是在小程序端调用 wx.cloud.init 方法，且其中的 traceUser 参数传值为 true
                */
                // 调用 wx.cloud.init 方法完成云能力初始化
                wx.cloud.init({
                    traceUser: true
                })
            }
            this.initData()
            uni.getSystemInfo({
                success: function (e) {
                    // #ifndef MP
                    Vue.prototype.StatusBar = e.statusBarHeight
                    if (e.platform === 'android') {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 45
                    }
                    // #endif

                    // #ifdef MP-WEIXIN || MP-QQ
                    Vue.prototype.StatusBar = e.statusBarHeight
                    const capsule = wx.getMenuButtonBoundingClientRect()
                    if (capsule) {
                        Vue.prototype.Custom = capsule
                        // Vue.prototype.capsuleSafe = uni.rpx2px(750) - capsule.left + uni.rpx2px(750) - capsule.right;
                        Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50
                    }
                    // #endif

                    // #ifdef MP-ALIPAY
                    Vue.prototype.StatusBar = e.statusBarHeight
                    Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight
                    // #endif
                }
            })
        },
        // #endif
        onShow () {
            // #ifdef MP-WEIXIN
            this.share()
            // #endif
            console.log('onShow：应用页面显示')
        },
        onHide () {
            console.log('onHide：应用页面隐藏')
        },
        methods: {
            initData () {
                this.ui.yunFun('getDataPage', {
                    dbName: 'initDatas',
                    pageSize: 100
                }, (res) => {
                    console.log('得到的数据', res.result.data[0].dataLists)
                    const data = res.result.data[0].dataLists
                    this.ui.storage('mvUrl', data.mvUrl)
                    this.$store.state.ggkz = data.ggkz
                    this.$store.state.indexData = data.indexData
                    this.$store.state.indexPage = data.indexPage
                })
            },
            autoUpdate: function () { // 自动更新
                var self = this
                // 获取小程序更新机制兼容
                if (wx.canIUse('getUpdateManager')) {
                    const updateManager = wx.getUpdateManager()
                    // 1. 检查小程序是否有新版本发布
                    updateManager.onCheckForUpdate(function (res) {
                        // 请求完新版本信息的回调
                        if (res.hasUpdate) {
                            // 检测到新版本，需要更新，给出提示
                            wx.showModal({
                                title: '更新提示',
                                content: '检测到新版本，是否下载新版本并重启小程序？',
                                success: function (res) {
                                    if (res.confirm) {
                                        // 2. 用户确定下载更新小程序，小程序下载及更新静默进行
                                        self.downLoadAndUpdate(updateManager)
                                    } else if (res.cancel) {
                                        // 用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                                        wx.showModal({
                                            title: '温馨提示~',
                                            content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                                            showCancel: false, // 隐藏取消按钮
                                            confirmText: '确定更新', // 只保留确定更新按钮
                                            success: function (res) {
                                                if (res.confirm) {
                                                    // 下载新版本，并重新应用
                                                    self.downLoadAndUpdate(updateManager)
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else {
                    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                }
            },
            downLoadAndUpdate: function (updateManager) { // 下载小程序新版本并重启应用
                var self = this
                wx.showLoading()
                // 静默下载更新小程序新版本
                updateManager.onUpdateReady(function () {
                    wx.hideLoading()
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                })
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                    })
                })
            },
            share: function () { // 全局分享
                wx.onAppRoute(res => {
                    const pages = getCurrentPages()
                    const view = pages[pages.length - 1]
                    wx.showShareMenu({
                        withShareTicket: true
                    })
                    view.onShareAppMessage = function () {
                        return {
                            title: '这是个大宝贝！',
                            path: view.route
                        }
                    }
                })
            }
        },
        computed: {
            ...mapState(['indexData']),
        },
    }
</script>

<style lang='scss'>
    @import "common/css/summary/main";
</style>
