<template>
	<view>
		<!--.test>view>view>view{height: 100%;}-->
		<search class="test" @parentFun="questionListFn" style="height: 100%;">
			<template v-slot:content>
				<view v-if="identificationNumber!==''" @tap="tu.getClipboardData(identificationNumber)"
					  class="cu-card article" style="margin-top: 1%">
					<view class="cu-item shadow" style="padding-bottom: 0">
						<view class="title text-center">
							<view class="text-cut" style="font-weight: normal;font-size: 40rpx">
								{{identificationNumber}}
							</view>
						</view>
					</view>
				</view>

				<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
					<view v-for="(item, index) in idCardLists" :key="index" class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
								<text class="margin-left">
									<text class="text-gray">{{ item.name }}</text>
									<text class="text-black">{{ item.info }}</text>
								</text>
							</view>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
				</view>

				<!--<view v-else class="cu-card article" style="margin-top: 1%">-->
					<!--<view class="cu-item shadow" style="padding-bottom: 0">-->
						<!--<view class="title text-center">-->
							<!--<view class="text-cut" style="font-weight: normal;font-size: 40rpx">请输入身份证号码</view>-->
						<!--</view>-->
					<!--</view>-->
				<!--</view>-->
				<!--<view class="cu-list menu sm-border card-menu margin-bottom-xl">-->
					<!--<view class="cu-item arrow" @tap="copyStr(regionPlace)">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">地址信息：-->
									<!--<text class="text-black"></text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<view class="cu-item arrow">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">出生年月：-->
									<!--<text class="text-black">{{birthYear}}年{{birthMonth}}月{{birthday}}日</text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<view class="cu-item arrow">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">周岁：-->
									<!--<text class="text-black">{{age}}岁</text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<view class="cu-item arrow">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">星座：-->
									<!--<text class="text-black">{{constellation}}座</text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<view class="cu-item arrow">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">性别：-->
									<!--<text class="text-black">{{sex%2 == 0 ? '女': '男'}}</text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<view class="cu-item arrow">-->
						<!--<view class="content padding-tb-sm">-->
							<!--<view>-->
								<!--<text class="fa fa-phone text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">生肖：-->
									<!--<text class="text-black">{{zodiac}}</text>-->
								<!--</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</view>-->
					<!--<button open-type="share" style="background: white;border: none!important;border-bottom-left-radius: 0;-->
            <!--border-bottom-right-radius: 0;border-top-left-radius: 0;-->
            <!--border-top-right-radius: 0;"-->
							<!--class="cu-item share arrow">-->
						<!--<view class="content">-->
							<!--<view>-->
								<!--<text class="fa fa-share text-blue margin-right-sm"></text>-->
								<!--<text class="text-grey">分享给朋友</text>-->
							<!--</view>-->
						<!--</view>-->
					<!--</button>-->
				<!--</view>-->
			</template>
			<template v-slot:detail>
				<scroll-view style="height: 85%" scroll-y="true">
					<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
						<view v-for="(item, index) in
							[{name: '列表11一', icon: 'video-camera'},
							{name: '列表一', icon: 'user'},
							{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
							<view class="content padding-tb-sm">
								<view>
									<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
									<text class="margin-left">{{ item.name }}</text>
								</view>
							</view>
							<view v-show="false" class="action">
								<button :class="['cu-btn', 'bg-blue', 'shadow']">
									操作
								</button>
							</view>
							<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
						</view>
					</view>
					<!--<loadMore :status="loadStatus = 1"></loadMore>-->
				</scroll-view>
			</template>
		</search>
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                idCardLists: [
                    {name: '地址信息', icon: 'video-camera'},
                    {name: '列表一', icon: 'user'},
                    {name: '列表一', icon: 'phone'}
                ],
                placeCode: [],
                age: 0,
                zodiac: '',
                constellation: '',
                defaultKeyword: '请输入18位身份证号码',
                identificationNumber: '340322200008088888',
                identificationData: [],
                sfzOldKeywordList: [],
                regionalCode: '340322200008088888',
                regionPlace: '',
                birthYear: '',
                birthMonth: '',
                birthday: '',
                sex: '',
                interstitialAd: null
            }
        },
		onLoad () {
		        this.questionListFn()
		},
        methods: {
            questionListFn(val) {
                // this.answerQuestion = []
                // this.loadStatus = 1
                // setTimeout(() => {
                //     this.answerQuestion = this.$store.state.questionBanks.filter(item => {
                //         return item.question.indexOf(val) !== -1
                //     })
                //     this.interstitialAd.show()
                // }, 300)
                // setTimeout(() => {
                //     this.loadStatus = 2
                // }, 400)
                this.regionalCode = this.identificationNumber.substring(0, 6)
                this.birthYear = this.identificationNumber.substring(6, 10)
                this.birthMonth = this.identificationNumber.substring(10, 12)
                this.birthday = this.identificationNumber.substring(12, 14)
                this.sex = this.identificationNumber.substring(16, 17)

				console.log(this.regionalCode)
                this.ui.yunFun('getDataPage', {
                    dbName: 'history',
                    fieldName: 'day',
                    filter: {month: 1},
                    pageIndex: 1,
                    pageSize: 100
                }, (res) => {
                    console.log('得到的数据', res.result.data)
                    let datas = res.result.data
                    let datasLength = res.result.data.length
                    // this.regionPlace = datas[0].place
                })
            },
            getData() {
                this.regionalCode = this.identificationNumber.substring(0, 6)
                this.birthYear = this.identificationNumber.substring(6, 10)
                this.birthMonth = this.identificationNumber.substring(10, 12)
                this.birthday = this.identificationNumber.substring(12, 14)
                this.sex = this.identificationNumber.substring(16, 17)

                this.ui.yunFun('getDataPage', {
                    dbName: 'placeCode', filter: {
                        code: this.regionalCode,
                    },
                }, (res) => {
                    console.log('得到的数据', res.result.data)
                    let datas = res.result.data
                    let datasLength = res.result.data.length
                    this.regionPlace = datas[0].place
                })
                this.age = commonUtil.getAge(this.birthYear + '-' + this.birthMonth + '-' + this.birthday)
                this.constellation = commonUtil.getAstro(parseInt(this.birthMonth), this.birthday)
                this.zodiac = commonUtil.getShengXiao(this.birthYear)
            },
        },
        computed: {
            ...mapState(['idCardJf', 'openId', 'integral']),
        },
    }
</script>

<style>

</style>
