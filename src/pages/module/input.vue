<template>
	<view class="">
		<view class="padding width-ninety bg-white margin-center">
			<view class="fa fa-phone fl margin-right-xl text-red"
				  style="margin-top: -0.2rem;font-size: 50rpx;width: 1rem"></view>
			<view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)">
				<view v-show="mobile" class="fa fa-close fr margin-right-sm"
					  @tap="mobile = ''"></view>
				<!--@input @focus @blur type="['text', 'number', 'digit', 'idcard'][1]
					confirm-type="['send', 'search', 'next', 'go', 'done'][0]"-->
				<input v-model="mobile" :focus="false" :password="false" placeholder="请输入手机号码"
					   maxlength="11" confirm-type="send" :adjust-position="false"/>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
            return {
                mobile: ''
            }
        },
    }
</script>
