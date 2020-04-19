<template>
	<view class="full-height" id="parent">
		<view class="full-width bg-red " style="height: 200rpx;padding-top: 60rpx">
			<view class="bg-red flex justify-between width-fifty text-center text-lg "
				  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;">
				<view @tap="teamSwitch" class="padding" :class="[status? 'text-red bg-white' : 'text-white']"
					  style="width: 50%;border-bottom-right-radius: 0;
				;border-top-right-radius: 0">团队排行</view>
				<view @tap="personSwitch" class="padding" :class="[!status? 'text-red bg-white' : 'text-white']"
					  style="width: 50%;border-bottom-left-radius: 0;
				;border-top-left-radius: 0">部门排行</view>
			</view>
		</view>
		<view v-if="status" class="full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-item ref="stOne" :url="url" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stTwo" :url="url" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stThree" :url="url" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<swiper-item>
					<mescroll-item ref="stFour" :url="url" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>

		<view v-else class="full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>
					<mescroll-items ref="stOne" :url="url" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stTwo" :url="url" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stThree" :url="url" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<swiper-item>
					<mescroll-items ref="stFour" :url="url" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
    import MescrollItem from './rank-swiper'
    import MescrollItems from './rank-swipers'

    import AppTabs from 'zj/mescroll-uni/app-tabs.vue'
    export default {
        components: {
            MescrollItem,
            MescrollItems,
            AppTabs
        },
        data () {
            return {
                status: true,
                height: '62%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '上周'],
                tabIndex: 0, // 当前tab的下标
            }
        },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
            teamSwitch () { // 团队
                this.tabIndex = 0
                this.status = !this.status
            },
            personSwitch () { // 部门
                this.tabIndex = 0
                this.status = !this.status
            },
        }
    }
</script>

<style>

</style>
