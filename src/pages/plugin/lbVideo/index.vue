<template>
	<view class="full-height bg-white">
		<!--当tabList没加载处理空布局-->
		<view v-if="tabLists.length == 0"></view>
		<scroll-view scroll-y style="position: fixed;top: 0;bottom: 0;" v-else>
			<view class="full-height">
				<!--固定在顶部的内容-->
				<view v-if="headerFixCon" style="position: fixed;top: 0;left: 0;" :style="{height: headerHeight}">
					11111111
				</view>
				<scroll-view scroll-x style="position: fixed;left: 0" :style="{top: headerHeight + 'rpx'}">
					<view class="flex justify-around">
						<!--<view>排行榜</view>-->
						<swiper-tab ref="swiperTab" v-model="tabClick" :tabLists="tabLists" activeColor="black"
									:tabHeight="tabHeight - 20" textSize="20px" fullWidth="100vw" defaultColor="#666"
									lineColor="linear-gradient(311deg,rgba(253,143,136,1) 0%,rgba(254,177,118,1) 100%)"
									:underLineHeight="10" activeSize="24px" underLineWidth="50%">
						</swiper-tab>
					</view>
				</scroll-view>
				<!--固定设置高度-->
				<view :style="{height: fixCon? allHeight + 'rpx' : tabHeight + headerHeight + 'rpx'}"></view>
				<!--固定内容-->
				<view v-if="fixCon" style="position: fixed;z-index: 9999;" class="full-width"
					  :style="{height: fixHeight + 'rpx', top: tabHeight + headerHeight + 'rpx'}">
					这是滚动的固定内容
				</view>
				<swiper :style="{height: fixCon ? `calc(100% - (${allHeight + 'rpx'}))` : `calc(100% - ${tabHeight + headerHeight + 'rpx'})`}"
						:current="tabClick" @change="swiperChange">
					<swiper-item v-for="(item, index) in tabLists" :key="index">
						<mescroll-item :i="index" :index="tabClick" :tabs="tabLists"></mescroll-item>
					</swiper-item>
				</swiper>
			</view>
		</scroll-view>
	</view>
</template>

<script>
    import MescrollItem from './mescroll-swiper-item-two'
	import tvp from 'mioJs/utils/tvp'

    export default {
        components: {
            MescrollItem,
        },
        data() {
            return {
                tabHeight: 100, // tab栏的高度
                fixHeight: 100, // 固定内容的高度
                fixCon: false, // 是否需要固定布局
                headerFixCon: false, // 是否需要头部固定布局
                tabLists: [
                    {name: '前端', type: 'frontend'},
                    {name: '后端', type: 'backend'},
                    {name: '安卓', type: 'Android'},
                    {name: '苹果', type: 'iOS'},
                ],
                tabClick: 0, // 当前tab的下标
				myId: 0,
            }
        },
        methods: {
            swiperChange(e) { // 轮播菜单
                this.tabClick = e.detail.current
                this.$refs.swiperTab.longClick(e.detail.current)
            },
        },
        computed: {
            allHeight: function () {
                return this.tabHeight + this.fixHeight + this.headerHeight
            },
            headerHeight: function () { // 头部固定高度
                return this.headerFixCon ? 60 : 0
            }
        },
        onLoad() {
            // #ifdef H5
            document.body.addEventListener('touchmove', function (evt) { // 禁止微信浏览器拖动
                evt.preventDefault()
            }, {passive: false})
            // #endif
        },
		onReady () {
		    console.log('onReady')
		},
		onShow () {
            console.log('this.myId', this.myId)
            this.myId = this.myId + 1

            if (this.myId > 1) {
                location.href = 'http://www.baidu.com'
            }
		},
		onHide () {
		    console.log('onHide')
		},
		onUnload () {
		    console.log('onUnload')
		},
		onResize () {
		    console.log('onResize')
		},
		beforeCreate () {
		    console.log('beforeCreate')
		},
		created () {
		    console.log('created')
		},
		beforeMount () {
		    console.log('beforeMount')
		},
		mounted () {
			console.log('mounted')
		},
		beforeUpdate () {
		    console.log('beforeUpdate')
		},
		updated () {
		    console.log('updated')
		},
		beforeDestroy () {
		    console.log('beforeDestroy')
		},
		destroyed () {
		    console.log('destroyed')
		},
    }
</script>
