<template>
	<view style="background: rgb(30, 40, 40)">
		<mvHeader ref="head"></mvHeader>
		<view style="background: rgb(30, 40, 40);color: white">
			<view>
				<span>{{title}}</span>
				<span>{{time}}</span>
			</view>
			<view class="margin-top margin-bottom" style="color: #ccc">
				<view class="fl margin-right-ten">{{type}}</view>
				<view class="fl margin-right-ten">{{address == null ? '未知' : address}}</view>
				<view class="fl margin-right-ten">{{time == null ? '未知' : time}}</view>
			</view>
			<view style="clear: both" class="padding-top"></view>
			<view>
				播放来源
			</view>
			<view v-for="(item, index) in playInfo" :key="index" style="color: white">
				<view class="fl margin-left-sm">
					<image src="/static/images/movie/play2.png" style="width: 15px;height: 15px"
						   class="margin-top-sm"></image>
					<span class="margin-left-sm">{{item.num}}</span>
				</view>
			</view>
		</view>
		<view style="clear: both"></view>
		<mvFooter></mvFooter>
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
                address: '',
                desc: '',
                time: '',
                title: '',
                type: '',
                type2: '',
                PageCur: '',
                playDz: '',
                playInfo: []
            }
        },
        async onLoad() {
            const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=${this.$store.state.ssPlay}`)
            console.log(data)
            this.address = data.address
            this.desc = data.desc
            this.time = data.time
            this.title = data.title
            this.type = data.type
            this.type2 = data.type2
            this.PageCur = data.PageCur
            this.playDz = data.m3u8[0]
            this.playInfo = data.playInfo
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
</style>
