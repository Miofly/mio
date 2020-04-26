<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content"></block>
        </cu-custom>

        <view class="cu-card article margin-top-xxl text-center margin-bottom" v-if="hd">
            <view class="cu-item shadow">
                <view class="title">
                    <view class="text-cut" style="font-size: 40rpx">{{name}}</view>
                </view>
                <view @tap="cktp" style="width: 500rpx;height: 500rpx" class="cu-avatar round xl" :style="{backgroundImage: 'url('+ imgSrc +')'}"></view>
            </view>

            <view class="page-body">
                <view class="page-section page-section-gap" style="text-align: center;">
                    <audio style="text-align: left" :src="playUrl" :poster="imgSrc"
                           :name="songName" :author="singer" :action="audioAction" controls></audio>
                </view>
            </view>

            <view class="flex flex-direction padding-top" @tap="copyStr(playUrl)" >
                <!--round 圆角 line-red镂空-->
                <button class="cu-btn bg-blue sm round">复制下载链接</button>
            </view>
        </view>

        <ad unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>

    </view>
</template>

<script>
    let cheerio = require('cheerio');
    import {mapState} from 'vuex'
    export default {
        onLoad(e) {
            wx.showShareMenu({
                withShareTicket: true
            })

            this.id = JSON.parse(decodeURIComponent(e.query)).id

            this.ui.yunFun('httpRequests', {
                id: this.id
            }, (res) => {
                console.log(res.result.body)
				const $ = cheerio.load(res.result.body, {_useHtmlParser2: true})

                this.playUrl = $("#musickrc audio").attr('src'); // 下载地址
                this.name = $(".pname a").eq(1).text(); // 下载地址
                this.singer = $(".pname a").eq(1).text().split("-")[0]; // 下载地址
                this.songName = $(".pname a").eq(1).text().split("-")[1]; // 下载地址
                this.imgSrc = $("#aplay").attr('src'); // 下载地址
                console.log('播放地址：', this.playUrl)
            })

            if (wx.createRewardedVideoAd) {
                this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-c032eda868cde7c8'})
                this.rewardedVideoAd.onLoad(() => {
                    console.log('激励视频 广告加载成功')
                })
                this.rewardedVideoAd.onError((err) => {
                    console.log('激励视频出错', err)
                    this.interstitialAd.show()
                })
                this.rewardedVideoAd.onClose((res) => {
                    // 用户点击了【关闭广告】按钮
                    if (res && res.isEnded) {
                        // 正常播放结束，可以下发游戏奖励
                    } else {
                        this.interstitialAd.show()
                    }
                })
            }

            // 在页面onLoad回调事件中创建插屏广告实例
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
        data () {
            return {
                audioAction: {
                    method: 'pause'
                },
                id: '',
                imgSrc: '',
                name: '',
                singer: '',
                songName: '',
                playUrl: '',
                rewardedVideoAd: null,
                interstitialAd: null,
            }
        },
        methods: {
            copyStr (str) {
                this.rewardedVideoAd.show().catch(() => {
                    this.rewardedVideoAd.load()
                        .then(() => this.rewardedVideoAd.show())
                        .catch(err => {
                            console.log('激励视频 广告显示失败')
                        })
                })
                this.ui.copyStr(str)
            },
            cktp () {
                this.ui.previewImage()
            },
        },
        computed: {
            ...mapState(['hd']),
        },
    }
</script>

<style>

</style>
