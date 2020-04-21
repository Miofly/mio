<template>
    <view @touchmove.stop.prevent>
        <view class="mio-modal-box" :style="{width:width,padding:padding,borderRadius:radius}"
			  :class="[(fadein || show)?'mio-modal-normal':'mio-modal-scale',show?'mio-modal-show':'']">
            <view v-if="!custom">
                <view v-if="closeShow" class="fa fa-close"
                      style="position: absolute; top:20px;right: 20px"
                      @tap="closeCancel"></view>
                <view class="mio-modal-title" v-if="title">{{title}}</view>
                <view class="mio-modal-content" :class="[title?'':'mio-mtop']" :style="{color:color,fontSize:size+'rpx'}">{{content}}</view>
                <view class="mio-modalBtn-box" :class="[button.length!=2?'mio-flex-column':'']">
                    <block v-for="(item,index) in button" :key="index">
                        <button class="mio-modal-btn" :class="['mio-'+(item.type || 'primary')+(item.plain?'-outline':''),
                        button.length!=2?'mio-btn-width':'',button.length>2?'mio-mbtm':'',
                        shape=='circle'?'mio-circle-btn':'']"
                        :hover-class="'mio-'+(item.plain?'outline':(item.type || 'primary'))+'-hover'" :data-index="index" @tap="handleClick">{{item.text || "确定"}}</button>
                    </block>
                </view>
            </view>
            <view v-else>
                <slot></slot>
            </view>
        </view>
        <view class="mio-modal-mask" :class="[show?'mio-mask-show':'']" @tap="handleClickCancel"></view>
    </view>
</template>

<script>
    export default {
        props: {
            // 是否显示
            show: {
                type: Boolean,
                default: false
            },
            // 是否显示
            closeShow: {
                type: Boolean,
                default: true
            },
            width: {
                type: String,
                default: '84%'
            },
            padding: {
                type: String,
                default: '40rpx 64rpx'
            },
            radius: {
                type: String,
                default: '24rpx'
            },
            // 标题
            title: {
                type: String,
                default: ''
            },
            // 内容
            content: {
                type: String,
                default: ''
            },
            // 内容字体颜色
            color: {
                type: String,
                default: '#999'
            },
            // 内容字体大小 rpx
            size: {
                type: Number,
                default: 28
            },
            // 形状 circle, square
            shape: {
                type: String,
                default: 'square'
            },
            button: {
                type: Array,
                default: function () { // red
                    return [{
                        text: '取消',
                        type: 'default',
                        plain: true // 是否空心
                    }, {
                        text: '确定',
                        type: 'primary',
                        plain: false
                    }]
                }
            },
            // 点击遮罩 是否可关闭
            maskClosable: {
                type: Boolean,
                default: true
            },
            // 自定义弹窗内容
            custom: {
                type: Boolean,
                default: false
            },
            // 淡入效果，自定义弹框插入input输入框时传true
            fadein: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {

            }
        },
        methods: {
            closeCancel () {
                if (!this.maskClosable) return
                this.$emit('cancel')
            },
            handleClick (e) {
                if (!this.show) return
                const dataset = e.currentTarget.dataset
                this.$emit('click', {
                    index: Number(dataset.index)
                })
            },
            handleClickCancel () {
                if (!this.maskClosable) return
                this.$emit('cancel')
            }
        }
    }
</script>

<style>
	.mio-modal-box {
		position: fixed;
		left: 50%;
		top: 50%;
		margin: auto;
		background: #fff;
		z-index: 999;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		box-sizing: border-box;
		visibility: hidden;
	}

	.mio-modal-scale {
		transform: translate(-50%, -50%) scale(0);
	}

	.mio-modal-normal {
		transform: translate(-50%, -50%) scale(1);
	}

	.mio-modal-show {
		opacity: 1;
		visibility: visible;
	}

	.mio-modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 888;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.mio-mask-show {
		visibility: visible;
		opacity: 1;
	}

	.mio-modal-title {
		text-align: center;
		font-size: 34rpx;
		color: #333;
		padding-top: 20rpx;
		font-weight: bold;
	}

	.mio-modal-content {
		text-align: center;
		color: #999;
		font-size: 28rpx;
		padding-top: 20rpx;
		padding-bottom: 60rpx;
	}

	.mio-mtop {
		margin-top: 30rpx;
	}

	.mio-mbtm {
		margin-bottom: 30rpx;
	}

	.mio-modalBtn-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	.mio-flex-column {
		flex-direction: column;
	}

	.mio-modal-btn {
		width: 46%;
		height: 68rpx;
		line-height: 68rpx;
		position: relative;
		border-radius: 10rpx;
		font-size: 24rpx;
		overflow: visible;
		margin-left: 0;
		margin-right: 0;
	}

	.mio-modal-btn::after {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		left: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.mio-btn-width {
		width: 80% !important;
	}

	.mio-primary {
		background: #5677fc;
		color: #fff;
	}

	.mio-primary-hover {
		background: #4a67d6;
		color: #e5e5e5;
	}

	.mio-primary-outline {
		color: #5677fc;
		background: none;
	}

	.mio-primary-outline::after {
		border: 1px solid #5677fc;
	}

	.mio-danger {
		background: #ed3f14;
		color: #fff;
	}

	.mio-danger-hover {
		background: #d53912;
		color: #e5e5e5;
	}

	.mio-danger-outline {
		color: #ed3f14;
		background: none;
	}

	.mio-danger-outline::after {
		border: 1px solid #ed3f14;
	}

	.mio-red {
		background: #e41f19;
		color: #fff;
	}

	.mio-red-hover {
		background: #c51a15;
		color: #e5e5e5;
	}

	.mio-red-outline {
		color: #e41f19;
		background: none;
	}

	.mio-red-outline::after {
		border: 1px solid #e41f19;
	}

	.mio-warning {
		background: #ff7900;
		color: #fff;
	}

	.mio-warning-hover {
		background: #e56d00;
		color: #e5e5e5;
	}

	.mio-warning-outline {
		color: #ff7900;
		background: none;
	}

	.mio-warning-outline::after {
		border: 1px solid #ff7900;
	}

	.mio-green {
		background: #19be6b;
		color: #fff;
	}

	.mio-green-hover {
		background: #16ab60;
		color: #e5e5e5;
	}

	.mio-green-outline {
		color: #19be6b;
		background: none;
	}

	.mio-green-outline::after {
		border: 1px solid #19be6b;
	}

	.mio-white {
		background: #fff;
		color: #333;
	}

	.mio-white-hover {
		background: #f7f7f9;
		color: #666;
	}

	.mio-white-outline {
		color: #333;
		background: none;
	}

	.mio-white-outline::after {
		border: 1px solid #333;
	}

	.mio-gray {
		background: #ededed;
		color: #999;
	}

	.mio-gray-hover {
		background: #d5d5d5;
		color: #898989;
	}

	.mio-gray-outline {
		color: #999;
		background: none;
	}

	.mio-gray-outline::after {
		border: 1px solid #999;
	}

	.mio-outline-hover {
		opacity: 0.6;
	}

	.mio-circle-btn {
		border-radius: 40rpx !important;
	}

	.mio-circle-btn::after {
		border-radius: 80rpx !important;
	}
</style>
