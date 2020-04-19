<template>
	<view>
		<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '列表一', icon: 'video-camera'},
				{name: '列表一', icon: 'user'},
				{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
						<text class="margin-left">{{ item.name }}</text>
					</view>
				</view>

				<view v-show="false" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<mescroll-uni ref="mescrollRef" height="40%" top="0" :down="downOption"
					  :up="upOption" @init="mescrollInit"
					  @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
			<!-- 数据列表 -->
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
		</mescroll-uni>
	</view>

</template>

<script>
    import MescrollMixin from 'zj/mescroll-uni/mescroll-mixins.js'
    import {
        dbJsonData
    } from '@/api'

    export default { // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
        mixins: [MescrollMixin],
        data() {
            return {
                screenWidth: '',
                screenHeight: '',
                downOption: {
                    auto: false, // 不自动加载 (mixin已处理第一个tab触发downCallback)
                    bgColor: 'white'
                },
                upOption: {
                    auto: false, // 不自动加载
                    // page: {
                    // 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    // 	size: 10 // 每页数据的数量
                    // },
                    bgColor: 'white',
                    noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                    empty: {
                        tip: '~ 暂无数据 ~' // 提示
                        // btnText: '去看看'
                    }
                },
                dataLists: []
            }
        },
        methods: {
            mescrollInit(mescroll) {
                this.mescroll = mescroll
                this.mescrollInitByRef && this.mescrollInitByRef() // 兼容字节跳动小程序 (mescroll-mixins.js)
                // 自动加载当前tab的数据
                // if (this.i === this.index) {
                //     this.isInit = true // 标记为true
                this.mescroll.triggerDownScroll()
                // }
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
                // 联网加载数据
                // const keyword = this.tabs[this.i]
                // apiSearch(page.num, page.size, keyword).then(curPageData => {
                //     // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //     this.mescroll.endSuccess(curPageData.length)
                //     // 设置列表数据
                //     if (page.num == 1) this.goods = [] // 如果是第一页需手动制空列表
                //     this.goods = this.goods.concat(curPageData) // 追加新数据
                // }).catch(() => {
                //     // 联网失败, 结束加载
                //     this.mescroll.endErr()
                // })
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
