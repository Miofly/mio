<template>
    <view @touchmove.stop.prevent>
        <view class="mio-modal-box" :style="{width:width,padding:padding,borderRadius:radius}" :class="[(fadein || show)?'mio-modal-normal':'mio-modal-scale',show?'mio-modal-show':'']">
            <view v-if="!custom">
                <view v-if="closeShow" class="fa fa-close"
                      style="position: absolute; top:20px;right: 20px"
                      @tap="closeCancel"></view>
                <view class="mio-modal-title" v-if="title">{{title}}</view>
                <view class="mio-modal-content" :class="[title?'':'mio-mtop']" :style="{color:color,fontSize:size+'rpx'}">{{content}}</view>
                <view class="mio-modalBtn-box" :class="[button.length!=2?'mio-flex-column':'']">
                    <block v-for="(item,index) in button" :key="index">
                        <button class="mio-modal-btn" :class="['mio-'+(item.type || 'primary')+(item.plain?'-outline':''),button.length!=2?'mio-btn-width':'',button.length>2?'mio-mbtm':'',shape=='circle'?'mio-circle-btn':'']"
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
                default: function () {
                    return [{
                        text: '取消',
                        type: 'red',
                        plain: true // 是否空心
                    }, {
                        text: '确定',
                        type: 'red',
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

</style>
