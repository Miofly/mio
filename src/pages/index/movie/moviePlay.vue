<template>
	<view style="background: rgb(30, 40, 40)">
		<movie-header ref="head"></movie-header>
		<video id="myVideo"
			   class="full-width"
			   poster="/static/images/movie/loading_wap3.gif"
			   :src="playDz"
			   @error="videoErrorCallback" autoplay="true" page-gesture="true" enable-play-gesture="true"
			   vslide-gesture="true"
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
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
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
				nowNum: 0,
				tempNum: 0,
				tempName: '',
            }
        },
        methods: {
            getPlay (href, index) {
                this.nowNum = index
                this.tempNum = index
                console.log(href)
                this.getPlayAll(href)
            },
            switchPlay (index, name) {
                this.nowPlayInfo = []
                if (name == this.tempName) {
                    this.nowNum = this.tempNum
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
                } else {
                    this.nowNum = -1
                    setTimeout(() => {
                        this.nowPlayInfo = this.playInfo[index]
                        this.select_title = this.playInfo[index].num
                    }, 300)
				}
            },
            videoErrorCallback() {
                console.log('播放出错')
            },
            playStatus() {

            },
            NavChange(e) {
                this.$store.state.indexPage = e.currentTarget.dataset.cur
                this.router.push({name: 'mvHome'})
            },
			async getPlayAll (url) {
                this.ui.showLoading()
                const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=${url}}`)
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
                this.playInfo = data.playInfo
                this.bgIndex = data.playInfo
                this.select_title = data.select_title
                this.tempName = data.select_title

                console.log(this.playInfo)

                this.nowPlayInfo = this.playInfo.find((item) => {
                    return item.num == this.select_title
                })
			},
        },
        async onLoad() {
			this.getPlayAll(localStorage.getItem('ssPlay'))
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
