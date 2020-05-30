<template>
	<view>
		<!--.test>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
		<search class="test" @parentFun="questionListFn" placeholder="请输要搜索的内容" hisKeys="zipKey" :hotStatus="false"
				:ssBackIndex="true" style="height: 100%;">
			<template v-slot:content>
				<view v-if="isShows" @tap="copyStr(keyword)" class="cu-card article" style="margin-top: 13%">
					<view class="cu-item shadow" style="padding-bottom: 0">
						<view class="title text-center">
							<view class="text-cut" style="font-weight: normal;font-size: 40rpx">{{keyword}}</view>
						</view>
					</view>
				</view>

				<view v-if="isShows" class="cu-list menu sm-border card-menu margin-bottom-xl">
					<view class="cu-item arrow" @tap="copyStr(codeResult[0].code)">
						<view class="content padding-tb-sm">
							<view>
								<text class="cuIcon-group_fill text-blue margin-right-sm"></text>
								<text class="text-grey">邮政编码：{{codeResult[0].code}}</text>
							</view>
						</view>
					</view>
					<view class="cu-item arrow" @tap="copyStr(codeResult[0].phone)">
						<view class="content padding-tb-sm">
							<view>
								<text class="cuIcon-group_fill text-blue margin-right-sm"></text>
								<text class="text-grey">电话区号：{{codeResult[0].phone}}</text>
							</view>
						</view>
					</view>
					<view class="cu-item arrow" @tap="copyStr(codeResult[0].province)">
						<view class="content padding-tb-sm">
							<view>
								<text class="cuIcon-group_fill text-blue margin-right-sm"></text>
								<text class="text-grey">所属省市区：{{codeResult[0].province}}</text>
							</view>
						</view>
					</view>
					<button open-type="share" style="background: white;border: none!important;border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;border-top-left-radius: 0;
            border-top-right-radius: 0;"
							class="cu-item share arrow">
						<view class="content">
							<view>
								<text class="cuIcon-share text-blue margin-right-sm"></text>
								<text class="text-grey">分享给朋友</text>
							</view>
						</view>
					</button>
				</view>
			</template>
		</search>
	</view>
</template>

<script>
    export default {
        onLoad() {
            this.ui.yunFun('getDataPage', {
                dbName: 'init',
                filter: {
                    _id: 'zipCode',
                },
            }, (res) => {
                console.log('得到的数据', res)
                // let datas = res.result.data
                // let datasLength = res.result.data.length
                // this.filterCity = datas[0].filterCity
                // this.hotKeywordList = datas[0].hotKeywordList
            })
            // this.init()

        },
        data() {
            return {
                menuBorder: false, // 短边框
                menuArrow: false, // 是否显示箭头
                menuCard: false, // 卡片
                forbid: '',
                defaultKeyword: '',
                hotKeywordList: [],
                oldKeywordList: [],
                keyword: '',
                isShow: false,
                isShows: true,

                codeResult: [],
                filterCity: [],
                filterCitys: []
            }
        },
        methods: {
            copyStr(str) {
                ui.copyStr(str)
            },
            init() {
                this.loadOldKeyword()
                this.loadDefaultKeyword()
                // this.loadHotKeyword()
                this.getData('合肥市')
            },
        },
    }
</script>

<style>
	button::after { /*button的边框样式是通过::after方式实现的*/
		border: none;
	}
</style>
