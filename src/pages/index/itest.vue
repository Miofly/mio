<template>
	<view class="full-width-height" style="overflow: hidden">
		<view class="bg-blue fixed-top full-width" style="height: 300rpx;overflow: hidden">
			11
		</view>
		<scroll-view scroll-y style="height: 100%;margin-top: 300rpx">
			<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
				<view v-for="(item, index) in
				[{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'}]" :key="index" class="cu-item">
					<view class="content padding-tb-sm">
						<view class="padding-top-bottom" >
							<image :src="item.imgSrc" style="height: 200rpx;width: 200rpx"
								   :mode="['', 'scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix'][0]"
							></image>
							<view class="padding-left-xl">
								<view>
									{{ item.name }}
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
		</scroll-view>

	</view>
</template>

<script>
    export default {
        data() {
            return {
                listData: [],
                gridCol: 4,
                gridBorder: true,

                keywordLists: [
                    {name: 1},
                    {name: 11},
                    {name: 112},
                    {name: 1123},
                    {name: 11234},
                    {name: 112345}
                ]
            }
        }
    }
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}
</style>
