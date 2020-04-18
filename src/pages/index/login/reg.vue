<template>
	<view>
		<image src="/static/images/lz/hbg.jpg" class="full-width" style="height: 18rem"></image>
		<view class="bg-white center padding-xl border-radius width-ninety padding-top-xxl">
			<view>
				<view class="fa fa-phone fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.mobile" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('mobile')"></view>
					<input v-model="regInfos.mobile" :focus="false" :password="false" placeholder="请输入手机号码"
						   maxlength="11" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-commenting-o fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<!--<view v-show="regInfos.code" class="fa fa-close fr margin-right-lower" @tap="delVals('regInfos.code')"></view>-->
					<input v-model="regInfos.msgCode" :focus="false" :password="false" placeholder="请输入验证码"
						   maxlength="8"
						   confirm-type="完成"/>
					<button @tap="btnSend" :disabled="disabled" class="cu-btn fr" style="margin-top: -12%" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][1],
					        ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
						<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>
						{{codeMess}}
					</button>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-lock fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.password" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('password')"></view>
					<input v-model="regInfos.password" :focus="false" :password="true" placeholder="请输入6-20位密码"
						   maxlength="11" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-lock fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.repassword" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('repassword')"></view>
					<input v-model="regInfos.repassword" :focus="false" :password="true" placeholder="请再次输入密码"
						   maxlength="11" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-user fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.realName" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('realName')"></view>
					<input v-model="regInfos.realName" :focus="false" :password="false" placeholder="请输入真实姓名"
						   maxlength="8" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-dollar fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.ali_account" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('ali_account')"></view>
					<input v-model="regInfos.ali_account" :focus="false" :password="false" placeholder="请输入支付宝账号"
						   maxlength="11" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-hand-o-right fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="regInfos.inviteCode" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('inviteCode')"></view>
					<input v-model="regInfos.inviteCode" :focus="false" :password="false" placeholder="请输入邀请码（必填）"
						   maxlength="8" confirm-type="完成"/>
				</view>
			</view>
			<view class="margin-top-xl">
				<button @tap="login" class="cu-btn full-width" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
                    ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
					注册
				</button>
			</view>
			<view class="flex justify-end margin-top-xl">
				<router-link to="{name: 'login'}" class="text-blue">已有账号，立即登录</router-link>
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
                regInfos: {
                    mobile: '',
                    msgCode: '',
                    password: '',
                    repassword: '',
                    realName: '',
                    ali_account: '',
                    inviteCode: '',
                    type: 1001
                },
                wx: 'SUNP8694',
                disabled: false,
                codeMess: '获取验证码'
            }
        },
        methods: {
            async btnSend() {
                if (this.regInfos.mobile.trim() == '') {
                    this.ui.showToast('手机号不能为空')
                    return
                }
                const data = await commonPost('/bus/send', this.regInfos)
                console.log(data)
                this.ui.showToast(data.message)

				if (data.code == 200) {
                    this.disabled = true
                    this.codeMess = '请稍候...'
                    setTimeout(() => {
                        this.doLoop(60)
                    }, 500)
				}
            },
            doLoop(seconds) {
                seconds = seconds || 60
                this.codeMess = seconds + 's后获取'
                const countdown = setInterval(() => {
                    if (seconds > 0) {
                        this.codeMess = seconds + 's后获取'
                        --seconds
                    } else {
                        this.codeMess = '获取验证码'
                        this.disabled = false
                        clearInterval(countdown)
                    }
                }, 1000)
            },
            delVals(val) {
                this.regInfos[val] = ''
            },
            copy() {
                this.tu.getClipboardData(this.wx)
            },
            async login() {
                if (this.regInfos.mobile.trim() == '') {
                    this.ui.showToast('手机号不能为空')
                    return
                }
                if (this.regInfos.msgCode.trim() == '') {
                    this.ui.showToast('验证码不能为空')
                    return
                }
                if (this.regInfos.password.trim() == '') {
                    this.ui.showToast('密码不能为空')
                    return
                }
                if (this.regInfos.repassword.trim() == '') {
                    this.ui.showToast('密码不能为空')
                }
                if (this.regInfos.realName.trim() == '') {
                    this.ui.showToast('名称不能为空')
                    return
                }
                if (this.regInfos.ali_account.trim() == '') {
                    this.ui.showToast('支付宝账号不能为空')
                    return
                }
                if (this.regInfos.inviteCode.trim() == '') {
                    this.ui.showToast('邀请码不能为空')
                }
                const data = await commonPost('/auth/register', this.regInfos)
                this.ui.showToast(data.message)
                if (data.code == 200) { // 注册成功跳转登录页面
                    setTimeout(() => {
                        this.router.push({name: 'login'})
					}, 2000)
                }
                console.log(data)
            },
        },
    }
</script>
