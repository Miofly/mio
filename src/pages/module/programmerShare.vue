<template>
    <view class="bg-gradual-blue padding text-center">
        <ad v-if="ggkz" unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>
        <view class="text-xxl margin-top">更多实用小程序</view>
        <ad class="margin-top" v-if="ggkz" unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        <button @tap="tzPro(item.appId)" v-for="(item, index) in listDatas" :key="index"
                class="margin-top cu-btn bg-white block round">{{item.name}}</button>
        <ad class="margin-top" v-if="ggkz" unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        methods: {
            tzPro (appid) {
                wx.navigateToMiniProgram({
                    appId: appid,
                    // path: 'pages/setting/home',
                    // envVersion: 'develop',
                    success (res) {
                        // 打开成功
                        console.log(res)
                    }
                })
                console.log('执行了吗')
            },

        },
        computed: {
            ...mapState(['ggkz', 'listDatas']),
        },
    }
</script>

<style>
</style>
