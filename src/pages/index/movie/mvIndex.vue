<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<view class="full-width flex justify-between align-center" style="height: 100rpx;background: red">
			<view class="margin-left">
				<view>App影院</view>
			</view>
			<view class="margin-right">
				<input v-model="keyword" @focus="inputFocus"
					   @input="realTimeInput(keyword)"
					   :adjust-position="false" type="text"
					   :placeholder=placeholder
					   confirm-type="search"
					   @search="doSearch(keyword)"
					   style="background: white;color: black;height: 60rpx;width: 430rpx;border-radius: 20px;text-indent: 0.3rem;padding-left: 20rpx;font-size: 0.1rem">
			</view>
		</view>

		<scroll-view class="padding-sm">
			<view class="flex justify-between">
				<view class="text-lg" style="color: #ccc;">当月最热电影</view>
				<!--<view>更多</view>-->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'



    export default {
	    async mounted () {
	        const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php')

			const $ = cheerio.load(res.data, {_useHtmlParser2: true})
	    },


        data() {
            return {
                keyword: '',
                placeholder: '请输入影片或演员名称'
            }
        },
    }
</script>
