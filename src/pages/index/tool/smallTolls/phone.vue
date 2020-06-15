<template>
	<view class="full-height">
		<!--.test>view>view>view{height: 100%;} ssBackIndex表示是否需要搜索页列表 true不需要template v-slot:detail-->
		<search class="test" @parentFun="questionListFn" :hotStatus="false"
				:ssBackIndex="true" hisKeys="phoneKey" placeholder="请输入手机号" style="height: 100%;">
			<template v-slot:content>

				<view v-if="phoneNum!==''" class="cu-card article" style="margin-top: 1%" @tap="ui.makePhone(phoneNum)">
					<view class="cu-item shadow" style="padding-bottom: 0">
						<view class="title text-center">
							<view class="text-cut" style="font-weight: normal;font-size: 40rpx">{{phoneNum}}</view>
						</view>
					</view>
				</view>

				<view v-else class="cu-card article" style="margin-top: 1%">
					<view class="cu-item shadow" style="padding-bottom: 0">
						<view class="title text-center">
							<view class="text-cut" style="font-weight: normal;font-size: 40rpx">请输入手机号码</view>
						</view>
					</view>
				</view>

				<view class="cu-list menu sm-border card-menu margin-bottom-xl">
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.mobile)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">手机号码段：
									<text class="text-black">{{phoneData.mobile}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.areacode)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">区号：
									<text class="text-black">{{phoneData.areacode}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.province)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">归属省：
									<text class="text-black">{{phoneData.province}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.city)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">归属市：
									<text class="text-black">{{phoneData.city}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.corp)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">运营商：
									<text class="text-black">{{phoneData.corp}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<view class="cu-item" @tap="tu.getClipboardData(phoneData.postcode)">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa fa-bars text-blue margin-right-sm"></text>
								<text class="text-grey">邮政编码：
									<text class="text-black">{{phoneData.postcode}}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
					<button open-type="share" style="background: white;border: none!important;border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;border-top-left-radius: 0;
            border-top-right-radius: 0;" class="cu-item share">
						<view class="content">
							<view>
								<text class="fa fa-share text-blue margin-right-sm"></text>
								<text class="text-grey">分享给朋友</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right margin-left text-gray"
							  style="font-size: 1.3rem"></view>
					</button>
				</view>
			</template>

		</search>
	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'
    export default {
        data () {
            return {
                defaultKeyword: '请输入手机号码',
                phoneNum: 13143344520,
                phoneData: [],
                photoOldKeywordList: []
            }
        },
        onLoad () {
            this.initData(this.phoneNum)
        },
        methods: {
            questionListFn(val) {
                this.initData(val)
            },
            async initData (val) {
                const INVOKE_CLOUD_FUNCTION_URL = `https://tool.lu/mobile/ajax.html?mobile=${val}&operate=query`
                const data = await publicGet(INVOKE_CLOUD_FUNCTION_URL)
                this.phoneNum = val
                if (data.status) {
                    this.phoneData = data.text
                    console.log('手机号码段', this.phoneData.mobile)
                    console.log('区号', this.phoneData.areacode)
                    console.log('归属省', this.phoneData.province)
                    console.log('归属市', this.phoneData.city)
                    console.log('邮政编码', this.phoneData.postcode)
                    console.log('运营商', this.phoneData.corp)
                } else {
                    this.ui.showToast(data.text)
                }
            },
        },
    }
</script>

<style>

</style>
