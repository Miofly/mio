<template>
	<view style="height: 100%">
		<dy v-if="PageCur==='mv_dy'"></dy>
		<lxj v-if="PageCur==='mv_lxj'"></lxj>
		<mvIndex v-if="PageCur==='mv_index'"></mvIndex>
		<zy v-if="PageCur==='mv_zy'"></zy>
		<dm v-if="PageCur==='mv_dm'"></dm>

		<view class="cu-bar tabbar bg-white foot">
			<view @click="NavChange" class="action" data-cur="dy">
				<view class="fa-cu-image">
					<image :src="'/static/tabbar/dy' + [PageCur=='dy'?'_blue_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dy'?'text-blue':'text-gray'">电影</view>
			</view>
			<view @click="NavChange" class="action" data-cur="lxj">
				<view class="fa-cu-image">
					<image :src="'/static/tabbar/lxj' + [PageCur=='lxj'?'_blue_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='lxj'?'text-blue':'text-gray'">连续剧</view>
			</view>
			<view @click="NavChange" class="action text-gray add-action" data-cur="index">
				<button class="cu-btn fa-plus fa bg-blue shadow"></button>
				<view :class="PageCur=='index'?'text-blue':'text-gray'">首页</view>
			</view>
			<view @click="NavChange" class="action" data-cur="zy">
				<view class="fa-cu-image">
					<image :src="'/static/tabbar/zy' + [PageCur=='zy'?'_blue_cur':''] + '.png'"></image>
					<view class="cu-tag badge">99</view>
				</view>
				<view :class="PageCur=='zy'?'text-blue':'text-gray'">综艺</view>
			</view>
			<view @click="NavChange" class="action" data-cur="dm">
				<view class="fa-cu-image">
					<image :src="'/static/tabbar/dm' + [PageCur=='dm'?'_blue_cur':''] + '.png'"></image>
					<view class="cu-tag badge">99</view>
				</view>
				<view :class="PageCur=='dm'?'text-blue':'text-gray'">动漫</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                // #ifdef MP-WEIXIN
                PageCur: this.$store.state.indexPage,
                // #endif
                // #ifdef H5
                PageCur: 'index'
                // #endif
            }
        },
        onLoad() {
            console.log(this.$store.state.indexPage)
            console.log('onLoad：页面加载完成')

            setTimeout(() => {
                if (this.$store.state.indexPage !== '') {
                    this.PageCur = this.$store.state.indexPage
                } else {
                    this.PageCur = 'index'
                }
            }, 1000)
        },
        onUnload() {
            console.log('onUnload：页面卸载')
        },
        onShow() {
            console.log('onShow：页面显示')
        },
        onHide() {
            console.log('onHide：页面隐藏')
        },
        onReady() {
            console.log('onReady：页面初次渲染完成')
        },
        onResize() {
            console.log('onResize：页面尺寸发生变化')
        },
        onBackPress() {
            console.log('onBackPress：页面返回')
        },
        methods: {
            NavChange(e) {
                this.PageCur = e.currentTarget.dataset.cur
            }
        },
        computed: {
            ...mapState(['indexData', 'indexPage']),
        },
    }
</script>
