<template>
	<view>
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
		<view class="flex justify-between">
			<view>
				<image :src="img" mode="scaleToFill" style="height: 330rpx;"
					   :class="[false?'cu-avatar':'', false?'round': '']"></image>
			</view>
			<view>
				大萨达
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
			const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/videoPlayInfo.php?url=/index.php/vod/play/id/196837/sid/1/nid/1.html')
          	console.log(data)
        },
	}
</script>

<style>

</style>
