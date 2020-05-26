<template>
	<view style="background: rgb(30, 40, 40)">
		<movie-header ref="head"></movie-header>
		<video id="myVideo" ref="myVideo"
			   class="full-width"
			   poster="/static/images/movie/loading_wap3.gif"
			   :src="playDz" autoplay
			   @error="videoErrorCallback" page-gesture="true" enable-play-gesture="true"
			   vslide-gesture="true" @play="playMv"
			   :title="title" @timeupdate="playStatus"
			   controls></video>
		<view style="background: rgb(30, 40, 40);color: white" class="padding">
			<view>
				<span>{{title}}</span>
				<span>{{time}}</span>
			</view>
			<view class="margin-top margin-bottom" style="color: #ccc">
				<view class="fl margin-right-ten">{{type}}</view>
				<view class="fl margin-right-ten">{{address == null ? '未知' : address}}</view>
				<view class="fl margin-right-ten" style="margin-top: 4rpx">{{time == null ? '未知' : time}}</view>
			</view>
			<view style="clear: both" class="padding-top"></view>
			<view class="margin-bottom">
				播放来源
			</view>
			<view @tap="switchPlay(index, item.num)" v-for="(item, index) in playInfo" :key="index"
				  style="color: white;width: 160rpx;position: relative"
				  class="fl text-center">
				<button class="cu-btn text-center"
						:class="[select_title == item.num ? 'my-bg-orange' : 'my-bg-gray',
				        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					{{item.num}}
				</button>
			</view>
			<view style="clear: both"></view>
			<view class="cu-list grid text-center" style="background: rgb(30, 40, 40)!important;"
				  :class="['col-' + 3,false?'':'no-border']">
				<view @tap="getPlay(item.href, index)" v-for="(item, index) in nowPlayInfo.data" :key="index"
					  class="margin-top">
					<button class="cu-btn" style="width: 100px" :class="[
							nowNum == index ? 'my-bg-orange' : 'my-bg-gray',
					        ['sm', 'lg', ''][2], false ? 'round' : '', false ? 'shadow' : '', false ? 'block' : '']">
						{{item.title.length > 5 ? item.title.slice(0, 6) + '...' : item.title}}
					</button>
				</view>
			</view>
		</view>
		<view style="clear: both"></view>
		<movie-footer></movie-footer>
		<view class="cu-bar tabbar foot" style="background: rgb(39, 41, 56)">
			<view @click="NavChange" class="action" data-cur="dy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/movie' + [PageCur=='dy'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dy'?'text-mv-yellow':'text-gray'">电影</view>
			</view>
			<view @click="NavChange" class="action" data-cur="lxj">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/TV' + [PageCur=='lxj'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='lxj'?'text-mv-yellow':'text-gray'">连续剧</view>
			</view>
			<view @click="NavChange" class="action text-gray add-action" data-cur="mvIndex">
				<button class="cu-btn fa-home fa bg-black shadow"
						:class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'"></button>
				<view :class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'">首页</view>
			</view>
			<view @click="NavChange" class="action" data-cur="zy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/variety' + [PageCur=='zy'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='zy'?'text-mv-yellow':'text-gray'">综艺</view>
			</view>
			<view @click="NavChange" class="action" data-cur="dm">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/cartoon' + [PageCur=='dm'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='dm'?'text-mv-yellow':'text-gray'">动漫</view>
			</view>
		</view>

	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                bgIndex: -1,
                address: '',
                desc: '',
                time: '',
                title: '',
                type: '',
                type2: '',
                PageCur: '',
                playDz: '',
                select_title: '',
                playInfo: [],
				nowPlayInfo: [],
				nowNum: localStorage.getItem('nowNum') == undefined ? 0 : localStorage.getItem('nowNum'),
				tempNum: 0,
				tempName: '',
                playbl: 1
            }
        },
        methods: {
            getPlay (href, index) {
                this.nowNum = index
                this.tempNum = index
				localStorage.setItem('nowNum', index)
				this.getPlayAll(href, 'http://mpvideo.qpic.cn/shg_3862243085_50000_c23be4f96b9a4bfe98b9b46b1254ba8d.f10002.mp4?dis_k=7b857187623b19aba42ac58338a0fa61&dis_t=1590402823')
				localStorage.setItem('ssPlay', href)
				setTimeout(() => {
                    localStorage.setItem('playStatus', 0)
                }, 2000)
            },
            switchPlay (index, name) {
                this.nowPlayInfo = []
                if (name == this.tempName) {
                    this.nowNum = this.tempNum
                    localStorage.setItem('nowNum', this.tempNum)
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
                } else {
                    this.nowNum = -1
                    localStorage.setItem('nowNum', -1)
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
				}
            },
            videoErrorCallback() {
                console.log('播放出错')
            },
            playStatus(e) {
            	if (localStorage.getItem('playStatus') == 0) {
            	    if (e.detail.currentTime > 3) {
            	        window.location.href = 'http://192.168.3.138:8888/mio/src/html/project/videoNew/share.html'
                        localStorage.setItem('playStatus', 1)
            	    }
            	}
            },
            NavChange(e) {
                this.$store.state.indexPage = e.currentTarget.dataset.cur
                this.router.push({name: 'mvHome'})
            },
			initMv (url, index) {
                this.ui.yunFun('getUrlData', {
                    url: `http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=${url}}`
                }, (res) => {
                    // console.log('得到的数据', res.result.body)
                    const data = JSON.parse(res.result.body)
                    this.address = data.address
                    this.desc = data.desc
                    this.time = data.time
                    this.title = data.title
                    this.type = data.type
                    this.type2 = data.type2
                    this.PageCur = data.PageCur
                    // this.playDz = index
                    this.playDz = data.m3u8[0].replace(/\"/g, '')
                    this.playInfo = data.playInfo
                    this.bgIndex = data.playInfo
                    this.select_title = data.select_title
                    this.tempName = data.select_title

                    console.log(this.playInfo)

                    this.nowPlayInfo = this.playInfo.find((item) => {
                        return item.num == this.select_title
                    })
                }, true, '加载中', (err) => {
                    uni.hideLoading()
                    this.ui.showToast('网络不稳定，请求超时', 'none', 3000)
                    this.initMv()
                    console.log(err)
                })
			},
			async getPlayAll (url, test) {
                // #ifdef MP-WEIXIN
                this.initMv(url)
                // #endif

                // #ifdef H5
                this.ui.showLoading()
                const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=${url}`)
                uni.hideLoading()
                console.log(data)
                this.address = data.address
                this.desc = data.desc
                this.time = data.time
                this.title = data.title
                this.type = data.type
                this.type2 = data.type2
                this.PageCur = data.PageCur
                this.playDz = data.m3u8[0].replace(/\"/g, '')
                // this.playDz = test
                this.playInfo = data.playInfo
                this.bgIndex = data.playInfo
                this.select_title = data.select_title
                this.tempName = data.select_title


                this.nowPlayInfo = this.playInfo.find((item) => {
                    return item.num == this.select_title
                })
				// this.$refs.myVideo.play()
                // #endif
			},
            playMv (e) {

            },
        },
        async onLoad() {
            // var status = window.location.href.split('/#')[0].split('playStatus=')[1]
			// console.log(status)
			// if (status == undefined) {
            //     localStorage.setItem('playStatus', 0)
            // } else {
            //     localStorage.setItem('playStatus', status)
			// }
			// console.log(localStorage.getItem('playStatus'))

			if (localStorage.getItem('nowNum') == null) {
                localStorage.setItem('playStatus', 0)
                localStorage.setItem('nowNum', 0)
			}
            // this.router.push({name: 'moviePlay'})



            // #ifdef MP-WEIXIN
            this.getPlayAll(uni.getStorageSync('ssPlay'))
            // #endif
			// #ifdef H5
            this.getPlayAll(localStorage.getItem('ssPlay'), 'http://mpvideo.qpic.cn/shg_3862243085_50000_891eb692d73e4aaaac815a6d81e43166.f10002.mp4?dis_k=d83ef23bed92e4314a0cfebcf515ec06&dis_t=1590399076')
            // #endif
        },
        computed: {
            ...mapState(['ssPlay']),
        },
    }
</script>

<style>
	page {
		background: rgb(30, 40, 40)
	}
	.my-bg-gray {
		background: rgb(46, 46, 58);
		color: rgb(204, 204, 204);
	}
	.my-bg-orange {
		background: rgb(255, 154, 20);
		color: white
	}
</style>
