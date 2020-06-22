<template>
	<mescroll-uni ref="mescrollRef" top="0" :down="downOption"
				  :up="upOption" @init="mescrollInit" @scroll="scroll"
				  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表 -->
		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in dataLists" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view class="padding-top-bottom" id="test">
						<!--
							scrollTop: 0 || newscroll(e) {this.scrollTop = e.detail.scrollTop}
							>>> .spin-circle {background: url('@/static/images/common/loading1.gif') no-repeat center !important;}
							>>> .easy-loadimage{width: 100%;}  >>> .origin-img{border-radius: 20rpx;}
						-->
						<!--<imgLoad :scroll-top="scrollTop" mode="widthFix" style="width: 150rpx;height: 150rpx"-->
								 <!--:image-src="item.images[0] == undefined ? 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140403455,2984550794&fm=26&gp=0.jpg' : item.images[0]"-->
								 <!--:loading-mode="['spin-circle', 'skeleton-1', 'skeleton-2', 'looming-gray'][0]">-->
						<!--</imgLoad>-->
						<txv-video vid="i0975w0af8a" playerid="txv1"></txv-video>
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
</template>

<script>
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import MescrollMoreItemMixin from 'zj/mescroll-uni/mixins/mescroll-more-item.js'
    import {
        goodGirlData
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin, MescrollMoreItemMixin],
        props: {
            tabs: Array // tab菜单,此处用于取关键词
        },
        data() {
            return {
                downOption: { // 下拉刷新的配置参数
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                    bgColor: 'transparent',
                    textColor: 'gray',
                },
                upOption: { // 上拉加载的常用配置
                    use: true, // 是否启用下拉刷新
                    auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于5条才显示无更多数据
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...',
                    bgColor: 'transparent',
                    textColor: 'gray',
                    page: {
                        num: 0,
                        size: 10
                    },
                    toTop: {
                        src: 'http://img.htmlsucai.com/huyoucss/gotop.gif',
                        offset: 1000,
                        duration: 100,
                    },
                    empty: {
                        use: true,
                        icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1444001776,3669515325&fm=15&gp=0.jpg',
                        tip: '暂无相关数据111',
                        btnText: '这是按钮文字'
                    },
                    onScroll: true // 是否监听滚动事件
                },
                dataLists: [],
                scrollTop: 0
            }
        },
        mounted() {
            // this.mescroll.resetUpScroll()
        },
        methods: {
            scroll(e) {
                this.scrollTop = this.mescroll.scrollTop
            },
            /* 下拉刷新的回调 */
            downCallback() {
                // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
                // loadSwiper();
                // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                this.mescroll.resetUpScroll()
            },
            /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
            async upCallback(page) {
                const type = this.tabs[this.i].type
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条

                console.log('数据类型：', type, '|', '页码：', pageNum, '|', '页长：', pageSize)

                setTimeout(async () => { // 延迟500毫秒获取数据
                    const data = await goodGirlData(type, pageNum, pageSize) // 获取的数据

                    const curPageData = data.data // 返回的当前页数据列表
                    const curPageLen = curPageData.length // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)

                    if (page.num == 1) this.dataLists = [] // 如果是第一页需手动置空列表
                    this.dataLists = this.dataLists.concat(curPageData) // 追加新数据
                    this.mescroll.endDownScroll()
                    this.mescroll.endByPage(curPageLen, data.total_counts)
                    // 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
                    // const totalPage = data.xxx
                    // // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
                    // const totalSize = data.xxx
                    // // 接口返回的是否有下一页 (true/false)
                    // const hasNext = data.xxx
                    // 设置列表数据

                    // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
                    // this.mescroll.endByPage(curPageLen, 3)
                    // 方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                    // this.mescroll.endBySize(curPageLen, totalSize);
                    // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                    // this.mescroll.endSuccess(curPageLen, hasNext);
                }, 500)
            },
            // 点击空布局按钮的回调
            emptyClick() {
                uni.showToast({
                    title: '点击了按钮,具体逻辑自行实现'
                })
            }
        }
    }
</script>

