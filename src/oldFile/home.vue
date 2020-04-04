<template>
    <view class="content">
        <view style="height: 100%">
            <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
                <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
                      :style="{width: tabBars.length <5 ? 100 / tabBars.length + '%': 150 + 'rpx'}"
                      :class="{current: index === tabCurrentIndex}"
                      @tap="changeTab(index)" :id="'tab'+index">
                    {{item.name}}
                </view>
            </scroll-view>
            <swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
                <swiper-item v-for="(item, index) in tabBars" :key="index">
                    <scroll-view style="height: 80%" scroll-y>
                        <ad v-if="ggkz" unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8"
                            grid-count="5" ad-theme="white"></ad>

                        <view class="cu-list menu" :class="[false ? 'sm-border': '', false ? 'card-menu' : '']">
                            <navigator :url="'/pages/webview/webview?url='+item.url+''"
                                       v-for="(item, index) in dataLists"
                                       :key="index">
                                <view class="cu-card article" :class="false?'no-card':''">
                                    <view class="cu-item shadow">
                                        <view v-show="false" class="title">
                                            <view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗</view>
                                        </view>
                                        <view class="content margin-top" style="background: white!important">
                                            <image :src=item.imgSrc mode="aspectFill"></image>
                                            <view class="desc">
                                                <view class="text-content">
                                                    {{item.content}}
                                                </view>
                                                <view>
                                                    <view class="cu-tag bg-red light sm round">精品推荐</view>
                                                    <view class="cu-tag bg-green light sm round">史诗</view>
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </navigator>
                        </view>
                        <!--<loadMore :status="loadStatus"></loadMore>-->
                        <ad v-if="ggkz" unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>
                        <ad v-if="ggkz" unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8"
                            grid-count="5" ad-theme="white"></ad>
                    </scroll-view>

                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import loadMore from 'cn/load/loadMore'
    import mioSearch from 'cn/module/mio-search'
    import {mapState} from 'vuex'

    let scrollTimer = false
    let windowWidth = 0
    export default {
        data() {
            return {
                answerQuestion: [], // 21312
                questionBanks: [],
                hotKeywordList: ['信用报告', '银行卡', '征信', '股票'],
                loadStatusOne: 1,
                interstitialAd: null,

                scrollLeft: 0, // 顶部选项卡左滑距离
                swiperId: 0,
                loadStatus: 1,
                tabBars: [],
                tabCurrentIndex: 0,
                webLists: {},
                dataLists: []
            }
        },
        async created() {
            if (!this.$store.state.master) {
                this.ui.yunFun('getDataPage', {
                    dbName: 'question',
                    pageSize: 100
                }, (res) => {
                    console.log('得到的数据', res.result.data[0])
                    const data = res.result.data[0]
                    this.questionBanks = JSON.parse(data.data)
                })
            }
            windowWidth = uni.getSystemInfoSync().windowWidth // 获取屏幕宽度
            this.ui.yunFun('getDataPage', {
                dbName: 'webview',
                pageSize: 100
            }, (res) => {
                const datas = res.result.data
                const webLists = datas[0]
                this.webLists = webLists.webviewList
                console.log(this.webLists.tabBars)
                this.tabBars = JSON.parse(this.webLists.tabBars)
                this.dataLists = JSON.parse(this.webLists[this.tabBars[0].sign]).sort((this.sortBy('sortId', false)))
            })

            this.interstitialAd = null
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-e3da36f2854215d1'
                })
                this.interstitialAd.onLoad(() => {
                    console.log('插屏广告加载成功')
                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
                })
                this.interstitialAd.onClose(() => {
                    console.log('插屏广告关闭')
                })
            }
        },
        methods: {
            questionListFn(val) {
                this.answerQuestion = []
                this.loadStatusOne = 1
                setTimeout(() => {
                    this.answerQuestion = this.questionBanks.filter(item => item.question.indexOf(val) !== -1)
                    this.interstitialAd.show()
                }, 300)
                setTimeout(() => {
                    this.loadStatusOne = 2
                }, 400)
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
            async changeTab(e) {
                if (scrollTimer) {
                    // 多次切换只执行最后一次
                    clearTimeout(scrollTimer)
                    scrollTimer = false
                }
                let index = e
                // e=number为点击切换，e=object为swiper滑动切换
                if (typeof e === 'object') {
                    index = e.detail.current
                }

                let width = 0
                let nowWidth = 0
                // 获取可滑动总宽度
                for (let i = 0; i <= index; i++) {
                    const result = await this.getElSize(`tab${i}`)
                    width += result.width
                    if (i === index) {
                        nowWidth = result.width
                    }
                }
                if (typeof e === 'number') {
                    // 点击切换时先切换再滚动tabbar，避免同时切换视觉错位
                    this.tabCurrentIndex = index
                }
                // 延迟300ms,等待swiper动画结束再修改tabbar
                scrollTimer = setTimeout(() => {
                    if (width - nowWidth / 2 > windowWidth / 2) {
                        // 如果当前项越过中心点，将其放在屏幕中心
                        this.scrollLeft = width - nowWidth / 2 - windowWidth / 2
                    } else {
                        this.scrollLeft = 0
                    }
                    if (typeof e === 'object') {
                        this.tabCurrentIndex = index
                    }
                    this.tabCurrentIndex = index

                    console.log(this.tabBars[this.tabCurrentIndex].sign)
                    const property = this.tabBars[this.tabCurrentIndex].sign
                    this.dataLists = JSON.parse(this.webLists[property]).sort((this.sortBy('sortId', false)))
                }, 300)
            },
            // 获得元素的size
            getElSize(id) {
                return new Promise((res, rej) => {
                    const query = uni.createSelectorQuery().in(this)
                    const el = query.select(`#${id}`)
                    el.fields({
                        size: true,
                        scrollOffset: true,
                        rect: true
                    }, (data) => {
                        res(data)
                    }).exec()
                })
            },
        },
        components: {
            mioSearch,
            loadMore
        },
        computed: {
            ...mapState(['software', 'ggkz', 'master']),
        },
    }
</script>

<style lang='scss'>
    page, .content {

        height: 100%;
        overflow: hidden;
    }

    /* 顶部tabbar */
    .nav-bar {
        position: relative;
        z-index: 10;
        height: 90 rpx;
        white-space: nowrap;
        box-shadow: 0 2 rpx 8 rpx rgba(0, 0, 0, .06);
        background-color: #fff;

        .nav-item {
            display: inline-block;
            width: 150 rpx;
            height: 90 rpx;
            text-align: center;
            line-height: 90 rpx;
            font-size: 30 rpx;
            color: #303133;
            position: relative;

            &:after {
                content: '';
                width: 0;
                height: 0;
                border-bottom: 4 rpx solid #007aff;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                transition: .3s;
            }
        }

        .current {
            color: #007aff;

            &:after {
                width: 50%;
            }
        }
    }

    .swiper-box {
        height: 100%;
    }

    .panel-scroll-box {
        height: 100%;

        .panel-item {
            background: #fff;
            padding: 30px 0;
            border-bottom: 2px solid #000;
        }
    }

    /**
     * 新闻列表 直接拿的nvue样式修改，,
     * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
     * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
     */
    .video-wrapper {
        width: 100%;
        height: 440 rpx;

        .video {
            width: 100%;
        }
    }

    .img {
        width: 100%;
        height: 100%;
    }

    .news-item {
        position: relative;
    }

    /* 修改结束 */

    /* 新闻列表  emmm 仅供参考 */
    .news-item {
        width: 750 rpx;
        padding: 24 rpx 30 rpx;
        border-bottom-width: 1px;
        border-color: #eee;
        background-color: #fff;
    }

    .title {
        font-size: 32 rpx;
        color: #303133;
        line-height: 46 rpx;
    }

    .bot {
        flex-direction: row;
    }

    .author {
        font-size: 26 rpx;
        color: #aaa;
    }

    .time {
        font-size: 26 rpx;
        color: #aaa;
        margin-left: 20 rpx;
    }

    .img-list {
        flex-shrink: 0;
        flex-direction: row;
        background-color: #fff;
        width: 220 rpx;
        height: 140 rpx;
    }

    .img-wrapper {
        flex: 1;
        flex-direction: row;
        height: 140 rpx;
        position: relative;
        overflow: hidden;
    }

    .img {
        flex: 1;
    }

    .img-empty {
        height: 20 rpx;
    }

    /* 图在左 */
    .img-list1 {
        position: absolute;
        left: 30 rpx;
        top: 24 rpx;
    }

    .title1 {
        padding-left: 240 rpx;
    }

    .bot1 {
        padding-left: 240 rpx;
        margin-top: 20 rpx;
    }

    /* 图在右 */
    .img-list2 {
        position: absolute;
        right: 30 rpx;
        top: 24 rpx;
    }

    .title2 {
        padding-right: 210 rpx;
    }

    .bot2 {
        margin-top: 20 rpx;
    }

    /* 底部3图 */
    .img-list3 {
        width: 700 rpx;
        margin: 16 rpx 0 rpx;
    }

    .img-wrapper3 {
        margin-right: 4 rpx;
    }

    /* 底部大图 */
    .img-list-single {
        width: 690 rpx;
        height: 240 rpx;
        margin: 16 rpx 0 rpx;
    }

    .img-wrapper-single {
        height: 240 rpx;
        margin-right: 0 rpx;
    }

    .video-tip {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }

    .video-tip-icon {
        width: 60 rpx;
        height: 60 rpx;
    }
</style>
