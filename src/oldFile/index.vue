<template>
	<view class="">
		<view class="header bg-blue full-width"
			  style="height: 260rpx;position: fixed;top: --window-top;left: 0;z-index: 9999;overflow: hidden">
			<view>固定在头部的内容</view>
			<scrollMessage style="position: absolute;bottom: 0" ></scrollMessage>
		</view>

		<mescroll-body  ref="mescrollRef" top="260" bottom="110" :down="downOption" :up="upOption"
					   @init="mescrollInit" @down="downCallback" @up="upCallback">
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
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']" @tap="tu.getClipboardData('111')">
										<text v-show="true" class="fa fa-wechat padding-right-twenty"></text>
										短链
									</button>
									<button class="cu-btn fr" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
								        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']" @tap="tu.jumpWX()">
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

		<view @tap="modalStatus = !modalStatus" style="position: fixed;top: 55%;right: 0%;z-index: 999999999;border-top-left-radius: 0.5rem;border-bottom-left-radius: 0.5rem"
			  class="bg-blue padding-sm">
			批量获取短链
		</view>

		<mio-modal title="标题" content="这是内容" :show="modalStatus"
				:custom="true" @click="handleClick" @cancel="hide8">
			<view class="fa fa-close" style="position: absolute; top:20px;right: 20px" @tap="modalStatus = !modalStatus"></view>
			<view class="text-lg text-center margin-center padding-top-bottom">批量获取短链链接</view>
			<view class="text-center border-radius padding" style="border: 1px solid rgba(0, 0, 0, 0.7)">
				<view v-for="(url_list, index) in url_lists" :key="index">
					<view>{{url_list.title}}</view>
				</view>
			</view>
			<view class="flex justify-between margin-top">
				<button class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
				        <text v-show="false" class="fa fa-wechat padding-right-twenty"></text>
						换一批
				</button>
				<button @tap="tu.jumpWX()" class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>
					打开微信
				</button>
				<button @tap="tu.getClipboardData('复制内容')" class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
				        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
					<text v-show="false" class="fa fa-wechat padding-right-twenty"></text>
					复制内容
				</button>
			</view>
		</mio-modal>
	</view>
</template>

<script>
    import {
        dbJsonData
    } from '@/api'
    import MescrollBody from 'zj/mescroll-uni/mescroll-body.vue'
    import MescrollMixin from 'cn/load//mescroll-uni/mescroll-mixins.js'
	import mioModal from 'cn/../components/modal/modal'
	import scrollMessage from 'cn/module/scrollMessage'
    export default {
        components: {
            MescrollBody,
            mioModal,
            scrollMessage
        },
        mixins: [MescrollMixin],
        data() {
            return {
                modalStatus: false,
                downOption: {
                    textInOffset: '下拉刷新',
                    textOutOffset: '释放更新',
                    textLoading: '正在拼命的加载中 ...'
                },
                // 上拉加载的常用配置
                upOption: {
                    use: true, // 是否启用上拉加载; 默认true
                    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
                    noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
                    empty: {
                        tip: '暂无相关数据'
                    },
                    textLoading: '正在玩命的加载...',
                    textNoMore: '我也是有底线的...'
                },
                dataLists: [],
                url_lists: [
                    {
                        id: 95,
                        title: '他出尽洋相，女神对他避而远之，没想到他的真实身份...',
                        share_url: 'https://w.url.cn/s/AJSMYMC'
                    },
                    {
                        id: 89,
                        title: '大学生再次怀孕，说出真相后，家人懵了......',
                        share_url: 'https://w.url.cn/s/AbbcLhy'
                    },
                    {
                        id: 87,
                        title: '你是被他玩了，还是被他爱了？',
                        share_url: 'https://w.url.cn/s/AIjZmMz'
                    },
                    {
                        id: 77,
                        title: '姐姐每天晚上都要缠着我一起睡，我越来越控制不住......',
                        share_url: 'https://w.url.cn/s/AZzfwFe'
                    },
                    {
                        id: 103,
                        title: '啃吻你这里的男人，才是真的爱你......',
                        share_url: 'https://w.url.cn/s/A51vrxk'
                    }
                ]
            }
        },
        methods: {
            downCallback() { // 下拉刷新的回调
                this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
                // 若整个downCallback方法仅调用mescroll.resetUpScroll(),则downCallback方法可删 (mixins已默认)
            },
            async upCallback(page) { // 上拉加载的回调
                console.log(1231)
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
