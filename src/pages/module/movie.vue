<template>
    <view style="height: 100%">
        <mSearch @parentFun="loadSearchData" class="test">
            <template v-slot:content>
                <view>这是首页内容</view>
            </template>
            <template v-slot:detail>
                <scroll-view style="height: 100%" scroll-y @scrolltolower="loadMore">
                    <!--#ifdef MP-WEIXIN-->
                    <ad unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>
                    <!--#endif-->
                    <view class="cu-list menu"
                          :class="[true?'sm-border':'', false?'card-menu margin-top':'']">
                        <view class="cu-item" v-for="(keywordList, index) in keywordLists" :key="index">
                            <view class="content padding-tb-sm">
                                <view>
                                    <text class="fa fa-video-camera text-blue margin-right-sm"></text>
                                    <text>{{keywordList.name}}</text>
                                </view>
                            </view>

                            <view class="action">
                                <button @tap="detail(keywordList.url)" :class="['cu-btn', 'bg-blue', 'shadow']">
                                    播放
                                </button>
                            </view>
                            <view v-show="true" class="fa fa-angle-right fa-2x margin-left"></view>
                        </view>
                    </view>
                    <!--#ifdef MP-WEIXIN-->
                    <ad unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
                    <ad unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>
                    <!--#endif-->

                    <loadMore :status="loadStatus"></loadMore>
                </scroll-view>
            </template>
        </mSearch>
    </view>
</template>

<script>
    import mSearch from 'cn/module/mio-search'
    import loadMore from 'cn/load/loadMore'
    import {tu} from 'mioJs/toolUtils'
    import {
        dbJsonData
    } from '@/api'
    const cheerio = require('cheerio')

    export default {
        data () {
            return {
                keywordLists: [], // 搜索的列表
                keyword: '', // 输入的关键字
                pageIndex: 1, // 页码
                pageCount: 1, // 总页数
                loadStatus: 1, // 加载状态
                goOnLoadData: true,
            }
        },
        async onLoad () {
            const data = await dbJsonData()
            console.log(data)
        },
        components: {
            mSearch,
            loadMore
        },
        methods: {
            loadMore: tu.throttle(function () {
                this.loadSearchData(this.keyword)
            }, 3000),
            loadSearchData (val) {
                console.log(val)
                if (val !== this.keyword) { // 如果重新搜索，状态重置
                    this.loadStatus = 1
                    this.pageIndex = 1
                    this.keywordLists = []
                }
                if (this.loadStatus !== 2) {
                    this.ui.yunFun('httpDataGet', {
                        key: encodeURI(val),
                        id: this.pageIndex
                    }, (res) => {
                        console.log('已成功获取搜索数据')
                        if (res.result != null) { // eslint-disable-line
                            const $ = cheerio.load(res.result.body, {_useHtmlParser2: true})
                            this.resLength = $('.xing_vb4 a').length
                            const data = []
                            for (let i = 0; i < $('.xing_vb4 a').length; i++) {
                                data.push({name: $('.xing_vb4 a').eq(i).text(), url: $('.xing_vb4 a').eq(i).attr('href')})
                            }

                            if (this.pageIndex === 1) {
                                this.keywordLists = data
                            } else {
                                this.keywordLists = this.keywordLists.concat(data)
                            }

                            this.pageCount = $('.pages').text().split('当前:')[1].split('首页')[0].split('/')[1].replace(/页/g, '')

                            console.log('获取到的总页数', this.pageCount)
                            console.log('当前页码', this.pageIndex)

                            if (this.pageCount == this.pageIndex) {
                                this.loadStatus = 2
                            } else {
                                this.loadStatus = 1
                                this.pageIndex = this.pageIndex + 1
                            }
                            console.log(this.keywordLists)
                        } else {
                            console.log('搜索超时，正在重新加载')
                            this.loadSearchData(this.keyword)
                        }
                    }, false, '', (err) => {
                        console.log('加载失败，云函数的报错')
                        console.log(err)
                    })
                }
                this.keyword = val
            },
        },
    }
</script>

<style>
    page {
        height: 100%;
    }
    .test>view>view>view{
        height: 100%;
    }
</style>
