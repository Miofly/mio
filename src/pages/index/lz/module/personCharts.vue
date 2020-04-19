<template>
	<view>
		<view class="full-width bg-red flex justify-center align-center text-xl" style="height: 100rpx;z-index: 999">
			点击明细
			<view @tap="tzChart" class="fr">
				图表
			</view>
		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in menuList" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-left">{{ item.stat_date }}</text>
					</view>
				</view>

				<view v-show="true" class="action">
					<view>
						<text class="width-eighty">总计费 {{ item.effective_click_total }} 次</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'

    export default {
        async mounted () {
        	const data = await commonPost('/my/seven-click-info')
			this.menuList = data.data
        },
		data () {
		    return {
		        menuList: []
		    }
		},
		methods: {
            tzChart () {
                this.router.push({name: 'personsCharts'})
            },
		},
    }
</script>

<style>

</style>
