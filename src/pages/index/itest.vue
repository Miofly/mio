<template>
	<view style="overflow: hidden">
		<view class="padding">

					<mescroll-item :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>

		</view>

	</view>
</template>

<script>
    import MescrollItem from './mescroll-swiper-item.vue'
    import AppTabs from 'cn/load/mescroll-uni/app-tabs.vue'

    export default {
        components: {
            MescrollItem,
            AppTabs
        },
        data() {
            return {
                height: '300px', // 需要固定swiper的高度
                tabs: ['tabOne', 'tabTwo', 'tabThree', 'tabFour'],
                tabIndex: 0 // 当前tab的下标
            }
        },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            }
        },
        onLoad() {
            // 需要固定swiper的高度
            // this.height = uni.getSystemInfoSync().windowHeight + 'px'
            console.log(this.height)
        }
    }
</script>

<style>
</style>
