<template>
	<view>
		<image src="/static/images/lz/hbg.jpg" class="full-width" style="height: 18rem"></image>
		<view class="bg-white center padding-xl border-radius width-ninety padding-top-xxl">
			<view>
				<view class="fa fa-phone fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="phone" class="fa fa-close fr margin-right-lower" @tap="delVals('phone')"></view>
					<input v-model="phone" :focus="false" :password="false" placeholder="请输入手机号码" maxlength="11"
						   confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-commenting-o fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<!--<view v-show="code" class="fa fa-close fr margin-right-lower" @tap="delVals('code')"></view>-->
					<input v-model="code" :focus="false" :password="false" placeholder="请输入验证码" maxlength="8"
						   confirm-type="完成" />
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
					<view v-show="password" class="fa fa-close fr margin-right-lower" @tap="delVals('password')"></view>
					<input v-model="password" :focus="false" :password="false" placeholder="请输入6-20位密码" maxlength="11"
						   confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-ten">
				<view class="fa fa-lock fl margin-right-xl text-blue"
					  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
				<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
					<view v-show="passwords" class="fa fa-close fr margin-right-lower"
						  @tap="delVals('passwords')"></view>
					<input v-model="passwords" :focus="false" :password="false" placeholder="请再次输入密码" maxlength="8"
						   confirm-type="完成" />
				</view>
			</view>
			<view class="margin-top-xl">
				<button @tap="login" class="cu-btn full-width" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
                    ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
					保存
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
    export default {
        data() {
            return {
                phone: '',
                code: '',
                password: '',
                passwords: '',
                wx: 'SUNP8694',
                disabled: false,
                codeMess: '获取验证码'
            }
        },
        methods: {
            btnSend() {
                if (this.phone.trim() == '') {
                    this.ui.showToast('手机号不能为空')
                    return
                }
                this.disabled = true
                this.codeMess = '请稍候...'
                setTimeout(() => {
                    this.doLoop(60)
                }, 500)
            },
            delVals(val) {
                this[val] = ''
            },
            doLoop (seconds) {
                seconds = seconds || 60
                this.codeMess = seconds + 's后获取'
                const countdown = setInterval(() => {
                    if (seconds > 0) {
                        this.codeMess = seconds + 's后获取'
                        --seconds
                    } else {
                        this.codeMess = '获取验证码'
                        this.disabled = false
                        this.type = 'primary'
                        clearInterval(countdown)
                    }
                }, 1000)
            },
            copy() {
                this.tu.getClipboardData(this.wx)
            },
            login() {
                if (this.phone.trim() == '') {
                    this.ui.showToast('手机号不能为空')
                    return
                }
                if (this.code.trim() == '') {
                    this.ui.showToast('验证码不能为空')
                    return
                }
                if (this.password.trim() == '') {
                    this.ui.showToast('密码不能为空')
                    return
                }
                if (this.passwords.trim() == '') {
                    this.ui.showToast('密码不能为空')
                }
            },
        },
    }
</script>
