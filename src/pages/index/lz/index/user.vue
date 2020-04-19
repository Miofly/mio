<template>
	<view class="full-width-height">
		<view class="height-twenty-five bg-red padding text-center margin-center">
			<view class="cu-avatar margin-left margin-bottom"
				  :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2], ]"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
				<view v-show="false" class="cu-tag badge">999</view>
			</view>
			<view class="text-xxl">{{name}}</view>
			<view class="text-lg">支付宝账号：{{alipay_account}}</view>
		</view>
		<view class="cu-list grid" :class="['col-' + 3, true?'':'no-border']">
			<view class="cu-item" v-for="(item, index) in jfLists" :key="index">
				<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<view class="text-bold text-red text-xxl">{{item.frequency}}</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + 3, true?'':'no-border']">
			<view class="cu-item" @tap="listFn(item.name)" v-for="(item, index) in menuList" :key="index">
				<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<modal title="提示" content="退出登录后将无法继续转发赚钱哦~" @click="handClick"
				   :show="modalStatus" :custom="false" @cancel="hide">
		</modal>
	</view>

</template>

<script>
	import {
	    commonPost
	} from '@/api'

    export default {
		async mounted () {
			const res = await commonPost('/my/click-info')
			const data = res.data
			this.monthClick = data.monthClick
			this.todayClick = data.todayClick
			this.yesterdayClick = data.yesterdayClick
			this.mobile = data.mobile
			this.alipay_account = data.alipay_account
			this.name = data.true_name
		},
        data () {
            return {
                name: '',
                alipay_account: '',
                mobile: '',
                monthClick: '',
                todayClick: '',
                yesterdayClick: '',

                modalStatus: false,
                menuList: [
                    {icon: 'navicon', color: 'red', badge: 0, name: '点击明细'},
                    {icon: 'lock', color: 'red', badge: 0, name: '修改密码'},
                    {icon: 'address-card', color: 'red', badge: 0, name: '个人资料'},
                    {icon: 'commenting', color: 'red', badge: 0, name: '配置管理'},
                    {icon: 'power-off', color: 'red', badge: 0, name: '退出登录'},
                    {icon: 'user-plus', color: 'red', badge: 0, name: '团队管理'}
                ]
            }
        },
		computed: {
            jfLists: function () {
                return [
                    {frequency: this.todayClick, color: 'red', badge: 0, name: '今日计费次数'},
                    {frequency: this.yesterdayClick, color: 'red', badge: 0, name: '昨日计费次数'},
                    {frequency: this.monthClick, color: 'red', badge: 0, name: '本月计费次数'}
                ]
            }
		},
		methods: {
            async handClick (e) {
                console.log(e)
				if (e.index == 0) {
                    this.hide()
				} else {
					const data = await commonPost('/auth/log-out')
					localStorage.removeItem('TOKEN_KEY')
					if (data.code == 200) {
					    this.ui.showToast('退出成功')
					}
					console.log(data)
				}
            },
            hide () {
                this.modalStatus = false
            },
            async listFn (name) {
				if (name == '点击明细') {
					this.router.push({name: 'personCharts'})
				}
                if (name == '配置管理') {
                    this.router.push({name: 'config'})
                }
                if (name == '个人资料') {
                    this.router.push({name: 'personInfos'})
                }
                if (name == '团队管理') {
                    this.router.push({name: 'config'})
                }
            },
		},
    }
</script>

<style>

</style>
