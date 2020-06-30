<template>
	<view style="overflow: hidden">
		<!--#ifdef H5-->
		<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '列表一', icon: 'video-camera'},
				{name: '列表一', icon: 'user'},
				{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue margin-right" :class="['fa-' + item.icon]"></text>
						<text>{{ item.name }}</text>
					</view>
				</view>

				<view v-show="false" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<view class="padding">
			<app-tabs ref="mytab" v-model="tabClick" :tabLists="tabLists"></app-tabs>
			<swiper :style="{height: height}" :current="tabClick" @change="swiperChange">
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

		<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '列表一', icon: 'video-camera'},
				{name: '列表一', icon: 'user'},
				{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue margin-right" :class="['fa-' + item.icon]"></text>
						<text>{{ item.name }}</text>
					</view>
				</view>

				<view v-show="false" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
		<!--#endif-->
	</view>
</template>

<script>
    import MescrollItem from '../../../../pages/index/loadRefresh/mescroll-swiper-item-two'
    import AppTabs from 'src/components/mescroll-uni/app-tabs-two.vue'


    export default {
        components: {
            MescrollItem,
            AppTabs
        },
        data() {
            return {
                height: '700rpx', // 需要固定swiper的高度
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
            // document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
            //     evt.preventDefault()
            // }, {passive: false})
            // // 需要固定swiper的高度
            // // this.height = uni.getSystemInfoSync().windowHeight + 'px'
            // console.log(this.height)
        }
    }
</script>
