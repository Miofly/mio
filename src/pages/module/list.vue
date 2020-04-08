<template>
    <view class="container bg-white">

		<view class="cu-list grid" :class="['col-' + 5, true?'':'no-border']">
			<view class="cu-item" v-for="(item, index) in [
                    {icon: 'weixin', color: 'red', badge: 120, name: 'weixin'},
                    {icon: 'close', color: 'orange', badge: 1, name: '录像'},
                    {icon: 'weixin', color: 'yellow', badge: 0, name: '图像'},
                    {icon: 'weixin', color: 'olive', badge: 22, name: '通知'},
                    {icon: 'weibo', color: 'cyan', badge: 0, name: '排行榜'},
                    {icon: 'qq', color: 'blue', badge: 0, name: '皮肤'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '发现'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '帮助'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '问答'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '版权'}
                    ]" :key="index">
				<view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
        <!--九格宫列表-->
        <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
            <view class="cu-item" v-for="(item,index) in listData" :key="index">
                <view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
                    <view class="cu-tag badge" v-if="item.badge!=0">
                        <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                    </view>
                </view>
                <text>{{item.name}}</text>
            </view>
        </view>
        <!--菜单型列表-->
        <view class="bg-gradual-pink text-black padding">
            <view class="cu-list menu" :class="[true?'sm-border':'', false?'card-menu margin-top':'']">
                <view class="cu-item" v-for="(keywordList, index) in keywordLists" :key="index">
                    <view class="content padding-tb-sm">
                        <view>
                            <text class="fa fa-video-camera text-blue margin-right-sm"></text>
                            <text>{{keywordList.name}}</text>
                        </view>
                    </view>

                    <view class="action">
                        <button @tap="detail(keywordList.url)" :class="['cu-btn', 'bg-blue', 'shadow']">
                            播放
                        </button>
                    </view>
                    <view v-show="true" class="fa fa-angle-right fa-2x margin-left"></view>
                </view>
            </view>
        </view>

		<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '列表一', icon: 'video-camera'},
				{name: '列表一', icon: 'user'},
				{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue margin-right" :class="['fa-' + item.icon]"></text>
						<text>{{ item.name }}</text>
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

		<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'},
				{name: '列表一', imgSrc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view class="padding-top-bottom">
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
    </view>
</template>

<script>
    import listJson from '@/static/mockJson/listJson.json'

    export default {
        data () {
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
                    {name: 112345},
                ]
            }
        },
        async onLoad () {
            this.listData = listJson
        },
    }
</script>
