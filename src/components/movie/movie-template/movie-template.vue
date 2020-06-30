<template>
	<view style="background: rgb(30, 40, 40);">
		<scroll-view style="background: rgb(30, 40, 40);">
			<!--当月最热电影-->
			<view style="border-bottom:2px solid #2c2c36;background: rgb(30, 40, 40);" class="padding-bottom">
				<view class="cu-list grid bg-black" :class="['col-' + 3,false?'':'no-border']"
					  style="background: rgb(30, 40, 40);">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys" :key="index"
						  class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px">
								{{item.remark}}
							</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ?
							item.name.slice(0, 7) + '...' : item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="full-width text-center margin-top margin-bottom">
				<button @tap="backIndex" class="cu-btn" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					首页
				</button>
				<button @tap="beforePgae" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					上一页
				</button>
				<button class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					{{page}} / {{num}}
				</button>
				<button @tap="nextPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					下一页
				</button>
				<button @tap="lastPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;"
						:class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					尾页
				</button>
			</view>
			<movie-footer style="background: rgb(30, 40, 40);"></movie-footer>
		</scroll-view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    import {tu} from 'mioJs/toolUtils'

    const cheerio = require('cheerio')

    export default {
        props: { // String Number Boolean Array Object Function || validator (value) {}
            mvType: { //
                type: Number,
                default: 1,
                required: false
            },

        },
        data() {
            return {
                appyys: [],
                num: 1,
                page: 1,
            }
        },
        methods: {
            beforePgae: tu.throttle(function () {
                if (this.page !== 1) {
                    this.page = this.page - 1
                    this.ssData()
                }
            }, 1500),
            nextPage: tu.throttle(function () {
                if (this.page !== this.num) {
                    this.page = this.page + 1
                    this.ssData()
                }
            }, 1500),
            lastPage: tu.throttle(function () {
                if (this.page !== this.num) {
                    this.page = this.num
                    this.ssData()
                }
            }, 1500),
            backIndex: tu.throttle(function () {
                if (this.page !== 1) {
                    this.page = 1
                    this.ssData()
                }
            }, 1500),
            async ssData() {
                this.appyys = []
                // #ifdef MP-WEIXIN
                this.ui.yunFun('getUrlData', {
                    url: `http://123.0t038.cn/jin-61/wfd/515love/api/getHomeInfo.php?type=${this.mvType}&page=${this.page}`
                }, (res) => {
                    // console.log('得到的数据', res.result.body)
                    const $ = cheerio.load(data, {_useHtmlParser2: true})

                    for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                        this.appyys.push({
                            name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
                            url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
                            remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                            img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim(),
                        })
                    }
                }, true, '加载中', (err) => {
                    uni.hideLoading()
                    this.ui.showToast('网络不稳定，请求超时', 'none', 3000)
                    this.ssData()
                    console.log(err)
                })
                // #endif

                // #ifdef H5
                this.ui.showLoading()
                const data = await publicGet(`http://123.0t038.cn/jin-61/wfd/515love/api/getHomeInfo.php?type=${this.mvType}&page=${this.page}`)
                uni.hideLoading()
                const $ = cheerio.load(data, {_useHtmlParser2: true})

                for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                    this.appyys.push({
                        name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
                        url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
                        remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                        img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim(),
                    })
                }
                // #endif
            },
            mvDetail(url) {
                // #ifdef MP-WEIXIN
                this.ui.setStorage('ssUrl', url)
                // #endif
				// #ifdef H5
                localStorage.setItem('ssUrl', url)
                // #endif
                this.router.push({name: 'movieDetail'})
            },
            initMv() {
                this.ui.yunFun('getUrlData', {
                    url: `http://123.0t038.cn/jin-61/wfd/515love/api/getHomeInfo.php?type=${this.mvType}&page=1`
                }, (res) => {
                    // console.log('得到的数据', res.result.body)
                    const data = res.result.body
                    const $ = cheerio.load(data, {_useHtmlParser2: true})

                    for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                        this.appyys.push({
                            name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
                            url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
                            remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                            img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim(),
                        })
                    }
                    this.num = $('.num').html().split('/')[1]
                }, true, '加载中', (err) => {
                    uni.hideLoading()
                    this.ui.showToast('网络不稳定，请求超时', 'none', 3000)
                    this.initMv()
                    console.log(err)
                })
            },
        },
        async mounted() {
            // #ifdef MP-WEIXIN
			this.initMv()
            // #endif

            // #ifdef H5
            this.ui.showLoading()
            const data = await publicGet(`http://123.0t038.cn/jin-61/wfd/515love/api/getHomeInfo.php?type=${this.mvType}&page=1`)
            uni.hideLoading()
            const $ = cheerio.load(data, {_useHtmlParser2: true})

            for (var i = 0; i < $('.stui-vodlist li').length; i++) {
                this.appyys.push({
                    name: $('.stui-vodlist li').eq(i).children('a').attr('title').trim(),
                    url: $('.stui-vodlist li').eq(i).children('a').attr('href').trim(),
                    remark: $('.stui-vodlist li').eq(i).children().children('.pic-text').text().trim(),
                    img: $('.stui-vodlist li').eq(i).children('a').attr('data-original').trim(),
                })
            }
            this.num = $('.num').html().split('/')[1]
            // #endif
        },
    }
</script>

<style scoped>
	page {
		background: rgb(30, 40, 40);
	}
</style>
