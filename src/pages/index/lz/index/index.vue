<template>
	<view class="full-width-height">
		<view class="full-width bg-red" style="height: 200rpx;position: fixed;top: --window-top;left: 0;z-index: 9999;overflow: hidden">
			<view class="bg-white flex justify-between width-fifty text-center text-lg padding-left-right"
				  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;margin-top: 5%">
				<view @tap="teamSwitch" class="padding" :class="[status? 'text-red' : 'text-grey']"
					  style="width: 50%;border-radius: 0.3rem;border-bottom-right-radius: 0;
				;border-top-right-radius: 0">团队标题</view>
				<view @tap="personSwitch" class="padding" :class="[!status? 'text-red' : 'text-grey']"
					  style="width: 50%;border-radius: 0.3rem;border-bottom-left-radius: 0;
				;border-top-left-radius: 0">公有标题</view>
			</view>
			<view class="text-right" @tap="jumpPage">
				<button class="cu-btn margin-right" :class="[['bg-white', 'line-white', 'line-white lines-white'][0],
			        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
					新增
				</button>
			</view>

		</view>
		<mescroll-uni ref="mescrollRef" height="100vh" top="200" bottom="110" :down="downOption"
					  :up="upOption" @init="mescrollInit"
					  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
			<!--数据列表-->
			<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
				<view v-for="(item, index) in dataLists" :key="index" class="cu-item">
					<view class="content padding-tb-sm">
						<view class="padding-top-bottom">
							<!--<image :src="'https://images.weserv.nl/?url=' + item.cover"-->
							<image :src="item.pic"
								   style="height: 200rpx;width: 200rpx"
								   :mode="['', 'scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix'][0]"
							></image>
							<view class="padding-left-xl">
								<view>
									{{ item.title }}
								</view>
								<view class="text-df text-grey">
									{{ item.desc }}
								</view>
								<view class="flex">
									<button class="cu-btn fl full-width" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
								        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="getLink(item.id)">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										短链
									</button>
									<button class="cu-btn fr full-width" style="margin-left: 10px" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
								        ['sm', 'lg', ''][0], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="jumpWx(item.title, item.desc, item.pic, item.id)">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										图文
									</button>
								</view>

							</view>

						</view>
					</view>

					<view v-show="false" class="action">
						<button :class="['cu-btn', 'bg-red', 'shadow']" @tap="detail(item.url)">
							操作
						</button>
					</view>
					<view v-show="false" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
				</view>
			</view>
		</mescroll-uni>
		<view @tap="getShortChain" style="position: fixed;bottom: 12%;z-index: 999999999;" class="text-center margin-center full-width">
			<button class="cu-btn" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],
			        ['sm', 'lg', ''][1], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
			        <text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
				批量获取短链
			</button>
		</view>
		<modal title="标题" content="这是内容" :show="modalStatus"
				   :custom="true" @click="handleClick" @cancel="hide8">
			<!--<view class="fa fa-close" style="position: absolute; top:20px;right: 20px"-->
				  <!--@tap="modalStatus = !modalStatus"></view>-->
			<!--<view class="text-lg text-center margin-center padding-top-bottom">批量获取短链链接</view>-->
			<!--<view class="text-center border-radius padding" style="border: 1px solid rgba(0, 0, 0, 0.7)">-->
				<!--<view v-for="(url_list, index) in url_lists" :key="index">-->
					<!--<view>{{url_list.title}}</view>-->
				<!--</view>-->
			<!--</view>-->
			<!--<view class="flex justify-between margin-top">-->
				<!--<button class="cu-btn" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--换一批-->
				<!--</button>-->
				<!--<button @tap="tu.jumpWX()" class="cu-btn" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--打开微信-->
				<!--</button>-->
				<!--<button @tap="tu.getClipboardData('复制内容')" class="cu-btn" :class="[['bg-red', 'line-red', 'line-red lines-red'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--复制内容-->
				<!--</button>-->
			<!--</view>-->
		</modal>
	</view>
</template>

<script>
    import {
       commonPost
    } from '@/api'
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import NativeShare from 'nativeshare'
    import {mapState} from 'vuex'

    export default {
        mixins: [MescrollMixin],
        data() {
            return {
                status: true,
                bgSrc: '/static/images/lz_lz_bg.png',
                screenHeight: '',
                screenWidth: '',
                modalStatus: false,
                downOption: {
                    auto: false,
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...'
                },
                // 上拉加载的常用配置
                upOption: {
                    use: true, // 是否启用上拉加载; 默认true
                    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    // page: {
                    //     num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    //     size: 3 // 每页数据的数量,默认10
                    // },
                    empty: {
                        tip: '暂无相关数据'
                    },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...'
                },
                dataLists: [],
                nativeShare: new NativeShare()
            }
        },
        async mounted() {
        	this.mescroll.resetUpScroll()
        },
        methods: {
            async getShortChain () {
                // const data = await commonPost('/team/team-info')
				// console.log(data)
            },
            async getLink (id) {
				const data = await commonPost('/title/title-share', {id: id})
				console.log(data.data.substring(0, data.data.length - 1))
            },
            async jumpWx (title, desc, pic, id) {
                const data = await commonPost('/title/title-share', {id: id})
				const url = data.data
                if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
                    this.ui.showToast('图文分享请打开QQ浏览器', 2)
                } else {
                    try {
                        this.nativeShare.setShareData({
                            link: url,
                            title: title,
                            desc: desc,
                            icon: pic,
                        })
                        this.nativeShare.call('wechatFriend')
                    } catch (err) {
                        console.log(err)
                        this.ui.showToast('此浏览器不支持跳转 ', 2)
                    }
                }
            },
            jumpPage () {
                this.router.replace({name: 'addItem'})
                console.log(11)
            },
            personSwitch () {
                this.dataLists = []
                this.status = !this.status
                this.upCallback({num: 1, size: 10}, 0)
            },
            teamSwitch () {
                this.dataLists = []
                this.upCallback({num: 1, size: 10}, 1)
                this.status = !this.status
            },
            downCallback() { // 下拉刷新的回调
                this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                // 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
            },
            async upCallback(page, common = 1) { // 上拉加载的回调
                console.log(page)
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条
                const data = await commonPost('/title/title-list', {common: common, page: pageNum, per_page: pageSize})
                // 接口返回的当前页数据列表 (数组)
                const curPageData = data.data.list.data
				console.log(curPageData, '111111')
                // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
                const curPageLen = curPageData.length
                // 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
                // const totalPage = data.xxx
                // // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
                // const totalSize = data.xxx
                // // 接口返回的是否有下一页 (true/false)
                // const hasNext = data.xxx
                // 设置列表数据
                if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                // 请求成功,隐藏加载状态
                // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
                this.mescroll.endByPage(curPageLen, 3)
                // 方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                // this.mescroll.endBySize(curPageLen, totalSize);
                // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                // this.mescroll.endSuccess(curPageLen, hasNext);
            }
        },
        computed: {
            ...mapState(['indexControl']),
        },
    }
</script>
