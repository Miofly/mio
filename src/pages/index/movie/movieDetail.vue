<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<view class="full-width flex justify-between align-center" style="height: 100rpx;background: red">
			<view class="margin-left">
				<view>App影院</view>
			</view>
			<view class="margin-right" style="position: relative">
				<input v-model="keyword"
					   @input="realTimeInput(keyword)"
					   :adjust-position="false" type="text"
					   :placeholder=placeholder
					   confirm-type="search"
					   @search="doSearch(keyword)"
					   style="background: white;color: black;height: 60rpx;width: 430rpx;border-radius: 20px;text-indent: 0.3rem;
					   padding-left: 20rpx;font-size: 0.1rem">
				<text class="fa fa-search fr" style="position: absolute;right: 0;top: -20rpx;color: #eee"></text>
			</view>
		</view>
		<view class="padding" style="background: rgb(30, 40, 40);">
			<view class="fl" style="width: 30%">
				<image :src="img" mode="scaleToFill" style="height: 350rpx;width: 240rpx"
					   :class="[false?'cu-avatar':'', false?'round': '']"></image>
			</view>
			<view class="fl margin-left" style="width: 65%">
				<view>{{title}}</view>
				<view class="">
					<view class="fl margin-right-lg">{{type}}</view>
					<view class="fl margin-right-lg">{{address == null ? '未知' : address}}</view>
					<view class="fl margin-right-lg">{{time == null ? '未知' : time}}</view>
				</view>
				<view style="clear: both"></view>
				<view>{{status}}</view>
				<view>{{people}}</view>
				<view>{{director}}</view>
				<view>
					<button class="cu-btn" :class="[['bg-orange', 'line-blue', 'line-blue lines-blue'][0],
					        ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					        <text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
						立即播放
					</button>
				</view>
			</view>
			<view style="clear: both"></view>
			<view>
				<view>剧情介绍</view>
				<view>{{descRes.trim()}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    export default {
        data () {
            return {
                address: '',
                descRes: '',
                director: '',
                img: '',
                people: '',
                playHref: '',
                status: '',
                time: '',
                title: '',
                type: '',
            }
        },
        async onLoad () {
            const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=/index.php/vod/detail/id/140051.html')
            this.address = data.address
            this.descRes = data.descRes
            this.director = data.director
            this.img = data.img
            this.people = data.people
            this.playHref = data.playHref
            this.status = data.status
            this.time = data.time
            this.title = data.title
            this.type = data.type
        },
    }
</script>

<style>

</style>
