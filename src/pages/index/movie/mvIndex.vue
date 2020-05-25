<template>
	<view style="height: 100%;background: rgb(30, 40, 40);color: white">
		<!--头部搜索-->
		<scroll-view style="background: rgb(30, 40, 40);">
			<!--当月最热电影-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热电影</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys.slice(0, 12)" :key="index" class="padding-left-right-sm">
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

			<!--当月最热连续剧-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-top-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热连续剧</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys.slice(12, 24)" :key="index" class="padding-left-right-sm">
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

			<!--当月最热综艺-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-top-bottom">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热综艺</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys.slice(24, 36)" :key="index" class="padding-left-right-sm">
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

			<!--当月最热动漫-->
			<view style="border-bottom:2px solid #2c2c36;" class="padding-bottom padding-top">
				<view class="flex justify-between padding-bottom-sm" style="background: rgb(30, 40, 40);">
					<view class="text-lg padding-left-sm margin-top-bottom-sm" style="color: #ccc;">当月最热动漫</view>
					<!--<view>更多</view>-->
				</view>

				<view class="cu-list grid bg-black" :class="['col-' + 3,gridBorder?'':'no-border']">
					<view @tap="mvDetail(item.url)" v-for="(item, index) in appyys.slice(36, 48)" :key="index" class="padding-left-right-sm">
						<view style="position: relative">
							<image :src="item.img" mode="scaleToFill" style="height: 330rpx;z-index: 1"
								   :class="[false?'cu-avatar':'', false?'round': '']"></image>
							<text style="position: absolute;bottom: 10rpx;right: 15rpx;font-size: 12px;z-index: 999">
								{{item.remark}}
							</text>
						</view>
						<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.name.length > 7 ?
							item.name.slice(0, 7) + '...' : item.name}}
						</view>
					</view>
				</view>
			</view>

			<movie-footer></movie-footer>

		</scroll-view>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
	import {mapState} from 'vuex'
    const cheerio = require('cheerio')


    export default {
        data() {
            return {
                gridBorder: false,
                appyys: [],
				url: '',
				timer: null
            }
        },
        methods: {
            getStorage () {
                var that = this
                uni.getStorage({
                    key: 'mvUrl',
                    success: function (res) {
                        console.log('获取成功', res.data)
                        that.url = res.data
                    },
                    fail: function (err) {
                        console.log(err)
						setTimeout(() => {
                            that.getStorage()
                        }, 500)
                    }
                })
            },
            mvDetail (url) {
                // #ifdef MP-WEIXIN
                this.ui.setStorage('ssUrl', url)
                // #endif
                // #ifdef H5
                localStorage.setItem('ssUrl', url)
                // #endif
				this.router.push({name: 'movieDetail'})
            },
        },
        async mounted() {
            localStorage.removeItem('nowNum')

            // #ifdef MP-WEIXIN
			this.getStorage()
            this.ui.yunFun('getUrlData', {
                url: 'http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php'
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
            })
            // #endif
            // #ifdef H5
            this.ui.showLoading()
            const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php')
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
		computed: {
		    ...mapState(['ssUrl']),
		},
    }
</script>

<style>
	.cu-list.grid {
		background: rgb(30, 40, 40) !important;
	}

	.cu-list.grid.no-border {
		padding: 0 !important;
	}
</style>
