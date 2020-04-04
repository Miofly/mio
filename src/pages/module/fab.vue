<template>
    <view class="bg-white ">

        <view class="flex flex-direction padding">
            <button class="margin-top cu-btn line-blue round lg" @click="change(1)">左侧悬浮</button>
            <button class="margin-top cu-btn line-blue round lg" @click="change(2)">右侧悬浮</button>
            <button class="margin-top cu-btn line-blue round lg" @click="change(3)">设置默认按钮背景颜色</button>
            <button class="margin-top cu-btn line-blue round lg" @click="change(4)">无拓展按钮</button>
            <button class="margin-top cu-btn line-blue round lg" @click="change(5)">设置拓展按钮</button>
            <button class="margin-top cu-btn line-blue round lg" @click="change(6)">拓展按钮无图标展示</button>
        </view>

        <mio-fab :left="left" :right="right" :bottom="bottom" :bgColor="bgColor" :btnList="btnList" @click="onClick"></mio-fab>
    </view>
</template>

<script>
    import {ui} from 'mioJs/uniapp'
    import {toolUtils} from 'mioJs/toolUtils'
    import mioFab from 'cn/fab/mio-fab'

    export default {
        components: {
            mioFab
        },
        data () {
            return {
                left: 0,
                right: 80,
                bottom: 100,
                bgColor: '#5677fc',
                btnList: [],
                list: [{
                    bgColor: '#16C2C2',
                    // 图标/图片地址
                    imgUrl: '/static/images/fab/fab_about.png',
                    // 图片高度 rpx
                    imgHeight: 64,
                    // 图片宽度 rpx
                    imgWidth: 64,
                    // 名称
                    text: '关于',
                    // 字体大小
                    fontSize: 34,
                    // 字体颜色
                    color: '#fff'
                }, {
                    bgColor: '#64B532',
                    // 图标/图片地址
                    imgUrl: '/static/images/fab/fab_share.png',
                    // 图片高度 rpx
                    imgHeight: 64,
                    // 图片宽度 rpx
                    imgWidth: 64,
                    // 名称
                    text: '分享',
                    // 字体大小
                    fontSize: 34,
                    // 字体颜色
                    color: '#fff'
                }, {
                    bgColor: '#FFA000',
                    // 图标/图片地址
                    imgUrl: '/static/images/fab/fab_reward.png',
                    // 图片高度 rpx
                    imgHeight: 64,
                    // 图片宽度 rpx
                    imgWidth: 64,
                    // 名称
                    text: '赞赏',
                    // 字体大小
                    fontSize: 34,
                    // 字体颜色
                    color: '#fff'
                }],
                list2: [{
                    bgColor: '#16C2C2',
                    // 名称
                    text: '关于',
                    // 字体大小
                    fontSize: 28,
                    // 字体颜色
                    color: '#fff'
                }, {
                    bgColor: '#64B532',
                    // 名称
                    text: '分享',
                    // 字体大小
                    fontSize: 28,
                    // 字体颜色
                    color: '#fff'
                }, {
                    bgColor: '#FFA000',
                    // 名称
                    text: '赞赏',
                    // 字体大小
                    fontSize: 28,
                    // 字体颜色
                    color: '#fff'
                }]
            }
        },
        onLoad () {
            this.btnList = [...this.list]
        },
        methods: {
            change (type) {
                switch (type) {
                    case 1:
                        this.left = 80
                        this.right = 0
                        break
                    case 2:
                        this.left = 0
                        this.right = 80
                        break
                    case 3:
                        this.bgColor = '#FF0000'
                        break
                    case 4:
                        this.btnList = []
                        break
                    case 5:
                        this.btnList = [...this.list]
                        break
                    case 6:
                        this.btnList = [...this.list2]
                        break
                    default:
                        break
                }
                ui.showToast('切换成功，点击查看效果')
            },
            onClick (e) {
                const index = e.index

                switch (index) {
                    case -1:
                        ui.showToast('您点击了悬浮按钮')
                        break
                    case 0:
                        ui.showToast('点击了关于')
                        break
                    case 1:
                        toolUtils.getClipboardData('复制了文字')
                        break
                    case 2:
                        ui.showToast('点击了赞赏')
                        break
                    default:
                        break
                }
            },
        }
    }
</script>
