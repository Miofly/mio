<template>
	<view class="full-height" id="parent">
		<view class="full-width bg-red flex justify-center align-center text-xl" style="height: 100rpx;">
			{{name}}成员排行
		</view>

		<view class="full-height">
			<swiper-tab v-model="tabIndex" :tab-lists="tabs" :fixed="false"></swiper-tab>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item>
					<mescroll-item ref="stOne" :url="url" :parmas="parmas" :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 奶粉 -->
				<swiper-item>
					<mescroll-item ref="stTwo" :url="url" :parmas="parmas" :i="1" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 面膜 -->
				<swiper-item>
					<mescroll-item ref="stThree" :url="url" :parmas="parmas" :i="2" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>

				<!-- 图书 -->
				<swiper-item>
					<mescroll-item ref="stFour" :url="url" :parmas="parmas" :i="3" :index="tabIndex" :tabs="tabs"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
    import MescrollItem from './memberRank-swiper'
    export default {
        components: {
            MescrollItem,
        },
		onLoad (e) {
			const data = JSON.parse(e.query)
			this.id = data.department_id
			this.name = data.name
			this.parmas = {department_id: this.id}
		},
        data () {
            return {
                name: '',
				id: '',
                url: '/team/department-member-list',
				parmas: {},
                status: true,
                height: '62%', // 需要固定swiper的高度
                tabs: [{name: '今日'}, {name: '昨日'}, {name: '本周'}, {name: '上周'}],
                tabIndex: 0, // 当前tab的下标
            }
        },
        methods: {
            // 轮播菜单
            swiperChange(e) {
                this.tabIndex = e.detail.current
            },
        }
    }
</script>

<style>

</style>
