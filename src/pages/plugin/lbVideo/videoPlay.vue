<template>
	<view class="bg-white">
		<view style="position: relative">
			<view id="mod_player" style="position: absolute;top: 0;left: 0;width: 100%;height: 70vh"></view>

			<view style="position: absolute;top: 30rpx;right: 0;z-index: 99999999999999!important;">
				<view>
				</view>
				<line-progress :percent="percent" active-color="rgba(253, 164, 126, 0.7)" height="60"
							   percentColor="white" borderStyle="0px solid red"
							   percentSize="15px" :striped="true" :stripedActive="false" inactiveColor="transparent"
							   :showPercent="true" style="width: 90vw">
				</line-progress>
			</view>
		</view>
		<view style="height: 70vh"></view>

		<view style="text-align: center" class="flex justify-around margin-top">
			<button @tap="backHome" class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
					style="width: 324rpx;height: 106rpx;background: rgb(253, 169, 120);
					border-radius: 20px;font-size: 50rpx;color: white">
				返回首页
			</button>
			<button class="cu-btn" :class="[true ? 'shadow' : '', false ? 'block' : '']"
					style="width: 324rpx;height: 106rpx;background: rgb(54, 206, 199);
					border-radius: 20px;font-size: 50rpx;color: white">
				下一条视频
			</button>
		</view>

		<!--广告位-->
		<view v-if="adStatus" class="margin-top padding-left-right">
			<image :src="adPic" :class="[false?'cu-avatar':'', false?'round': '']"
			    style="width: 100%;height: 300rpx">
			</image>
		</view>

		<view class="margin-top padding-left-right">
			<image src="/static/images/lbVideo/cnxh.png" style="width: 680rpx;height: 50rpx"></image>
		</view>
	</view>
</template>

<script>
    import tvp from 'mioJs/utils/tvp'

    export default {
        data() {
            return {
                adStatus: false,
                myVideo: '',
                myPlayer: '',
                coverPicture: '', // 视频图片
                adPic: '', // 视频图片
                timer: null,
                percent: 0
            }
        },
        onLoad() {
			this.adStatus = false // 广告位
			this.adPic = '/static/images/glnz/0.jpg'

            this.timer = setInterval(() => {
                this.percent = this.percent + 10 / 10
                if (this.percent == 100) {
                    clearInterval(this.timer)
                }
            }, 100)

			setTimeout(() => {
                this.getVideo('/static/images/dlrb/0.jpg', 'z3122kzsq2x')
			}, 500)
        },
        methods: {
            backHome () {
                this.router.push({name: 'lbIndex'})
            },
            getVideo(img, vid) {
                this.coverPicture = img

                this.myVideo = new tvp.VideoInfo()
                this.myVideo.setVid(vid)
                var myPlayer = new tvp.Player()
                myPlayer.create({
                    width: '100%',
                    video: this.myVideo,
                    modId: 'mod_player',
                    autoplay: true,
                    pic: img
                })

                myPlayer.onplay = function () {
                    console.log(1222)
                    // if (key == getUrlParam('key') && temp == 'a') {
                    //     console.log(1)
                    //     console.log(list[key].delayTime)
                    //     // setTimeout(() => {
                    //     video.setHistoryStart(list[key].delayTime)
                    //     // }, 100)
                    //     temp = 'b'
                    // } else {
                    //     video.setHistoryStart(1);
                    // }
                }
                console.log(tvp)
                console.log(this.myVideo)
                console.log(myPlayer)
            },
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
