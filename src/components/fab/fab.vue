<template>
	<view @touchmove.stop.prevent>
		<view class="mio-fab-box" :class="{'mio-fab-right':!left || (left && right)}" :style="{left:getLeft(),right:getRight(),bottom:bottom+'rpx'}">
			<view class="mio-fab-btn" :class="{'mio-visible':isOpen,'mio-fab-hidden':hidden}">
				<view class="mio-fab-item-box" :class="{'mio-fab-item-left':left && !right && item.imgUrl}" v-for="(item,index) in btnList" :key="index" @tap.stop="handleClick(index)">
					<view :class="[left && !right?'mio-text-left':'mio-text-right']" v-if="item.imgUrl" :style="{fontSize:item.fontSize+'rpx',color:item.color}">{{item.text || ""}}</view>
					<view class="mio-fab-item" :style="{width:width+'rpx',height:height+'rpx',background:item.bgColor || bgColor,borderRadius:radius}">
						<view class="mio-fab-title" v-if="!item.imgUrl" :style="{fontSize:item.fontSize+'rpx',color:item.color}">{{item.text || ""}}</view>
						<image :src="item.imgUrl" class="mio-fab-img" v-else :style="{width:item.imgWidth+'rpx',height:item.imgHeight+'rpx'}"></image>
					</view>
				</view>
			</view>
			<view class="mio-fab-item" :class="{'mio-active':isOpen}" :style="{width:width+'rpx',height:height+'rpx',borderRadius:radius,background:bgColor,color:color}" @tap.stop="handleClick(-1)">
				<view class="mio-fab-icon mio-icon-plus"></view>
			</view>
		</view>
		<view class="mio-fab-mask" :class="{'mio-visible':isOpen}" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
	// 拓展出来的按钮不应多于6个，否则违反了作为悬浮按钮的快速、高效的原则
	export default {
		name: 'mioFab',
		props: {
			// rpx 为0时值为auto
			left: {
				type: Number,
				default: 0
			},
			// rpx 当为0时且left不为0，值为auto
			right: {
				type: Number,
				default: 80
			},
			// rpx bottom值
			bottom: {
				type: Number,
				default: 100
			},
			// 默认按钮 宽度 rpx
			width: {
				type: Number,
				default: 108
			},
			// 默认按钮 高度 rpx
			height: {
				type: Number,
				default: 108
			},
			// 圆角值
			radius: {
				type: String,
				default: '50%'
			},
			// 默认按钮背景颜色
			bgColor: {
				type: String,
				default: '#5677fc'
			},
			// 字体颜色
			color: {
				type: String,
				default: '#fff'
			},
			// 拓展按钮
			// bgColor: "#5677fc",
			// //图标/图片地址
			// imgUrl: "/static/images/fab/fab_reward.png",
			// //图片高度 rpx
			// imgHeight: 60,
			// //图片宽度 rpx
			// imgWidth: 60,
			// //名称
			// text: "名称",
			// //字体大小
			// fontSize: 30,
			// //字体颜色
			// color: "#fff"
			btnList: {
				type: Array,
				default () {
					return []
				}
			},
			// 点击遮罩 是否可关闭
			maskClosable: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				isOpen: false,
				hidden: true,
				timer: null
			}
		},
		methods: {
			getLeft () {
				let val = 'auto'
				if (this.left && !this.right) {
					val = this.left + 'rpx'
				}
				return val
			},
			getRight () {
				let val = this.right + 'rpx'
				if (this.left && !this.right) {
					val = 'auto'
				}
				return val
			},
			handleClick: function (index) {
				this.hidden = false
				clearTimeout(this.timer)
				if (index == -1 && this.btnList.length) {
					this.isOpen = !this.isOpen
				} else {
					this.$emit('click', {
						index: index
					})
					this.isOpen = false
				}
				if (!this.isOpen) {
					this.timer = setTimeout(() => {
						this.hidden = true
					}, 200)
				}
			},
			handleClickCancel: function () {
				if (!this.maskClosable) return
				this.isOpen = false
			}
		},
		beforeDestroy () {
			clearTimeout(this.timer)
			this.timer = null
		}
	}
</script>

<style>
	@font-face {
		font-family: 'miofab';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAREAA0AAAAABnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEKAAAABoAAAAciPExJUdERUYAAAQIAAAAHgAAAB4AKQAKT1MvMgAAAaAAAABCAAAAVjyBSAVjbWFwAAAB9AAAAD4AAAFCAA/pvmdhc3AAAAQAAAAACAAAAAj//wADZ2x5ZgAAAkAAAABRAAAAYFkYQQNoZWFkAAABMAAAADAAAAA2Fm5OF2hoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAAPAAAAEAwAAANsb2NhAAACNAAAAAoAAAAKADAAAG1heHAAAAGAAAAAHwAAACABDwAobmFtZQAAApQAAAFJAAACiCnmEVVwb3N0AAAD4AAAAB8AAAAx2XRuznjaY2BkYGAAYtGolt54fpuvDNwsDCBwc1krH5xm/t/I/J+5FsjlYGACiQIAGAEKZHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBhkGEA0QwMTEDMBYQMDP/BfAYAC4kBOAB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PhJ8JMzf8b2CIYW5gaAAKM4LkAN21DAEAAHjaY2GAABYIZgYAAIMAEAB42mNgYGBmgGAZBkYGELAB8hjBfBYGBSDNAoRA/jPh//8hpOQHqEoGRjYGGJOBkQlIMDGgAkaGYQ8AUSIHswAAAAAAAAAAAAAAMAAAeNpjYGRg/t/I/J+5lkGagYFRUVCPUYmNXVCRj1FETFxRUI7RyMxcUNGO0USN+fS/HEY5XTnGfznicnLijFPAHMYpYnJyjFvBlBgWBQBNJxKpAAAAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMCiTIxMbFmZiRmJ+QALXAKKAAAAAAH//wACAAEAAAAMAAAAFgAAAAIAAQADAAMAAQAEAAAAAgAAAAB42mNgYGBkAIKrS9Q5QPTNZa18MBoAPbcFzgAA) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.mio-fab-icon {
		font-family: "miofab" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10rpx;
	}

	.mio-icon-plus:before {
		content: "\e613";
	}

	.mio-fab-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: fixed;
		z-index: 99997;
	}

	.mio-fab-right {
		align-items: flex-end;
	}

	.mio-fab-btn {
		transform: scale(0);
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.mio-fab-hidden {
		height: 0;
		width: 0;
	}

	.mio-fab-item-box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 40rpx;
	}

	.mio-fab-item-left {
		flex-flow: row-reverse;
	}

	.mio-fab-title {
		width: 90%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mio-text-left {
		padding-left: 28rpx;
	}

	.mio-text-right {
		padding-right: 28rpx;
	}

	.mio-fab-img {
		display: block;
	}

	.mio-fab-item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
		transition: all 0.2s linear;
	}

	.mio-radius {
		border-radius: 50%;
	}

	.mio-active {
		transform: rotate(135deg);
	}

	.mio-fab-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.75);
		z-index: 99996;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.mio-visible {
		visibility: visible;
		opacity: 1;
		transform: scale(1);
	}
</style>
