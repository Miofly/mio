<template>
	<view style="height: 100%">
		<view v-if="vInitData.slideStatus" style="height: 100%;width: 20rpx;background: transparent;position: fixed;left: 0,;top: 0;z-index: 9999999999"
			  @touchstart="goUrl" @tap="goUrl"></view>
		<view v-show="myId > 1" class="bg-white">
			<view style="position: relative">
				<view style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh">
					<image :src="vInitData.coverPicture" style="width: 100%;height: 100%">
					</image>
				</view>
				<view id="mod_player" style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh"></view>

				<!--<view style="position: absolute;top: 30rpx;right: 0;z-index: 99999999999999!important;">-->
					<!--<view>-->
					<!--</view>-->
					<!--<line-progress :percent="percent" active-color="rgba(253, 164, 126, 0.7)" height="60"-->
								   <!--percentColor="white" borderStyle="0px solid red"-->
								   <!--percentSize="15px" :striped="true" :stripedActive="false" inactiveColor="transparent"-->
								   <!--:showPercent="true" style="width: 90vw">-->
					<!--</line-progress>-->
				<!--</view>-->
			</view>
			<view style="height: 70vh"></view>

			<view style="text-align: center" class="flex justify-around margin-top">
				<button @tap="backHome" class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
						style="width: 324rpx;height: 106rpx;background: linear-gradient(360deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%);;
					border-radius: 20px;font-size: 50rpx;color: white">
					返回首页
				</button>
				<button class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
						style="width: 324rpx;height: 106rpx;background: linear-gradient(180deg,rgba(76,230,201,1) 0%,rgba(9,168,196,1) 100%);;
					border-radius: 20px;font-size: 50rpx;color: white">
					下一条视频
				</button>
			</view>

			<!--广告位-->
			<view v-if="vInitData.adStatus" class="margin-top padding-left-right" @tap="goUrl">
				<image :src="vInitData.adPic" :class="[false?'cu-avatar':'', false?'round': '']"
					   style="width: 100%;height: 300rpx">
				</image>
			</view>

			<view class="margin-top padding-left-right">
				<image src="/static/images/lbVideo/cnxh.png" style="width: 680rpx;height: 50rpx"></image>
			</view>

			<view v-for="(item, index) in videoLists" :key="index" class="flex justify-between padding-left-right padding-top-bottom"
				  style="border-bottom: 1px solid #eee;">
				<view style="width: 500rpx;height: 80px;overflow: hidden">
					<!--<image :src="" :class="[false?'cu-avatar':'', false?'round': '']" @tap="ui.showImg()"-->
					<!--:mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]">-->
					<!--</image>-->
					<image :src="item.src" mode="widthFix" :class="[false?'cu-avatar':'', false?'round': '']" class="border-radius" ></image>
				</view>
				<view class="margin-left" style="position: relative">
					<view class="text-bold text-xl">{{item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}}</view>
					<view style="margin-top: 40rpx" class="text-red text-xl">播放量：{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import tvp from 'mioJs/utils/tvp'
	import {mapState} from 'vuex'
    export default {
        data() {
            return {
                videoLists: [
                    {src: '/static/images/dlrb/0.jpg', title: '搭搭撒撒所大所多多多调度顶顶顶顶顶顶顶多多多多撒多', num: '12123123'},
                    {src: '/static/images/glnz/1.jpg', title: '搭搭撒撒所大所多多多调度顶顶顶顶顶顶顶多多多多撒多', num: '12123123'},
                    {src: '/static/images/glnz/2.jpg', title: '搭搭撒撒所大所多多多调度顶顶顶顶顶顶顶多多多多撒多', num: '12123123'}
                ],
                myVideo: '',
                myPlayer: '',
                timer: null,
                percent: 0,
				myId: 0,
            }
        },
        onLoad() {
            this.router.push({name: 'lbVideoPlay'})

            // this.timer = setInterval(() => {
            //     this.percent = this.percent + 10 / 10
            //     if (this.percent == 100) {
            //         clearInterval(this.timer)
            //     }
            // }, 100)
        },
        onShow() {
            this.myId = this.myId + 1

            console.log('this.myId', this.myId)

			if (this.myId > 2) {
			    this.goUrl()
			}

			console.log('this.$store.state.vInitData', this.$store.state.vInitData)

            setTimeout(() => {
                this.getVideo(this.$store.state.vInitData.coverPicture, this.$store.state.vInitData.vid)
            }, 1)
        },
        methods: {
            goUrl () {
                location.href = this.$store.state.vInitData.adUrl
            },
            backHome() {
                uni.reLaunch({url: '/pages/plugin/lbVideo/index'})
                // this.router.replaceAll({name: 'lbIndex'})
            },
            getVideo(img, vid) {
                console.log(img)
                this.myVideo = new tvp.VideoInfo()
                this.myVideo.setVid(vid)
                var myPlayer = new tvp.Player()
                console.log(myPlayer)
                myPlayer.create({
                    width: '100%',
                    video: this.myVideo,
                    modId: 'mod_player',
                    autoplay: true,
                    pic: img
                })

				var that = this
				myPlayer.ontimeupdate = function (e) {
					// console.log('当期播放时间', myPlayer.getPlaytime())
					if (myPlayer.getPlaytime() > that.$store.state.vInitData.tzTime) {
					    // location.href
						// console.log('跳转到落地二')
					}
                }
                myPlayer.onended = function () {
					console.log('播放结束')
                    that.goUrl()
                }
                // myPlayer.onplay = function () {
                //     console.log(1222)
                //     // if (key == getUrlParam('key') && temp == 'a') {
                //     //     console.log(1)
                //     //     console.log(list[key].delayTime)
                //     //     // setTimeout(() => {
                //     //     video.setHistoryStart(list[key].delayTime)
                //     //     // }, 100)
                //     //     temp = 'b'
                //     // } else {
                //     //     video.setHistoryStart(1);
                //     // }
                // }
            },
        },
		computed: {
		    ...mapState(['indexStatus', 'vInitData']),
		},
    }
</script>

<style>
	page {
		background: white;
	}

	>>> .tvp_poster_img {
		background-size: 100% 100% !important;
	}
</style>
