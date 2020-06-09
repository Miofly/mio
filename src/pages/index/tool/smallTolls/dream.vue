<template>
	<view class="full-width-height">
		<!--.test>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
		<search class="test" @parentFun="questionListFn" placeholder="请输要搜索的内容" hisKeys="dreamKey"
				:hotStatus="true" :hotKeywordList="['发财', '陈奕迅', '华晨宇', '许嵩']" :ssBackIndex="true" style="height: 100%;">
			<template v-slot:content>

				<swiper :current="currentIndex" class="full-width-height"
						:autoplay="false" @change="cardSwiper" :circular="true" interval="10000" duration="1200"
						:indicator-dots="false" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#000000"
						style="height: 95%!important;background: rgba(241, 241, 241, 1);margin-bottom: 5%;">
					<swiper-item style="background: rgba(255,255,255,1);padding-bottom: 5%;border-radius: 20px;
					border: 10px solid rgba(241, 241, 241, 1);height: 100%" v-for="(item, index) in swiperList" :key="index">
						<view scroll-y style="height: 100%!important;">
							<view scroll-y class="padding" style="height: 100%!important;">
								<view class="bg-white border-radius padding full-width text-center text-xxl">
									梦见{{item.title}}
								</view>
								<scroll-view scroll-y style="height: 100%!important;padding-bottom: 15%;">
									<scroll-view scroll-y v-html="item.message" style="height: 96%!important;"></scroll-view>
								</scroll-view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</template>
		</search>
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                swiperList: [],
                currentIndex: 0,
            }
        },
        onLoad() {
            this.getData()
        },
        methods: {
            questionListFn () {
                const db = wx.cloud.database()
                const _ = db.command
                this.ui.yunFun('getDataPage', {
                    dbName: 'dream',
                    filter:{
                        title: db.RegExp({
                            regexp: this.keyWord,
                            options: 'i',
                        })
                    },
                    pageIndex: 1,
                    pageSize: 50
                }, (res) => {
                    let datas = res.result.data
                    let datasLength = res.result.data.length
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
                }, true)
            },
            getData() {
                this.ui.yunFun('getDataPage', {
                    dbName: 'dream',
                    pageSize: 10
                }, (res) => {
                    const datas = res.result.data
                    this.currentIndex = 0
                    this.swiperList = datas
                    this.currentIndex = 0
                }, false)
            },
            // 滑动事件
            cardSwiper(e) {
                this.currentIndex = e.detail.current
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
	.test>view>view>view{height: 100%;}
	swiper-item {width: 94%!important;}
</style>
