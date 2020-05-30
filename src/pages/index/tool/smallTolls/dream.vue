<template>
	<view>
		<image v-show="imgShow" style="margin-top: 70%;height: 45%;width: 100%" :src="src"
			   mode="scaleToFill"></image>

		<swiper v-show="swiperShow" class="card-swiper" :current="currentIndex"
				:autoplay="false" @change="cardSwiper" :circular="true" interval="10000" duration="1200"
				:indicator-dots="false" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#000000"
				style="height: 105%!important;background: rgba(241, 241, 241, 1);padding-top: 40%">

			<swiper-item :class="cardCur==index?'cur':''"
						 style="background: rgba(255,255,255,1);border: 10px solid rgba(241, 241, 241, 1);
                             border-radius: 100rpx;"
						 v-for="(item, index) in swiperList" :key="index">
				<scroll-view scroll-y class="swiper-item">
					<view class="cu-card article text-center">
						<view class="text-xl text-bold margin-bottom text-xxl">
							梦见{{item.title}}
						</view>
						<view class="cu-item shadow" style="margin: 0;background: rgba(255, 255, 255, 0.3);">
							<view class="content text-left" v-html="item.message"></view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

		<swiper v-show="singleShow" class="card-swiper" :current="currentIndexs"
				:autoplay="false" @change="cardSwipers" :circular="true" interval="10000" duration="1200"
				:indicator-dots="false" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#000000"
				style="height: 105%!important;background: rgba(241, 241, 241, 1);padding-top: 40%">

			<swiper-item v-if="searchList.length!==0" :class="cardCurs==index?'cur':''"
						 style="background: rgba(255,255,255,1);border: 10px solid rgba(241, 241, 241, 1);
                             border-radius: 100rpx;" v-for="(item, index) in searchList" :key="index">
				<scroll-view scroll-y class="swiper-item">
					<view class="cu-card article text-center">
						<view v-show="!item.isShow" class="text-xl text-bold margin-bottom text-xxl">
							梦见{{item.title}}
						</view>
						<view v-show="item.isShow" class="text-xl text-bold margin-bottom text-xxl">
							请更换关键字
						</view>
						<view v-show="item.isShow" class="cu-item shadow"
							  style="margin: 0;background: rgba(255, 255, 255, 0.3);">
							<view class="content text-center" v-html="item.message"></view>
						</view>

					</view>
				</scroll-view>
			</swiper-item>

			<text v-else>dasdasdasd</text>
		</swiper>
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                name: '夢',
                imgShow: true,
                singleShow: false,
                swiperShow: false,
                src: 'https://ws4.sinaimg.cn/large/006Xmmmgly1g5uovoeupqg30b40b4aku.gif',
                cardCur: 0,
                cardCurs: 0,
                swiperList: [],
                searchList: [],
                pageIndex: 1,
                dataLength: 0,
                currentIndex: 0,
                currentIndexs: 0,
                keyWord: ''
            }
        },
        onLoad() {
            this.getData()
            wx.showShareMenu({
                withShareTicket: true
            })
        },
        methods: {
            // 下拉刷新
            onPulldownReresh() {
                this.searchList = []
                this.currentIndex = 0
                this.currentIndexs = 0

                this.getData()
            },
            // 设置scroll-view是否允许滚动，在小程序里下拉刷新时避免列表可以滑动
            setEnableScroll(enable) {
                if (this.enableScroll !== enable) {
                    this.enableScroll = enable
                }
            },
            problemReport() {
                this.ui.yunFun('insertData',
                    {
                        dbName: 'error',
                        datas: {
                            title: '周公解梦',
                            time: new Date().toLocaleString(),
                            openId: this.$store.state.openId,
                            username: this.$store.state.username,
                            name: this.keyWord,
                        }
                    }, (res) => {
                        console.log(res.result.errMsg)
                        if (res.result.errMsg === 'collection.add:ok') {
                            ui.showToasts()
                        }
                    }
                )
            },
            backIndex() {
                this.singleShow = false
                this.swiperShow = true
                this.name = this.swiperList[this.cardCur].xing
            },
            delectVal() {
                this.keyWord = ''
            },
            doSearch() {
                if (this.keyWord !== '') {
                    this.imgShow = true
                    this.singleShow = false
                    this.swiperShow = false
                    const db = wx.cloud.database()
                    const _ = db.command
                    this.ui.yunFun('getDataPage', {
                        dbName: 'dream',
                        filter: {
                            title: db.RegExp({
                                regexp: this.keyWord,
                                options: 'i',
                            })
                        },
                        pageIndex: 1,
                        pageSize: 50
                    }, (res) => {
                        const datas = res.result.data
                        const datasLength = res.result.data.length
                        console.log(datas)
                        this.currentIndexs = 0
                        this.swiperShow = false
                        this.imgShow = false
                        this.singleShow = true
                        this.searchList = datas
                        if (this.searchList.length === 0) {
                            this.searchList = [{title: '请更新关键字', message: '此内容暂无收录', isShow: true}]
                        }
                        this.currentIndexs = 0
                        // ui.yunFun('fieldAddNum', {
                        //     dbName: 'userInfo',
                        //     filter: {openId: this.$store.state.openId},
                        //     num: -this.$store.state.dreamIntegral
                        // }, (res) => {
                        //     this.$store.state.integral = this.$store.state.integral - this.$store.state.dreamIntegral
                        //     console.log('剩余积分：', this.$store.state.integral)
                        //     console.log('用户积分更新成功，更新数量', res.result.stats.updated)
                        // }, false)
                    }, true)
                }
            },
            getData() {
                this.imgShow = true
                this.singleShow = false
                this.swiperShow = false
                this.ui.yunFun('getDataPage', {
                    dbName: 'dream',
                    pageSize: 10
                }, (res) => {
                    const datas = res.result.data
                    const datasLength = res.result.data.length
                    console.log(datas)
                    this.currentIndex = 0
                    this.swiperList = datas
                    this.currentIndex = 0
                    this.swiperShow = true
                    this.imgShow = false
                }, false)
            },
            // 滑动事件
            cardSwiper(e) {
                this.currentIndex = e.detail.current
                this.cardCur = e.detail.current
            },
            cardSwipers(e) {
                this.currentIndexs = e.detail.current
                this.cardCurs = e.detail.current
            },
        },
        computed: {
            ...mapState(['dreamIntegral', 'openId', 'integral']),
        },
    }
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
