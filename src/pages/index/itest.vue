<template>
	<view style="height: 100%">
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view class="full-height">
				<swiper-tab ref="mytab" v-model="tabClick" fullWidth="100%" :tabLists="tabLists"></swiper-tab>
				<swiper style="height: calc(100% - 90rpx);" :current="tabClick" @change="swiperChange">
					<swiper-item>
						<txv-video vid="i0975w0af8a" playerid="txv1"></txv-video>

						<mescroll-item :i="0" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>

					<swiper-item>
						<mescroll-item :i="1" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>

					<swiper-item>
						<mescroll-item :i="2" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>

					<swiper-item>
						<mescroll-item :i="3" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>

					<swiper-item>
						<mescroll-item :i="4" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>

					<swiper-item>
						<mescroll-item :i="5" :index="tabClick" :tabs="tabLists"></mescroll-item>
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
