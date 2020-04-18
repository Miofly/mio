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

		<view class="padding">
			<view class="bg-white border-radius padding full-width height-thirty">
				<!--<view class="cu-avatar margin-left fr"-->
					  <!--:class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][1], ]"-->
					  <!--:style="{backgroundImage:url('+headerInfos.avatar+')}">-->
				<!--</view>-->
				<view class="text-xl text-bold">{{headerInfos.teamName}}
					<span class="text-normal text-df margin-left text">({{headerInfos.memberNums}})人</span>
				</view>
				<view class="text-df margin-top">{{headerInfos.teamSlogan}}</view>

				<view class="flex justify-between margin-top-xl">
					<view>{{headerInfos.teamLeader}}</view>
					<view>{{headerInfos.teamNums}}</view>
				</view>
			</view>
		</view>

		<view v-if="status" class="padding full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item>
					<mescroll-item ref="itemOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-item ref="itemTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-item ref="itemThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-item ref="itemFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>

		<view v-if="!status" class="padding full-height">
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="false"></app-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item>
					<mescroll-items ref="itemOne" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-items ref="itemTwo" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-items ref="itemThree" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-items ref="itemFour" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-items>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
        commonPost
	} from '@/api'
    import MescrollItem from './team-swiper'
    import MescrollItems from './team-swipers'
    import AppTabs from 'cn/load/mescroll-uni/app-tabs.vue'
	// import {mapState} from 'vuex'
    export default {
        components: {
            MescrollItem,
            MescrollItems,
            AppTabs
        },
		async mounted () {
			const data = await commonPost('/team/team-info')
			console.log(data.data)
			console.log(data.data)
            this.headerInfos.teamName = data.data.name
            this.headerInfos.teamSlogan = data.data.slogan
            this.headerInfos.teamLeader = data.data.team_captain_name
            this.headerInfos.avatar = data.data.team_avatar
            this.headerInfos.memberNums = data.data.member_nums
        },
		data () {
		    return {
		        status: true,
                height: '62%', // 需要固定swiper的高度
                tabs: ['今日', '昨日', '本周', '上周'],
                tabIndex: 0, // 当前tab的下标
                headerInfos: {
                    teamName: '',
                    teamSlogan: '',
                    teamLeader: '',
                    avatar: '',
                    memberNums: ''
				}
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
	/*#parent >>> .app-tabs .tabs-item .active{*/
		/*color: rgb(0, 129, 255);*/
	/*}*/
	/*#parent >>> .app-tabs .tabs-line{*/
		/*background: rgb(0, 129, 255);*/
	/*}*/
</style>
