<template>
	<view>
		<view class="tui-notice-board" :style="[{background:bgColor}]">
			<view class="fa fa-bullhorn" style="background: #fff8d5;
			padding-left: 30rpx;position: relative;z-index: 10;" :style="[{color:textColor}]"></view>
			<view class="tui-scorll-view margin-left" :style="[{color:textColor}]">
				<view class="tui-notice" :class="[true?'tui-animation':'']">
					{{mess}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
		props: { // String Number Boolean Array Object Function || validator (value) {}
		    mess: { //
		        type: String,
		        default: 'B站10分日本动漫已消失，9.9分仅剩12部，这一部动漫包揽三席！',
		        required: false
		    },
			textColor: { //
			    type: String,
			    default: '#f54f46',
			    required: false
			},
			bgColor: { //
			    type: String,
			    default: '#fff8d5',
			    required: false
			},

		},
    }
</script>

<style>
	.tui-notice-board {
		width: 100%;
		padding-right: 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		z-index: 999;
	}

	.tui-scorll-view {
		flex: 1;
		line-height: 1;
		white-space: nowrap;
		overflow: hidden;
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
