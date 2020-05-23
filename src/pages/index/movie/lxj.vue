<template>
	<view>
		<scroll-view style="background: rgb(30, 40, 40);">
			<!--当月最热电影-->
			<view style="border-bottom:2px solid #2c2c36;background: rgb(30, 40, 40);" class="padding-bottom">
				<view class="cu-list grid bg-black" :class="['col-' + 3,false?'':'no-border']" style="background: rgb(30, 40, 40);">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys" :key="index" class="padding-left-right-sm">
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
				<button @tap="backIndex" class="cu-btn" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					首页
				</button>
				<button @tap="beforePgae" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					上一页
				</button>
				<button class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					{{page}} / {{num}}
				</button>
				<button @tap="nextPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					下一页
				</button>
				<button @tap="lastPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
					尾页
				</button>
			</view>
			<mvFooter></mvFooter>
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
        data () {
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
            async ssData () {
                this.appyys = []
                this.ui.showLoading()
                const data = await publicGet(`http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php?type=2&page=${this.page}`)
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
            },
            mvDetail (url) {
                localStorage.setItem('ssUrl', url)
                this.router.push({name: 'movieDetail'})
            },
        },
        async mounted() {
            this.ui.showLoading()
            const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php?type=2&page=1')
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
            console.log(this.num)
        },
    }
</script>

<style>

</style>
