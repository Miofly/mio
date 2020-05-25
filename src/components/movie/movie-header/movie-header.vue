<template>
	<view class="full-width flex justify-between align-center" style="height: 100rpx;background: black">
		<view class="margin-left">
			<view class="text-lg text-white">咕咚影院</view>
		</view>
		<view class="margin-right" style="position: relative">
			<input v-model="keyword"
				   @input="realIpt"
				   :adjust-position="false" type="text"
				   :placeholder=placeholder
				   confirm-type="search"
				   @search="doSearchTwo()"
				   style="background: white;color: black;height: 60rpx;width: 430rpx;
				   border-radius: 20px;text-indent: 2px;
					   padding-left: 20rpx;font-size: 12px">
			<text @tap="doSearchTwo()" class="fa fa-search fr"
				  style="position: absolute;right: 30rpx;top: 14rpx;color: black"></text>
		</view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    import {mapState} from 'vuex'
    import {tu} from '@/common/js/toolUtils'

    export default {
        data() {
            return {
                placeholder: '请输入影片名称',
				// #ifdef H5
                keyword: localStorage.getItem('sskey'),
				// #endif
				// #ifdef MP-WEIXIN
                keyword: this.ui.getStorage('sskey')
				// #endif
            }
        },
        methods: {
            realIpt(e) {
                localStorage.setItem('sskey', e.detail.value)
            },
            // 执行搜索
            doSearch: tu.throttle(async function () {
                if (localStorage.getItem('sskey') != '') {
                    // this.$emit('parentFun', this.keyword.trim())
                    this.ui.showLoading()
                    const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getDataInfo.php?keyword=${localStorage.getItem('sskey')}&page=${this.$store.state.sspage}`)
                    this.$store.state.ssData = data
                    uni.hideLoading()
                    // this.$Router.push({name: 'mvSearch', params: {key: '1'}})
                    this.router.push('/pages/index/movie/mvSearch')
                }
            }, 2000),
            doSearchTwo: tu.throttle(async function () {
                this.$store.state.sspage = 1
                if (localStorage.getItem('sskey') != '') {
                    // this.$emit('parentFun', this.keyword.trim())
                    this.ui.showLoading()
                    const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getDataInfo.php?keyword=${localStorage.getItem('sskey')}&page=${this.$store.state.sspage}`)
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
