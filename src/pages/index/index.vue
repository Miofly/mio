<template>
    <view style="height: 100%">
        <setting v-if="PageCur==='setting'"></setting>
        <user v-if="PageCur==='user'"></user>
        <index v-if="PageCur==='index'"></index>
        <module v-if="PageCur==='module'"></module>
        <plugin v-if="PageCur==='plugin'"></plugin>

        <view class="cu-bar tabbar bg-white foot">
            <view @click="NavChange" class="action" data-cur="setting">
                <view class="fa-cu-image">
                    <image :src="'/static/tabbar/setting' + [PageCur=='setting'?'_blue_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='setting'?'text-blue':'text-gray'">{{indexData[1]}}</view>
            </view>
            <view @click="NavChange" class="action" data-cur="module">
                <view class="fa-cu-image">
                    <image :src="'/static/tabbar/module' + [PageCur=='module'?'_blue_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='module'?'text-blue':'text-gray'">{{indexData[2]}}</view>
            </view>
            <view @click="NavChange" class="action text-gray add-action" data-cur="index">
                <button class="cu-btn fa-plus fa bg-blue shadow"></button>
                <view :class="PageCur=='index'?'text-blue':'text-gray'">{{indexData[0]}}</view>
            </view>
            <view @click="NavChange" class="action" data-cur="plugin">
                <view class="fa-cu-image">
                    <image :src="'/static/tabbar/plugin' + [PageCur=='plugin'?'_blue_cur':''] + '.png'"></image>
                    <view class="cu-tag badge">99</view>
                </view>
                <view :class="PageCur=='plugin'?'text-blue':'text-gray'">{{indexData[3]}}</view>
            </view>
            <view @click="NavChange" class="action" data-cur="user">
                <view class="fa-cu-image">
                    <image :src="'/static/tabbar/user' + [PageCur=='user'?'_blue_cur':''] + '.png'"></image>
                    <view class="cu-tag badge">99</view>
                </view>
                <view :class="PageCur=='user'?'text-blue':'text-gray'">{{indexData[4]}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                // #ifdef MP-WEIXIN
                PageCur: this.$store.state.indexPage,
                // #endif
                // #ifdef H5
                PageCur: 'module'
                // #endif
            }
        },
        onLoad () {
            console.log(this.$store.state.indexPage)
            console.log('onLoad：页面加载完成')

            setTimeout(() => {
                if (this.$store.state.indexPage !== '') {
                    this.PageCur = this.$store.state.indexPage
                } else {
                    this.PageCur = 'module'
                }
            }, 1000)
        },
        onUnload () {
            console.log('onUnload：页面卸载')
        },
        onShow () {
            console.log('onShow：页面显示')
        },
        onHide () {
            console.log('onHide：页面隐藏')
        },
        onReady () {
            console.log('onReady：页面初次渲染完成')
        },
        onResize () {
            console.log('onResize：页面尺寸发生变化')
        },
        onBackPress () {
            console.log('onBackPress：页面返回')
        },
        methods: {
            NavChange (e) {
                this.PageCur = e.currentTarget.dataset.cur
            }
        },
        computed: {
            ...mapState(['indexData', 'indexPage']),
        },
    }
</script>
