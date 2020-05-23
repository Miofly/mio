<template>
	<view class="full-width flex justify-between align-center" style="height: 100rpx;background: rgba(19, 12, 12, 0.8)">
		<view class="margin-left">
			<view class="text-lg text-white">咕咚影院</view>
		</view>
		<view class="margin-right" style="position: relative">
			<input v-model="ssKey"
				   @input="realIpt"
				   :adjust-position="false" type="text"
				   :placeholder=placeholder
				   confirm-type="search"
				   @search="doSearch(ssKey)"
				   style="background: white;color: black;height: 60rpx;width: 430rpx;border-radius: 20px;text-indent: 0.3rem;
					   padding-left: 20rpx;font-size: 0.1rem">
			<text @tap="doSearch(ssKey)" class="fa fa-search fr"
				  style="position: absolute;right: 30rpx;top: 14rpx;color: black"></text>
		</view>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
	import {mapState} from 'vuex'
	import {tu} from 'mioJs/toolUtils'
    export default {
       	data () {
       	    return {
                placeholder: '请输入影片名称',
       	    }
       	},
		methods: {
            realIpt (e) {
                this.$store.state.ssKey = e.detail.value
            },
            // 执行搜索
            doSearch: tu.throttle(async function () {
                if (this.$store.state.ssKey != '') {
                    // this.$emit('parentFun', this.keyword.trim())
                    this.ui.showLoading()
                    const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getDataInfo.php?keyword=${this.$store.state.ssKey}&page=${this.$store.state.sspage}`)
					this.$store.state.ssData = data
					uni.hideLoading()
                    // this.$Router.push({name: 'mvSearch', params: {key: '1'}})
                    this.router.push('/pages/index/movie/mvSearch')
                }
            }, 2000),
		},
		computed: {
		    ...mapState(['ssData', 'ssKey', 'sspage']),
		},
	}
</script>

<style>

</style>
