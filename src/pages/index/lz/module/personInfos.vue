<template>
	<view>
		<view class="full-width bg-red flex justify-center align-center text-xl" style="height: 100rpx;">
			个人资料
		</view>
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in lists" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-left text-red">{{ item.name }}：</text>
					</view>
				</view>

				<view v-show="true" class="action">
					{{item.info}}
				</view>
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
                alipay_account: '',
                mobile: '',
                true_name: '',
            }
        },
		computed: {
            lists: function () {
                return [{name: '名称', icon: 'video-camera', info: this.true_name},
                    {name: '支付宝账号', icon: 'user', info: this.alipay_account},
                    {name: '手机号码', icon: 'phone', info: this.mobile}
                ]
            }
		},
        async mounted() {
            const data = await commonPost('/my/click-info')
            this.alipay_account = data.data.alipay_account
            this.mobile = data.data.mobile
            this.true_name = data.data.true_name
        }
    }
</script>

<style>

</style>
