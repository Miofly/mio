<template>
	<view class="full-width-height">
		<view class="full-width bg-red" style="height: 200rpx;position: fixed;top: --window-top;left: 0;z-index: 9999;overflow: hidden">
			<view class="bg-white flex justify-between width-fifty text-center"
				  style="border-radius: 0.3rem;border: 1px solid white;margin: 0 auto;margin-top: 5%">
				<view @tap="teamSwitch" class="padding" :class="[status? 'bg-white' : 'bg-red']"
					  style="width: 50%;border-radius: 0.3rem;border-bottom-right-radius: 0;
				;border-top-right-radius: 0">团队私有</view>
				<view @tap="personSwitch" class="padding" :class="[!status? 'bg-white' : 'bg-red']"
					  style="width: 50%;border-radius: 0.3rem;border-bottom-left-radius: 0;
				;border-top-left-radius: 0">平台公有</view>
			</view>
			<view class="text-right">
				<button class="cu-btn margin-right" :class="[['bg-white', 'line-white', 'line-white lines-white'][0],
			        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
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
									{{ item.desc }}
								</view>
								<view class="inline">
									<button class="cu-btn fl" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="tu.getClipboardData('111')">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										短链
									</button>
									<button class="cu-btn fr" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']"
											@tap="tu.jumpWX()">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										图文
									</button>
								</view>

							</view>

						</view>
					</view>

					<view v-show="false" class="action">
						<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
							操作
						</button>
					</view>
					<view v-show="false" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
				</view>
			</view>
		</mescroll-uni>

		<view @tap="test"
			  style="position: fixed;bottom: 12%;z-index: 999999999;
			  border-radius: 0.5rem;left: 35.5%"
			  class="bg-red padding text-lg">
			批量获取短链
		</view>
		<mio-modal title="标题" content="这是内容" :show="modalStatus"
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
				<!--<button class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--换一批-->
				<!--</button>-->
				<!--<button @tap="tu.jumpWX()" class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--打开微信-->
				<!--</button>-->
				<!--<button @tap="tu.getClipboardData('复制内容')" class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],-->
				        <!--['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">-->
					<!--<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>-->
					<!--复制内容-->
				<!--</button>-->
			<!--</view>-->
		</mio-modal>
	</view>
</template>

<script>
    import {
       commonPost
    } from '@/api'
    import MescrollMixin from 'cn/load/mescroll-uni/mescroll-mixins.js'
    import mioModal from 'cn/modal/modal'
    import scrollMessage from 'cn/module/scrollMessage'
    import {mapState} from 'vuex'

    export default {
        components: {
            mioModal,
            // scrollMessage
        },
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
                    auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
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
            }
        },
        async mounted() {
            console.log('mounted')
            // if (this.$store.state.indexControl) {
                this.mescroll.resetUpScroll()
            // }
            // this.$store.state.indexControl = false
        },
        methods: {
            personSwitch () {
                this.status = !this.status
                // this.upCallback(page, 1)
            },
            teamSwitch () {
                this.status = !this.status
            },
            downCallback() { // 下拉刷新的回调
                this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                // 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
            },
            async upCallback(page, common = 0) { // 上拉加载的回调
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
