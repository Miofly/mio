<template>
	<view>
		<view class="tui-notice-board">
			<view class="fa fa-bullhorn" style="color: #f54f46;background: #fff8d5;
			padding-left: 30rpx;position: relative;z-index: 10;"></view>
			<view class="tui-scorll-view margin-left" @tap="detail">
				<view class="tui-notice" :class="[true?'tui-animation':'']">
					B站10分日本动漫已消失，9.9分仅剩12部，这一部动漫包揽三席！
				</view>
			</view>
		</view>
	</view>
</template>

<style>
	.tui-notice-board {
		width: 100%;
		padding-right: 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 60rpx;
		background: #fff8d5;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999;
	}

	.tui-scorll-view {
		flex: 1;
		line-height: 1;
		white-space: nowrap;
		overflow: hidden;
		color: #f54f46;
	}

	.tui-notice {
		transform: translateX(30%);
	}

	.tui-animation {
		-webkit-animation: tui-rolling 10s linear infinite;
		animation: tui-rolling 10s linear infinite;
	}

	@-webkit-keyframes tui-rolling {
		0% {
			transform: translateX(0%);
		}

		100% {
			transform: translateX(100%);
		}
	}

	@keyframes tui-rolling {
		0% {
			transform: translateX(30%);
		}

		100% {
			transform: translateX(-100%);
		}
	}
</style>
