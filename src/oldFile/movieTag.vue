<template>
    <view style="height: 100%">
        <mSearch @parentFun="loadSearchData" class="test">
            <template v-slot:content>
                <view class="cu-list grid" style="position: fixed;top: 8%;z-index: 1024;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);" :class="['col-' + gridCol,gridBorder?'':'no-border']">
                    <view class="cu-item item-add" style="padding: 5rpx 0 5rpx!important;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);" @tap="movieTap(item.name, index)"
                          :class="[index === bgIndex ? 'bg-blue':'']"
                          v-for="(item,index) in listData" :key="index" >
                        <text :style="{color: index === bgIndex ? 'white':''}">{{item.name}}</text>
                    </view>
                </view>
                <scroll-view scroll-top="scrollTop" style="position: fixed;top: 23%;z-index: 1024;height: 76.5%" scroll-y="true" @scrolltolower="movieLoad">
                    <ad style="transform: scale(0.85)" unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>
                    <view class="cu-list grid" :class="['col-' + movieGridCol,gridBorder?'':'no-border']">
                        <view class="cu-item" @tap="movieDetail(item.title, item.url)" v-for="(item,index) in movieData" :key="index" >
                            <image :src="item.cover ? 'https://images.weserv.nl/?url=' + item.cover : 'https://m.baidu.com/static/index/plus/plus_logo_web.png'"
                                   mode="widthFix" :class="[false?'cu-avatar':'', false?'round': '']"></image>
                            <text>{{item.title}}</text>
                            <text style="font-size: 10px">豆瓣评分:{{item.rate}}</text>
                        </view>
                    </view>
                    <ad unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
                    <ad unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>
                    <loadMore :status="loadStatusMovie"></loadMore>
                </scroll-view>
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
        <modal :show="modalStatus" @cancel="hideModal" :custom="true">
            <view>

            </view>
        </modal>
    </view>
</template>

<script>
    import modal from 'src/components/common/modal/modal'
    import mSearch from 'src/components/common/module/mio-search'
    import loadMore from 'src/components/common/load/loadMore'
    import {tu} from 'src/common/js/toolUtils'
    import {
        dbJsonData,
        movieDetail
    } from 'src/api'
    const cheerio = require('cheerio')

    export default {
        data () {
            return {
                modalStatus: false,
                scrollTop: 1110,
                keywordLists: [], // 搜索的列表
                movieName: '热门',
                listData: [{name: '热门'},
                    {name: '最新'},
                    {name: '经典'},
                    {name: '豆瓣高分'},
                    {name: '冷门佳片'},
                    {name: '华语'},
                    {name: '欧美'},
                    {name: '韩国'},
                    {name: '日本'},
                    {name: '动作'},
                    {name: '喜剧'},
                    {name: '爱情'},
                    {name: '科幻'},
                    {name: '悬疑'},
                    {name: '恐怖'}], // 搜索的列表
                gridCol: 5,
                bgIndex: 0,
                movieGridCol: 3,
                gridBorder: true,
                keyword: '', // 输入的关键字
                pageIndex: 1, // 页码
                pageCount: 1, // 总页数
                loadStatus: 1, // 加载状态
                goOnLoadData: true,
                movieData: [],

                loadStatusMovie: 1, // 加载状态
                pageMovieIndex: 1,

                actor: '',
                starring: '',
                type: '',
                lang: '',
                runtime: '',
                anotherName: '',

            }
        },
        async onLoad () {
            const data = await movieDetail('https://douban.uieee.com/v2/movie/in_theaters?start=0&count=10')
            console.log(data)
        },
        components: {
            mSearch,
            loadMore,
            modal
        },
        methods: {
            hideModal () {
                this.modalStatus = false
            },
            async movieDetail (name, url) {
                const data = await movieDetail(url)
                this.modalStatus = true
                console.log(data)
                const $ = cheerio.load(data, { _useHtmlParser2: true })
                console.log($('.sub-title').text())
                console.log($('.sub-original-title').text())
                console.log($('.subject-intro .bd p').text())
                console.log($('.sub-meta').text())
            },
            async indexData () { // 默认首页数据
                const data = await dbJsonData(this.movieName, 9)
                this.movieData = data.subjects
            },
            async movieLoad () { // 上拉加载数据
                this.test()
                const data = await dbJsonData(this.movieName, 9, this.pageMovieIndex * 9)
                this.movieData = this.movieData.concat(data.subjects)
                console.log(this.movieData)
                this.pageMovieIndex = this.pageMovieIndex + 1
            },
            async movieTap (name, index) {
                this.scrollTop = 0
                this.movieData = []
                this.loadStatusMovie = 1
                this.pageMovieIndex = 1
                this.bgIndex = index
                this.movieName = name
                const data = await dbJsonData(name, 9)
                this.movieData = data.subjects
            },
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
    .item-add:after{
        border-bottom: none!important;
    }
</style>
