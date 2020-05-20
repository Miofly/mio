<template>
	<view style="height: 100%">
		<search style="height: 100%" @parentFun="searchFn" class="test">
			<template v-slot:content>

			</template>
			<template v-slot:detail>
				<scroll-view style="height: 45%" class="padding radius" scroll-y="true" @scrolltolower="throttleTwo">
					<ad v-if="ggkzs" unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5"
						ad-theme="white"></ad>
					<view class="cu-list menu" :class="[true?'sm-border':'', false?'card-menu margin-top':'']">
						<view class="cu-item" v-for="(item, index) in appyy" :key="index">
							<view class="content padding-tb-sm">
								<view>
									<text class="fa fa-video-camera text-blue margin-right-sm"></text>
									<text>{{item.name}}</text>
								</view>
							</view>

							<view class="action">
								<button @tap="detail(item.url, 'two')" :class="['cu-btn', 'bg-blue', 'shadow']">
									播放
								</button>
							</view>
							<view v-show="true" class="fa fa-angle-right fa-2x margin-left"></view>
						</view>
						<loadMore :status="loadStatusTwo"></loadMore>
					</view>
				</scroll-view>
			</template>
		</search>
	</view>
</template>

<script>
    import {tu} from 'mioJs/toolUtils'
    import {mapState} from 'vuex'
    import loadMore from 'zj/common/load/loadMore'
    import {
        publicGet
    } from '@/api'

    const cheerio = require('cheerio')

    export default {
        async onLoad() {

        },
        data() {
            return {
                appyy: [],
                pkTv: [],
                bdTv: [],
                ppIndex: 2,
                appIndex: 1,
                bdIndex: 1,
                bgIndexTwo: 0,
                loadStatusOne: 1,
                loadStatusTwo: 1,
                keyword: '',
                total: 0,
                totalTwo: 1,
                totalThree: 1,
                ppUrl: '',

            }
        },
        methods: {
            searchFn(val) {
                console.log(val)
                this.loadStatusOne = 1
                this.loadStatusTwo = 1
                this.ppIndex = 2
                this.appIndex = 1
                this.appyy = []
                this.pkTv = []
                this.appyyDatas(val)
                this.keyword = val
            },
            throttleTwo: tu.throttle(function () {
                this.loadTwoMore()
            }, 1000),
            async loadTwoMore() {
                if (this.appIndex < this.totalTwo) {
                    this.appIndex = this.appIndex + 1

                    const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getDataInfo.php?keyword=${encodeURI(this.keyword)}&page=${this.appIndex}`)
					console.log(111)
                    const $ = cheerio.load(data, {_useHtmlParser2: true})
                    for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                        this.appyy.push({
                            name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim() + $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                            url: `https://app.movie/index.php/vod/play/id/${
                                $('.stui-vodlist li').eq(i).children('a').attr('href').split('detail/id/')[1].replace('html', '')
                                }/sid/1/nid/1.html`
                        })
                    }
                }
            },
            async appyyDatas(val) {
                const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getDataInfo.php?keyword=${encodeURI(val)}&page=${this.appIndex}`)
                const $ = cheerio.load(data, {_useHtmlParser2: true})
                this.totalTwo = $('.num').text().split('/')[1]
                console.log(this.totalTwo)
                if (this.totalTwo == 1 || this.totalTwo == '') {
                    this.loadStatusTwo = 2
                }
                for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                    this.appyy.push({
                        name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim() + $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                        url: `https://app.movie/index.php/vod/play/id/${
                            $('.stui-vodlist li').eq(i).children('a').attr('href').split('detail/id/')[1].replace('html', '')
                            }/sid/1/nid/1.html`
                    })
                }

            },
            detail(url, num) { // 查看电影详情
                if (num === 'two') {
                    console.log(url)
                    uni.navigateTo({
                        url: `/pages/movie/movieListTwo?movieUrl=${encodeURIComponent(JSON.stringify(url))}`
                    })
                }
            },
        },
        components: {
            loadMore
        },
        computed: {
            ...mapState(['ggkzs', 'masters']),
        },
    }
</script>

<style>
	page {
		height: 100%;
	}

	.test > view > view > view {
		height: 100%;
	}
</style>
