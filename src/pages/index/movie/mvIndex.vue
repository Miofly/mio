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

		<scroll-view style="background: rgb(30, 40, 40);">
			<!--当月最热电影-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热电影</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys.slice(0, 12)" :key="index" class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px">{{item.remark}}</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ? item.name.slice(0, 7) + '...' : item.name}}</view>
					</view>
				</view>
			</view>

			<!--当月最热连续剧-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-top-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热连续剧</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys.slice(12, 24)" :key="index" class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px">{{item.remark}}</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ? item.name.slice(0, 7) + '...' : item.name}}</view>
					</view>
				</view>
			</view>

			<!--当月最热综艺-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-top-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热综艺</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys.slice(24, 36)" :key="index" class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px">{{item.remark}}</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ? item.name.slice(0, 7) + '...' : item.name}}</view>
					</view>
				</view>
			</view>

			<!--当月最热动漫-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom padding-top">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热动漫</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view v-for="(item, index) in appyys.slice(36, 48)" :key="index" class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;z-index: 1"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 15rpx;font-size: 12px;z-index: 999">{{item.remark}}</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ? item.name.slice(0, 7) + '...' : item.name}}</view>
					</view>
				</view>
			</view>

			<view class="padding-bottom-thirty margin-left margin-top">
				<view style="color: #ccc;font-size: 16px">友情链接</view>
				<view class="margin-top-sm" style="color: #999999;font-size: 14px">
					<view class="fl">顶点小说</view>
					<view class="fl margin-left">顶点小说</view>
					<view class="fl margin-left">顶点小说</view>
					<view class="fl margin-left">顶点小说</view>
					<view class="fl margin-left">顶点小说</view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
	import {tu} from 'mioJs/toolUtils'
    const cheerio = require('cheerio')


    export default {
        data() {
            return {
                gridBorder: false,
                keyword: '',
                placeholder: '请输入影片或演员名称',
                appyys: []
            }
        },
		methods: {
            realTimeInput: tu.debounce(function (key) { // 实时输入搜索
                console.log(21312123132)
                if (this.ssBackIndex) {
                    this.indexShow = true
                    if (this.keyword.trim() != '') { // eslint-disable-line
                        this.saveKeyword(this.keyword.trim())
                        this.searchListShow = false
                        this.$emit('parentFun', this.keyword.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                    }
                } else {
                    this.indexShow = false
                    console.log(this.keyword.trim())
                    if (this.keyword.trim() != '') { // eslint-disable-line
                        this.saveKeyword(this.keyword.trim())
                        this.searchListShow = false
                        this.$emit('parentFun', this.keyword.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                    }
                }
            }, 2000),
            // 执行搜索
            doSearch: tu.throttle(function (key) {
                if (this.ssBackIndex) {
                    this.indexShow = true
                    if (this.keyword !== key.trim() && key.trim() != '') { // eslint-disable-line
                        this.keyword = key.trim()
                        this.saveKeyword(this.keyword)
                        this.searchListShow = false
                        this.$emit('parentFun', key.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                    } else {
                        this.searchListShow = false
                        console.log('搜索内容为空或者与上次一致')
                    }
                } else {
                    this.indexShow = false
                    if (this.keyword !== key.trim() && key.trim() != '') { // eslint-disable-line
                        this.keyword = key.trim()
                        this.saveKeyword(this.keyword)
                        this.searchListShow = false
                        this.$emit('parentFun', key.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                    } else {
                        this.searchListShow = false
                        console.log('搜索内容为空或者与上次一致')
                    }
                }
            }, 2000),
		},
	    async mounted () {
	        const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php')

			const $ = cheerio.load(data, {_useHtmlParser2: true})

            for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                this.appyys.push({
                    name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
                    url: `https://app.movie/index.php/vod/play/id/${
                        $('.stui-vodlist li').eq(i).children('a').attr('href').split('detail/id/')[1].replace('html', '')}/sid/1/nid/1.html`,
					remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
					img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim(),
                })
            }
	    },
    }
</script>

<style>
	.cu-list.grid {
		background: rgb(30, 40, 40)!important;
	}
	.cu-list.grid.no-border {
		padding: 0!important;
	}
</style>
