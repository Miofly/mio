<template>
    <view>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class='fa fa-dashboard text-blue'></text>深色背景
            </view>
        </view>
        <view class="grid col-3 padding-sm">
            <view class="padding-sm" v-for="(item,index) in ColorList" :key="index">
                <view class="padding radius text-center shadow-blur" :class="'bg-' + item.name">
                    <view class="text-lg">{{item.title}}</view>
                    <view class="margin-top-sm text-Abc">{{item.name}}</view>
                </view>
            </view>
        </view>

        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="fa fa-dashboard text-blue"></text>淡色背景
            </view>
        </view>
        <view class="grid col-3 bg-white padding-sm">
            <view class="padding-sm" v-for="(item,index) in ColorList" :key="index" v-if="index<12">
                <view class="padding radius text-center light" :class="'bg-' + item.name">
                    <view class="text-lg">{{item.title}}</view>
                    <view class="margin-top-sm text-Abc">{{item.name}}</view>
                </view>
            </view>
        </view>

        <view class="cu-bar bg-white solid-bottom margin-top">
            <view class="action">
                <text class="fa fa-dashboard text-blue"></text>渐变背景
            </view>
        </view>
        <view class="grid col-2 padding-sm">
            <view class="padding-sm">
                <view class="bg-gradual-red padding radius text-center shadow-blur">
                    <view class="text-lg">魅红</view>
                    <view class="margin-top-sm text-Abc">#f43f3b - #ec008c</view>
                </view>
            </view>
            <view class="padding-sm">
                <view class="bg-gradual-orange padding radius text-center shadow-blur">
                    <view class="text-lg">鎏金</view>
                    <view class="margin-top-sm text-Abc">#ff9700 - #ed1c24</view>
                </view>
            </view>
            <view class="padding-sm">
                <view class="bg-gradual-green padding radius text-center shadow-blur">
                    <view class="text-lg">翠柳</view>
                    <view class="margin-top-sm text-Abc">#39b54a - #8dc63f</view>
                </view>
            </view>
            <view class="padding-sm">
                <view class="bg-gradual-blue padding radius text-center shadow-blur">
                    <view class="text-lg">靛青</view>
                    <view class="margin-top-sm text-Abc">#0081ff - #1cbbb4</view>
                </view>
            </view>
            <view class="padding-sm">
                <view class="bg-gradual-purple padding radius text-center shadow-blur">
                    <view class="text-lg">惑紫</view>
                    <view class="margin-top-sm text-Abc">#9000ff - #5e00ff</view>
                </view>
            </view>
            <view class="padding-sm">
                <view class="bg-gradual-pink padding radius text-center shadow-blur">
                    <view class="text-lg">霞彩</view>
                    <view class="margin-top-sm text-Abc">#ec008c - #6739b6</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                ColorList: this.ColorList,
            }
        }
    }
</script>
