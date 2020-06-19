<template>
	<view style="height: 100%">
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view class=" full-height">
				<swiper-tab ref="mytab" v-model="tabClick" fullWidth="100%" :tabLists="tabLists"></swiper-tab>
				<swiper style="height: calc(100% - 90rpx);" :current="tabClick">
					<swiper-item>
						<mescroll-item :i="0" :index="tabClick" :tabs="tabLists"></mescroll-item>
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
