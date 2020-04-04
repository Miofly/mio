<template>
    <view style="height: 100%">
        <swiperHover @parentFun="scrollSwitch" style="height: 100%">
            <template v-slot:content>
                <scroll-view style="height: 100%" scroll-y>

                    <view class="cu-list menu" :class="[false ? 'sm-border': '', false ? 'card-menu' : '']">
                        <navigator :url="'/pages/module/webview?url='+item.url+''" v-for="(item, index) in articleLists" :key="index">
                            <view class="cu-card article" :class="false?'no-card':''">
                                <view class="cu-item shadow">
                                    <view v-show="false" class="title">
                                        <view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗</view>
                                    </view>
                                    <view class="content margin-top">
                                        <image :src=item.imgSrc mode="aspectFill"></image>
                                        <view class="desc">
                                            <view class="text-content">
                                                {{item.content}}
                                            </view>
                                            <view>
                                                <view class="cu-tag bg-red light sm round">精品推荐</view>
                                                <view class="cu-tag bg-green light sm round">史诗</view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                    </view>
                </scroll-view>
            </template>
        </swiperHover>
    </view>
</template>

<script>
    import swiperHover from 'cn/module/mio-swiperHover'

    export default {
        data () {
            return {
                tabCurrentIndex: 0,
                articleLists: [
                    {url: 'https://mp.weixin.qq.com/s/m9WrtBQy1sErATQS1aw5kA', imgSrc: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg', content: 'photos=hop2017下载'},
                    {url: 'https://mp.weixin.qq.com/s/m9WrtBQy1sErATQS1aw5kA', imgSrc: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg', content: 'office'}
                ],
            }
        },
        methods: {
            scrollSwitch (val) { // cardChildVal就是子组件传过来的值
                console.log(val)
            },
        },
        components: {
            swiperHover
        },
    }
</script>

<style>
    swiper-item>view {
        height: 100%;
    }
</style>
