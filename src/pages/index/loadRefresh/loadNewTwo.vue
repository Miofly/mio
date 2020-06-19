<template>
	<!--#ifdef H5-->
	<view style="height: 100%">
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;">
			<view class=" full-height">
				<tab-longtab ref="mytab" v-model="tabClick" full-width="100%" :tabLists="tabLists"></tab-longtab>
				<swiper style="height: 95%" :current="tabClick" @change="swiperChange">
					<swiper-item>
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
	<!--#endif-->
</template>

<script>
    import MescrollItem from './mescroll-swiper-item-two'
    import TabLongtab from '@/components/tab/tab-longtab/tab-longtab'

    export default {
        components: {
            TabLongtab,
            MescrollItem,
        },
        data() {
            return {
                height: '100%', // 需要固定swiper的高度
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
            // 轮播菜单
            swiperChange(e) {
                this.tabClick = e.detail.current
                this.$refs.mytab.longClick(e.detail.current)
            },
        },
        onLoad() {
            document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, {passive: false})
            // 需要固定swiper的高度
            // this.height = uni.getSystemInfoSync().windowHeight + 'px'
            // console.log(this.height)
        }
    }
</script>
