<template>
	<view class="full-height" id="parent" style="overflow: hidden">
		<view class="padding">
			<view class="bg-white border-radius padding full-width">
				<view class="text-xl">测试团队</view>
				<view>测试公告</view>

				<view class="flex justify-between margin-top-xl">
					<view>更像龙</view>
					<view>昨天日点击次数</view>
				</view>
			</view>
			<view class="bg-white flex margin-top-xl justify-between full-width text-center" style="border-radius: 1rem">
				<view @tap="personSwitch" class="padding" :class="[status? 'bg-white' : 'bg-blue']" style="width: 50%;border-radius: 1rem;border-bottom-right-radius: 0;
				;border-top-right-radius: 0">个人排行</view>
				<view @tap="teamSwitch" class="padding" :class="[!status? 'bg-white' : 'bg-blue']" style="width: 50%;border-radius: 1rem;border-bottom-left-radius: 0;
				;border-top-left-radius: 0">小组排行</view>
			</view>
		</view>

		<view class="padding full-height">
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
	</view>
</template>

<script>
    import MescrollItem from './team-swiper'
    import AppTabs from 'cn/load/mescroll-uni/app-tabs.vue'
	import {mapState} from 'vuex'
    export default {
        components: {
            MescrollItem,
            AppTabs
        },

		data () {
		    return {
		        status: true,
                height: '62%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '上周'],
                tabIndex: 0 // 当前tab的下标
		    }
		},
		methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
		    personSwitch () {
		    	this.status = !this.status
		    },
            teamSwitch () {
                this.status = !this.status
            }
		}
    }
</script>

<style>
	#parent >>> .app-tabs .tabs-item .active{
		color: rgb(0, 129, 255);
	}
	#parent >>> .app-tabs .tabs-line{
		background: rgb(0, 129, 255);
	}
</style>
