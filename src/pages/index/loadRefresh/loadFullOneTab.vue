<template>
	<view style="height: 100%">
		<!--当tabList没加载处理空布局-->
		<view v-if="tabLists.length == 0"></view>
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height">
				<scroll-view scroll-x style="position: fixed;top: 0;left: 0">
					<swiper-tab ref="mytab" v-model="tabClick" fullWidth="100%" :tabLists="tabLists"></swiper-tab>
				</scroll-view>
				<view style="height: 96rpx"></view>
				<swiper style="height: calc(100% - 96rpx);" :current="tabClick" @change="swiperChange">
					<swiper-item v-for="(item, index) in tabLists" :key="index">
						<mescroll-item :i="index" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>
<script>
    import MescrollItem from './mescroll-swiper-item-two'

    export default {
        components: {
            MescrollItem,
        },
        data() {
            return {
                tabLists: [
                    {name: '前端', type: 'frontend'},
                ],
                tabClick: 0 // 当前tab的下标
            }
        },
        onLoad() {
            // #ifdef H5
            document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, {passive: false})
            // #endif
        }
    }
</script>
