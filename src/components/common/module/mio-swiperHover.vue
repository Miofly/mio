<template>
    <view class="content">
        <scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
            <view v-for="(item,index) in tabBars" :key="item.id" class="nav-item"
                  :style="{width: tabBars.length <5 ? 100 / tabBars.length + '%': 150 + 'rpx'}"
                  :class="{current: index === tabCurrentIndex}"
                  @tap="changeTab(index)" :id="'tab'+index" >
                {{item.name}}
            </view>
        </scroll-view>
        <swiper id="swiper" class="swiper-box" :duration="300" :current="tabCurrentIndex" @change="changeTab">
            <swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
                <slot name="content"></slot>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    let scrollTimer = false

    let windowWidth = 0

    export default {
        data () {
            return {
                tabCurrentIndex: 0, // 当前选项卡索引
                scrollLeft: 0, // 顶部选项卡左滑距离
                tabBars: [{
                    name: '关注',
                    id: '1',
                }, {
                    name: '推荐',
                    id: '2'
                }, {
                    name: '体育',
                    id: '3'
                }, {
                    name: '热点',
                    id: '4'
                }, {
                    name: '财经',
                    id: '5'
                }, {
                    name: '娱乐',
                    id: '6'
                }, {
                    name: '军事',
                    id: '7'
                }, {
                    name: '历史',
                    id: '8'
                }, {
                    name: '本地',
                    id: '9'
                }],
            }
        },
        async created () {
            windowWidth = uni.getSystemInfoSync().windowWidth // 获取屏幕宽度
        },
        methods: {
            async changeTab (e) {
                const tabItem = this.tabBars[this.tabCurrentIndex]
                tabItem.newsList = []
                if (scrollTimer) {
                    // 多次切换只执行最后一次
                    clearTimeout(scrollTimer)
                    scrollTimer = false
                }
                let index = e
                // e=number为点击切换，e=object为swiper滑动切换
                if (typeof e === 'object') {
                    index = e.detail.current
                }

                let width = 0
                let nowWidth = 0
                // 获取可滑动总宽度
                for (let i = 0; i <= index; i++) {
                    const result = await this.getElSize('tab' + i)
                    console.log(result)
                    width += result.width
                    if (i === index) {
                        nowWidth = result.width
                    }
                }
                if (typeof e === 'number') {
                    // 点击切换时先切换再滚动tabbar，避免同时切换视觉错位
                    this.tabCurrentIndex = index
                }
                // 延迟300ms,等待swiper动画结束再修改tabbar
                scrollTimer = setTimeout(() => {
                    if (width - nowWidth / 2 > windowWidth / 2) {
                        // 如果当前项越过中心点，将其放在屏幕中心
                        this.scrollLeft = width - nowWidth / 2 - windowWidth / 2
                    } else {
                        this.scrollLeft = 0
                    }
                    if (typeof e === 'object') {
                        this.tabCurrentIndex = index
                    }
                    this.tabCurrentIndex = index
                    this.$emit('parentFun', this.tabCurrentIndex) // 子组件传值到父组件（父组件接收时的方法，传递的值）

                    // 第一次切换tab，动画结束后需要加载数据  && tabItem.loaded !== true
                    // const tabItem = this.tabBars[this.tabCurrentIndex]
                    //
                    // if (this.tabCurrentIndex === 0) {
                    //     tabItem.loaded = true
                    // }
                    // if (this.tabCurrentIndex === 1) {
                    //     tabItem.loaded = true
                    // }
                }, 300)
            },
            // 获得元素的size
            getElSize (id) {
                return new Promise((res, rej) => {
                    const query = uni.createSelectorQuery().in(this)
                    const el = query.select('#' + id)
                    el.fields({
                        size: true,
                        scrollOffset: true,
                        rect: true
                    }, (data) => {
                        res(data)
                    }).exec()
                })
            },
        },
    }
</script>

<style lang='scss'>
    page, .content{
        background-color: #f8f8f8;
        height: 100%;
        overflow: hidden;
    }
    /* 顶部tabbar */
    .nav-bar {
        position: relative;
        z-index: 10;
        height: 90rpx;
        white-space: nowrap;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, .06);
        background-color: #fff;

        .nav-item {
            display: inline-block;
            width: 150rpx;
            height: 90rpx;
            text-align: center;
            line-height: 90rpx;
            font-size: 30rpx;
            color: #303133;
            position: relative;

            &:after {
                content: '';
                width: 0;
                height: 0;
                border-bottom: 4rpx solid #007aff;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                transition: .3s;
            }
        }

        .current {
            color: #007aff;

            &:after {
                width: 50%;
            }
        }
    }

    .swiper-box {
        height: 100%;
    }

    .panel-scroll-box {
        height: 100%;

        .panel-item {
            background: #fff;
            padding: 30px 0;
            border-bottom: 2px solid #000;
        }
    }

    /**
     * 新闻列表 直接拿的nvue样式修改，,
     * 一共需要修改不到10行代码, 另外px需要直接修改为upx，只有单位不一样，计算都是一样的
     * 吐槽：难道不能在编译的时候把nuve中的upx转为px? 这样就不用修改单位了
     */
    .video-wrapper {
        width: 100%;
        height: 440rpx;

        .video {
            width: 100%;
        }
    }

    .img {
        width: 100%;
        height: 100%;
    }

    .news-item {
        position: relative;
    }

    /* 修改结束 */

    /* 新闻列表  emmm 仅供参考 */
    .news-item {
        width: 750rpx;
        padding: 24rpx 30rpx;
        border-bottom-width: 1px;
        border-color: #eee;
        background-color: #fff;
    }

    .title {
        font-size: 32rpx;
        color: #303133;
        line-height: 46rpx;
    }

    .bot {
        flex-direction: row;
    }

    .author {
        font-size: 26rpx;
        color: #aaa;
    }

    .time {
        font-size: 26rpx;
        color: #aaa;
        margin-left: 20rpx;
    }

    .img-list {
        flex-shrink: 0;
        flex-direction: row;
        background-color: #fff;
        width: 220rpx;
        height: 140rpx;
    }

    .img-wrapper {
        flex: 1;
        flex-direction: row;
        height: 140rpx;
        position: relative;
        overflow: hidden;
    }

    .img {
        flex: 1;
    }

    .img-empty {
        height: 20rpx;
    }

    /* 图在左 */
    .img-list1 {
        position: absolute;
        left: 30rpx;
        top: 24rpx;
    }

    .title1 {
        padding-left: 240rpx;
    }

    .bot1 {
        padding-left: 240rpx;
        margin-top: 20rpx;
    }

    /* 图在右 */
    .img-list2 {
        position: absolute;
        right: 30rpx;
        top: 24rpx;
    }

    .title2 {
        padding-right: 210rpx;
    }

    .bot2 {
        margin-top: 20rpx;
    }

    /* 底部3图 */
    .img-list3 {
        width: 700rpx;
        margin: 16rpx 0rpx;
    }

    .img-wrapper3 {
        margin-right: 4rpx;
    }

    /* 底部大图 */
    .img-list-single {
        width: 690rpx;
        height: 240rpx;
        margin: 16rpx 0rpx;
    }

    .img-wrapper-single {
        height: 240rpx;
        margin-right: 0rpx;
    }

    .video-tip {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }

    .video-tip-icon {
        width: 60rpx;
        height: 60rpx;
    }
</style>
