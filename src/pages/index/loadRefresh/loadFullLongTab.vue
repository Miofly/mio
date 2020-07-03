<template>
	<view style="height: 100%">
		<!--当tabList没加载处理空布局-->
		<view v-if="tabLists.length == 0"></view>
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height">
				<scroll-view scroll-x style="position: fixed;top: 0;left: 0">
					<swiper-tab ref="mytab" v-model="tabClick" fullWidth="100%" :tabLists="tabLists"></swiper-tab>
				</scroll-view>
				<!--固定设置高度-->
				<view :style="{height: fixCon? '196rpx' : '96rpx'}"></view>

				<view v-if="fixCon" style="position: fixed;top: 100rpx;z-index: 9999;height: 100rpx" class="full-width">
					1111
				</view>

				<swiper :style="{height: fixCon? 'calc(100% - 196rpx)' : 'calc(100% - 96rpx)'}" :current="tabClick" @change="swiperChange">
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
                fixCon: false, // 是否需要固定布局
                tabLists: [
                    {name: '前端', type: 'frontend'},
                    {name: '后端', type: 'backend'},
                    {name: '安卓', type: 'Android'},
                    {name: '苹果', type: 'iOS'},
                    {name: 'Flutter', type: 'Flutter'},
                    {name: '应用程序', type: 'app'},
                ],
                tabClick: 0 // 当前tab的下标
            }
        },
        methods: {
            swiperChange(e) { // 轮播菜单
                this.tabClick = e.detail.current
                this.$refs.mytab.longClick(e.detail.current)
            },
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
