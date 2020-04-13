<template>
	<view>
		<image src="/static/images/lz/hbg.jpg" class="full-width" style="height: 18rem"></image>
		<view class="bg-white center padding-xl border-radius width-ninety padding-top-xxl">
			<view>
				<view class="fa fa-phone fl margin-right-xl text-blue" style="font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="mobile" class="fa fa-close fr margin-right-lower" @tap="delVals('mobile')"></view>
					<!--<input type="['text', 'number', 'digit'][1]" v-model="mobile" :focus="true" :password="false" placeholder="请输入手机号码" maxlength="11"-->
						   <!--confirm-type="['send', 'search', 'next', 'go', 'done'][0]" />-->
					<input type='number' v-model="mobile" :focus="true" :password="false" placeholder="请输入手机号码" maxlength="11"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-lock fl margin-right-xl text-blue" style="font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="password" class="fa fa-close fr margin-right-lower" @tap="delVals('password')"></view>
					<input v-model="password" :focus="false" :password="true" placeholder="请输入密码" maxlength="8"
						   confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-xl">
				<button @tap="login" class="cu-btn full-width" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
                    ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
					登录
				</button>
			</view>
			<view class="flex justify-between margin-top-xl">
				<router-link to="{name: 'forget'}" class="text-blue">忘记密码</router-link>
				<router-link to="{name: 'reg'}" class="text-blue">注册账号</router-link>
			</view>

			<view class="text-center margin-top-ten">
				客服微信:
				<text @tap="copy" class="text-blue">{{wx}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
        commonPost
	} from '@/api'
    export default {
        data() {
            return {
                mobile: '17862983627',
                password: '111111',
                wx: 'SUNP8694',
            }
        },
		onLoad () {
            console.log(localStorage.getItem('TOKEN_KEY'))
		},
        methods: {
            delVals(val) {
                this[val] = ''
            },
            copy() {
                this.tu.getClipboardData(this.wx)
            },
            async login() {
                if (this.mobile.trim() == '') {
                    this.ui.showToast('手机号码不能为空')
                    return
                }
                if (this.password.trim() == '') {
                    this.ui.showToast('密码不能为空')
					return
                }
                if (this.mobile.length != 11) {
                    this.ui.showToast('手机号码格式不正确')
                    return
                }
                const data = await commonPost('/auth/login', {mobile: this.mobile, password: this.password})
				this.ui.showToast(data.message)
				if (data.code == 200) {
				    console.log(localStorage.getItem('TOKEN_KEY'))
				    setTimeout(() => {
                        this.router.replace({name: 'lz_home'})
					}, 2000)
				}
            },
        },
    }
</script>
