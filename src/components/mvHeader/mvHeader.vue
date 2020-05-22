<template>
	<view class="full-width flex justify-between align-center" style="height: 100rpx;background: black">
		<view class="margin-left">
			<view class="text-lg">咕咚影院</view>
		</view>
		<view class="margin-right" style="position: relative">
			<input v-model="keyword"
				   :adjust-position="false" type="text"
				   :placeholder=placeholder
				   confirm-type="search"
				   @search="doSearch(keyword)"
				   style="background: white;color: black;height: 60rpx;width: 430rpx;border-radius: 20px;text-indent: 0.3rem;
					   padding-left: 20rpx;font-size: 0.1rem">
			<text @tap="doSearch(keyword)" class="fa fa-search fr"
				  style="position: absolute;right: 30rpx;top: 14rpx;color: black"></text>
		</view>
	</view>
</template>

<script>
	import {tu} from 'mioJs/toolUtils'
    export default {
       	data () {
       	    return {
                keyword: '',
                placeholder: '请输入影片名称',
       	    }
       	},
		methods: {
            // 执行搜索
            doSearch: tu.throttle(function () {
                if (this.keyword != '') {
                    this.$emit('parentFun', this.keyword.trim())
                }
            }, 2000),
		},
	}
</script>

<style>

</style>
