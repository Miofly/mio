<template>
	<view class="full-width-height">
		<view class="header bg-blue full-width"
			  style="height: 180rpx;position: fixed;top: --window-top;left: 0;z-index: 9999">
			固定在头部的内容
		</view>
		<mescroll-body ref="mescrollRef" top="180" bottom="0" :down="downOption" :up="upOption"
					   @init="mescrollInit" @down="downCallback" @up="upCallback" @scroll="scroll">
			<!--数据列表-->
			<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
				<view v-for="(item, index) in dataLists" :key="index" class="cu-item">
					<view class="content padding-tb-sm">
						<view class="padding-top-bottom">
							<image :src="'https://images.weserv.nl/?url=' + item.cover"
								   style="height: 200rpx;width: 200rpx"
								   :mode="['', 'scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix'][0]"
							></image>
							<view class="padding-left-xl">
								<view>
									{{ item.title }}
								</view>
								<view class="inline">
									<button class="cu-btn fl" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										短链
									</button>
									<button class="cu-btn fr" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
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
		</mescroll-body>
	</view>
</template>

<script>
    import {
        dbJsonData
    } from '@/api'
    import MescrollBody from 'zj/mescroll-uni/mescroll-body.vue'
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'

    export default {
        components: {
            MescrollBody
        },
        mixins: [MescrollMixin],
        data() {
            return {
                downOption: { // 下拉刷新的配置参数
                    use: true, // 是否启用下拉刷新
                    auto: true, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...',
                    bgColor: 'transparent',
                    textColor: 'gray',

                },
                upOption: { // 上拉加载的常用配置
                    use: true, // 是否启用下拉刷新
                    auto: true, // 是否在初始化完毕之后自动执行一次下拉刷新的回调
                    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5条才显示无更多数据
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
                        offset: 500,
                        duration: 100,
                    },
                    empty: {
                        use: true,
						icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1444001776,3669515325&fm=15&gp=0.jpg',
                        tip: '暂无相关数据111',
                        btnText: '这是按钮文字'
                    },
                },
                dataLists: []
            }
        },
        methods: {
            scroll () {
              console.log(1)
            },
            downCallback() { // 下拉刷新的回调
                this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                // 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
            },
            async upCallback(page) { // 上拉加载的回调
                const pageNum = page.num // 页码, 默认从1开始
                const pageSize = page.size // 页长, 默认每页10条

                const data = await dbJsonData('top250', pageNum, pageSize) // 默认数据
                // 接口返回的当前页数据列表 (数组)
                const curPageData = data.subjects
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
        }
    }
</script>
