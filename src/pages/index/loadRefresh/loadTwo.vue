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
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item>
					<mescroll-item :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-item :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-item :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-item :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
		<!--#endif-->
	</view>
</template>

<script>
    import MescrollItem from './mescroll-swiper-item.vue'
    import AppTabs from 'zj/mescroll-uni/app-tabs.vue'

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
