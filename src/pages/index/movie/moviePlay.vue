<template>
	<view style="background: rgb(30, 40, 40)">
		<movie-header ref="head"></movie-header>
		<view style="color: white">{{test}}</view>
		<view style="color: white">{{test1}}</view>
		<!--#ifdef H5-->
		<video id="myVideo" ref="myVideo"
			   class="full-width"
			   :poster="poster"
			   :src="playDz" autoplay
			   @error="videoErrorCallback" page-gesture="true" enable-play-gesture="true"
			   vslide-gesture="true" @play="playMv"
			   :title="title" @timeupdate="playStatus"
			   controls></video>
		<!--#endif-->
		<!--#ifdef MP-WEIXIN-->
		<!--<video id="myVideo" ref="myVideo"-->
			   <!--class="full-width"-->
			   <!--poster="/static/images/movie/loading_wap3.gif"-->
			   <!--:src="playDz" autoplay-->
			   <!--@error="videoErrorCallback" page-gesture="true" enable-play-gesture="true"-->
			   <!--vslide-gesture="true" @play="playMv"-->
			   <!--:title="title" @timeupdate="playStatus"-->
			   <!--controls></video>-->
		<!--#endif-->

		<view style="background: rgb(30, 40, 40);color: white" class="padding">
			<view>
				<span>{{title}}</span>
				<span>{{time == null ? '未知' : time}}</span>
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
		<view v-if="xfStatus" @tap="backIndex" style="color: #ccc;font-size: 16px;width: 100%;" class="text-center margin-top margin-left-sm">
			返回首页
		</view>
		<movie-footer></movie-footer>

		<view v-if="xfStatus"  @tap="tzUrl" style="position: fixed;bottom: 0;left: 0;width: 100%;text-align: center">
			<image style="width: 100%;height: 250rpx"
				   :src="imgSrc"
				   :class="[false?'cu-avatar':'', false?'round': '']"></image>
		</view>




		<view v-if="!xfStatus" class="cu-bar tabbar foot" style="background: rgb(39, 41, 56)">
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
                poster: 'http://t4o346yasw.weixin.vsysf.com/xx3-88/gudong/home/static/images/movie/loading_wap3.gif',
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
				nowNum: 0,
				tempNum: 0,
				tempName: '',
                playbl: 1,
                tempVar: false,
                xfStatus: '',
                test: '',
                test1: '',
                imgSrc: '',
            }
        },
        methods: {
            tzUrl () {
                // #ifdef H5
                window.location.href = localStorage.getItem('xfUrl')
                // #endif
            },
            backIndex () {
                this.$store.state.indexPage = 'mvIndex'
                this.router.push({name: 'mvHome'})
            },
            getPlay (href, index) {
                // #ifdef H5
                this.tempVar = false
                this.nowNum = index
                this.tempNum = index
                localStorage.setItem('nowNum', index)
                this.getPlayAll(href, 'http://mpvideo.qpic.cn/shg_3862243085_50000_c23be4f96b9a4bfe98b9b46b1254ba8d.f10002.mp4?dis_k=7b857187623b19aba42ac58338a0fa61&dis_t=1590402823')
                localStorage.setItem('ssPlay', href)
                setTimeout(() => {
                    localStorage.setItem('playStatus', 0)
                }, 2000)
                // #endif
               // #ifdef MP-WEIXIN
                this.nowNum = index
                this.tempNum = index
				this.ui.setStorage('nowNum', index)
                this.getPlayAll(href, 'http://mpvideo.qpic.cn/shg_3862243085_50000_c23be4f96b9a4bfe98b9b46b1254ba8d.f10002.mp4?dis_k=7b857187623b19aba42ac58338a0fa61&dis_t=1590402823')
                this.ui.setStorage('ssPlay', href)
               // #endif
            },
            switchPlay (index, name) {
                // #ifdef H5
                this.tempVar = false
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
                // #endif
                // #ifdef MP-WEIXIN
                this.nowPlayInfo = []
                if (name == this.tempName) {
                    this.nowNum = this.tempNum
					this.ui.setStorage('nowNum', this.tempNum)
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
                } else {
                    this.nowNum = -1
                    this.ui.setStorage('nowNum', -1)
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
                }
                // #endif
            },
            videoErrorCallback() {
                console.log('播放出错')
            },
            playStatus(e) {
                // #ifdef H5
				var temp = 'a'
                if (localStorage.getItem('playStatus') == 1 && temp == 'a') {
                    if (e.detail.currentTime < 0.1) {
                        this.$refs.myVideo.seek(localStorage.getItem('time'))
						temp = 'b'
                    }
                }
                if (localStorage.getItem('playStatus') == 0) {
                    if (e.detail.currentTime > localStorage.getItem('time')) {
                        window.location.href = `${localStorage.getItem('luodi2_url')}?ssplay=${localStorage.getItem('ssPlay')}&nowNum=${localStorage.getItem('nowNum')}&playStatus=${localStorage.getItem('playStatus')}`
                        localStorage.setItem('playStatus', 1)
						localStorage.removeItem('ssPlay')
						localStorage.removeItem('nowNum')
                    }
                }
                // #endif
            },
            NavChange(e) {
                this.$store.state.indexPage = e.currentTarget.dataset.cur
                this.router.push({name: 'mvHome'})
            },
			initMv (url, index) {
                this.ui.yunFun('getUrlData', {
                    url: `http://123.0t038.cn/jin-61/wfd/515love/api/videoPlayInfo.php?url=${url}}`
                }, (res) => {
                    const data = JSON.parse(res.result.body)
                    this.address = data.address
                    this.desc = data.desc
                    this.time = data.time
                    this.title = data.title
                    this.type = data.type
                    this.type2 = data.type2
                    this.PageCur = data.PageCur
                    this.playDz = data.m3u8[0].replace(/\"/g, '')
                    this.playInfo = data.playInfo
                    this.bgIndex = data.playInfo
                    this.select_title = data.select_title
                    this.tempName = data.select_title

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
                const data = await publicGet(`videoPlayInfo.php?url=${url}`)
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
                // #endif
			},
            playMv (e) {
                // #ifdef H5
                // if (localStorage.getItem('playStatus') == 1) {
                //     this.$refs.myVideo.seek(localStorage.getItem('time'))
                // }
                // #endif
            },
            async initData () {
                if (localStorage.getItem('ssPlay') == null) {
                    localStorage.setItem('ssPlay', location.href.split('#')[0].split('?')[1].split('&')[0].split('=')[1])
                    localStorage.setItem('nowNum', location.href.split('#')[0].split('?')[1].split('&')[1].split('=')[1])
                }
                const data = await publicGet('getCinemaInfo.php')
                localStorage.setItem('cinemaName', data.cinemaName)
                localStorage.setItem('friend_link', JSON.stringify(data.friend_link))
                localStorage.setItem('qrcode', data.qrcode)
                localStorage.setItem('luodi2_url', data.luodi2_url)
                localStorage.setItem('time', data.time)
                localStorage.setItem('xfImg', data.xfImg)
                localStorage.setItem('xfUrl', data.xfUrl)
                localStorage.setItem('xfStatus', data.xfStatus)


				if (localStorage.getItem('xfStatus') == 'false') {
                    this.xfStatus = false
                }

                if (localStorage.getItem('xfStatus') == 'true') {
                    this.xfStatus = true
                }

                this.imgSrc = localStorage.getItem('xfImg')

                this.nowNum = localStorage.getItem('nowNum') == undefined ? 0 : localStorage.getItem('nowNum')

                if (localStorage.getItem('nowNum') == null) {
                    localStorage.setItem('playStatus', 0)
                    localStorage.setItem('nowNum', 0)
                }

				console.log(this.xfStatus)
                this.getPlayAll(localStorage.getItem('ssPlay'))
            },
        },
        async onLoad() {
            this.initData()

            // #ifdef MP-WEIXIN
            this.getPlayAll(uni.getStorageSync('ssPlay'))
            this.nowNum = this.ui.getStorageSync('nowNum') == undefined ? 0 : this.ui.getStorageSync('nowNum')
            // #endif
			// #ifdef H5



            // #endif
        },
        computed: {
            ...mapState(['ssPlay', 'indexPage']),
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
