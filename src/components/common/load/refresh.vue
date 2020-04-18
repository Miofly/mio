<template>
	<!-- #ifdef H5	 -->
	<view
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100% - ' + pageTop + 'px)',
				maxHeight: 'calc(100% - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->
	<!-- #ifndef H5	 -->
	<view
		class="mix-refresh-content"
		:style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100vh - ' + pageTop + 'px)',
				maxHeight: 'calc(100vh - ' + pageTop + 'px)'
			}"
		@touchstart="pageTouchstart"
		@touchmove="pageTouchmove"
		@touchend="pageTouchend"
	>
	<!-- #endif -->

		<!-- 下拉刷新 -->
		<view class="mix-loading-wrapper">
			<image
				class="mix-loading-icon"
				:class="{active: refreshing, ready: refreshReady}"
				src="/static/images/lz/loading.gif">
			</image>
		</view>

		<slot></slot>

	</view>
</template>

<script>
	let startY; let moveY; let windowHeight = 500; let platform
	let timeDiff = 0
	let touchending
	export default {

		props: {
			top: {
				// 距离顶部距离，单位upx
				type: Number,
				default: 0
			},
		},
		data () {
			return {
				pageDeviation: 0, // 下偏移量
				pageTransition: 0, // 回弹过渡时间
				refreshReady: false, // 进入刷新准备状态
				refreshing: false, // 进入刷新状态
			}
		},
		computed: {
			pageTop () {
				return uni.upx2px(this.top)
			}
		},
		created () {
			uni.getSystemInfo({
				success: function (e) {
					console.log(e)
					platform = e.platform
					windowHeight = e.windowHeight
				}
			})
		},
		methods: {
			pageTouchstart (e) {
				touchending = false
				this.pageTransition = 0
				startY = e.touches[0].pageY
			},
			pageTouchmove (e) {
				if (touchending) {
					return
				}
				moveY = (e.touches[0].pageY - startY) * 0.4
				if (moveY >= 0) {
					this.pageDeviation = moveY

					this.$emit('setEnableScroll', false)
				}
				if (moveY >= 50 && this.refreshReady === false) {
					this.refreshReady = true
				} else if (moveY < 50 && this.refreshReady === true) {
					this.refreshReady = false
				}
				if (platform === 'ios' && e.touches[0].pageY > windowHeight + 10) {
					this.pageTouchend()
				}
			},
			pageTouchend () {
				touchending = true
				if (moveY === 0) {
					return
				}
				this.pageTransition = 0.3
				if (moveY >= 50) {
					this.startPulldownRefresh()
				} else {
					this.pageDeviation = 0
				}

				if (this.refreshReady === true) {
					this.refreshReady = false
				}
				// 修复下拉一点回弹后页面无法滚动的bug
				this.$emit('setEnableScroll', true)
				startY = moveY = 0
			},
			// 开启下拉刷新
			startPulldownRefresh () {
				if (+new Date() - timeDiff < 100) {
					return
				}
				timeDiff = +new Date()
				this.refreshing = true
				this.pageDeviation = uni.upx2px(90)
				this.$emit('refresh')
			},
			// 结束下拉刷新
			endPulldownRefresh () {
				this.refreshing = false
				this.pageDeviation = uni.upx2px(0)
				// this.$emit('setEnableScroll', true);
			},
		}
	}
</script>

<style>
	.mix-refresh-content{
		display: flex;
		flex-direction: column;
		position: relative;
	}
	/* 下拉刷新部分 */
	.mix-loading-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		transform: translateY(-100%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.mix-loading-icon{
		width: 70upx;
		height: 70upx;
		transition: .3s;
	}
	.mix-loading-icon.ready{
		transform: scaleX(1.3);
	}
	.mix-loading-icon.active{
		animation: loading .5s ease-in infinite both alternate;
	}

	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}
		100% {
			transform: translateY(4upx)  scaleX(1.3);
		}
	}

</style>
