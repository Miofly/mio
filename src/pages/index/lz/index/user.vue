<template>
	<view class="full-width-height">
		<view class="height-twenty-five bg-red padding text-center margin-center">
			<view class="cu-avatar margin-left margin-bottom"
				  :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][2], ]"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
				<view v-show="false" class="cu-tag badge">999</view>
			</view>
			<view class="text-xxl text-bold">常冬冬</view>
			<view class="text-lg">支付宝账号：123333</view>
		</view>
		<view class="cu-list grid" :class="['col-' + 3, true?'':'no-border']">
			<view class="cu-item" v-for="(item, index) in [
		            {frequency: '666', color: 'red', badge: 0, name: '今日计费次数'},
		            {frequency: '888', color: 'red', badge: 0,  name: '昨日计费次数'},
		            {frequency: '11989', color: 'red', badge: 0, name: '本月计费次数'},
		            ]" :key="index">
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
		<mio-modal title="提示" content="退出登录后将无法继续转发赚钱哦~" @click="handClick"
				   :show="modalStatus" :custom="false" @cancel="hide">
		</mio-modal>
	</view>

</template>

<script>
	import mioModal from 'cn/modal/modal'
	import {
	    commonPost
	} from '@/api'

    export default {
	    components: {
	        mioModal
	    },
        data () {
            return {
                modalStatus: false,
                menuList: [
                    {icon: 'navicon', color: 'red', badge: 0, name: '点击明细'},
                    {icon: 'lock', color: 'red', badge: 0, name: '修改密码'},
                    {icon: 'address-card', color: 'red', badge: 0, name: '个人资料'},
                    {icon: 'commenting', color: 'red', badge: 0, name: '联系客服'},
                    {icon: 'info-circle', color: 'red', badge: 0, name: '关于我们'},
                    {icon: 'power-off', color: 'red', badge: 0, name: '退出登录'},
                    {icon: 'user-plus', color: 'red', badge: 0, name: '团队管理'}
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
            listFn (name) {
				if (name == '退出登录') {
                    this.modalStatus = true
				}
                if (name == '提现记录') {
                    this.ui.showToast(name)
                }
                if (name == '账单记录') {
                    this.ui.showToast(name)
                }
            },
		},
    }
</script>

<style>

</style>
