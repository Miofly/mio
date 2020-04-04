<template>
    <view>
        <view class="bg-white center padding-xl border-radius width-eighty">
            <view>
                <view class="fa fa-phone fl margin-right-xl text-blue" style="font-size: 50rpx;width: 1rem"></view>
                <view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)" >
                    <view class="fa fa-close fr margin-right-lower" style=""></view>
                    <input :focus="false" :password=false placeholder="请输入手机号码" maxlength="11" confirm-type="完成"/>
                </view>
            </view>
            <view class="margin-top-ten">
                <view class="fa fa-lock fl margin-right-xl text-blue" style="font-size: 50rpx;width: 1rem"></view>
                <view style="border-bottom: 1px solid rgba(0, 0, 0, 0.3)" >
                    <view class="fa fa-close fr margin-right-lower" style=""></view>
                    <input :focus="false" :password=false placeholder="请输入密码" maxlength="8" confirm-type="完成"/>
                </view>
            </view>
            <view class="margin-top-xl">
                <button class="cu-btn full-width" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
                    ['sm', 'lg', ''][2], true ? 'round' : '', true ? 'shadow' : '', true ? 'block' : '']">
                    登录
                </button>
            </view>
            <view class="flex justify-between margin-top-xl">
                <view class="text-blue">忘记密码</view>
                <view class="text-blue">注册账号</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {

    }
</script>
