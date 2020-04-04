<template>
    <view class="bg-white padding-xs">
        <view class=" padding-xs padding-top-xl">
            <button class="margin-left-xs cu-btn bg-cyan">默认</button>
            <button class="margin-left-xs cu-btn bg-cyan sm">小按钮</button>
            <button class="margin-left-xs cu-btn bg-cyan lg">大按钮</button>
            <button class="margin-left-xs cu-btn round">圆角</button>
            <button class="margin-left-xs cu-btn bg-blue shadow">阴影</button>

            <button class="cu-btn" :class="[false ? 'sm' : 'lg']">常用按钮1111</button>

            <button class="cu-btn sm">常用按钮1111</button>
            <button class="cu-btn lg">常用按钮1111</button>

            <view class="padding flex flex-direction">
                <button class="cu-btn bg-grey lg">玄灰</button>
                <button class="cu-btn bg-red margin-tb-sm lg round">嫣红</button>
            </view>

            <view class="text-center">
                <button class="cu-btn margin-left-xl line-blue">镂空按钮</button>
                <button class="cu-btn margin-left-xl line-blue lines-blue">镂空按钮颜色加深</button>
                <view class="margin-top-sm"></view>
                <button class="cu-btn margin-left-xl round line-blue">镂空按钮圆角</button>
                <button class="cu-btn margin-left-xl round line-blue lines-blue">镂空按钮圆角颜色加深</button>
                <view class="margin-top-sm"></view>
                <button class="cu-btn margin-left-xl round line-olive shadow">镂空按钮阴影</button>
                <view class="margin-top-sm"></view>

                <button class="cu-btn block line-green sm">小按钮</button>
                <view class="margin-top-sm"></view>

                <button class="cu-btn block bg-black margin-tb-sm" loading>原生加载</button>
                <button class="cu-btn block line-orange lg">
                    <text class="fa-address-book fa"></text>
                    图标
                </button>
            </view>

            <view class="flex justify-around margin-top">
                <button class="cu-btn bg-blue">常用按钮</button>
                <button class="cu-btn line-black round">常用按钮</button>
                <button class="cu-btn line-blue">常用按钮</button>
            </view>
            <br>
            <button class="cu-btn bg-blue block round">常用大按钮</button>
            <br>
            <button class="cu-btn bg-black block">常用大按钮</button>
            <br>
            <button class="cu-btn line-black block round">常用大按钮</button>
            <br>
            <button class="cu-btn line-blue block">常用大按钮</button>
        </view>
    </view>
</template>

<script>

</script>
