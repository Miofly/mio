<!--suppress ALL -->
<template>
	<view>

		<view class="cu-card article">
			<view class="cu-item shadow padding-top-xl">
				<view class="title" style="line-height: 40rpx">
					身体质量指数 (Body Mass Index, 简称BMI), 亦称克托莱指数, 是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。BMI 值超标，意味着你必须减肥了。
				</view>
			</view>
		</view>

		<view class="padding-lg border-radius">
			<view class="cu-form-group">
				<view class="title">身高(cm)：</view>
				<input v-model="heightNum" @confirm="getResult" placeholder-class="phcolor" class="tui-input"
					   name="height" placeholder="请输入身高" maxlength="50" type="digit"/>
			</view>
			<view class="cu-form-group ">
				<view class="title">体重(kg)：</view>
				<input confirm-type="done" adjust-position="true" v-model="weightNum" @confirm="getResult"
					   placeholder-class="phcolor" class="tui-input" name="weight" placeholder="请输入体重"
					   maxlength="50" type="digit"/>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu">
			<view class="flex flex-direction padding-top" @tap="getResult">
				<!--round 圆角 line-red镂空-->
				<button class="cu-btn bg-blue  round">计算结果</button>
			</view>
		</view>

		<view class="cu-bar bg-white cu-list menu card-menu" style="min-height: 60rpx;line-height: 60rpx">
			<view class="action">
				<view class="title">{{result}} \n \n \n \n \n \n {{resultText}}</view>
				<br>
			</view>
		</view>


		<view class="cu-bar bg-white cu-list menu card-menu" style="min-height: 60rpx;line-height: 60rpx">
			<view class="action">
				<view class="title">BMI 中国标准</view>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu margin-bottom-xl">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa fa-bars text-blue margin-right-sm"></text>
						<text class="text-grey">偏瘦 &le; 18.4</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>

			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa fa-bars text-blue margin-right-sm"></text>
						<text class="text-black">正常 18.5 ~ 23.9</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa fa-bars text-blue margin-right-sm"></text>
						<text class="text-grey">过重 24.0 ~ 27.9</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa fa-bars text-blue margin-right-sm"></text>
						<text class="text-grey">肥胖 &ge; 28.0</text>
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
						<text class="text-black">分享给朋友</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right margin-left text-gray"
					  style="font-size: 1.3rem"></view>
			</button>
		</view>

	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                heightNum: 183,
                weightNum: 78.5,
                result: 0,
                resultText: '正常',
            }
        },
        components: {
            // tuiListCell
        },
        onLoad() {
            this.getResult()
            wx.showShareMenu({
                withShareTicket: true
            })
        },
        methods: {
            getResult() {
                if (this.heightNum > 0 && this.weightNum > 0) {
                    let height = this.heightNum / 100
                    this.result = Number(parseFloat(this.weightNum / (height * height)).toFixed(1))

                    if (this.result <= 16) {
                        this.resultText = '按照生物学来说这种生物是不能生存的'
                        return;
                    }
                    if (this.result >= 30 && this.result <= 40) {
                        this.resultText = '您实在太胖了！阿门！'
                        return;
                    }
                    if (this.result >= 40) {
                        this.resultText = '八戒，不要再闹了！！！'
                        return;
                    }

                    if (this.result <= 18.4) {
                        this.resultText = '您太苗条了，可以适当增重'
                    } else if (this.result >= 18.5 && this.result <= 23.9) {
                        this.resultText = '身材比例完美，保持下去'
                    } else if (this.result >= 24.0 & this.result <= 27.9) {
                        this.resultText = '您现在是偏胖，应该注意饮食！'
                    } else if (this.result >= 28.0) {
                        this.resultText = '放下手机，快去锻炼吧'
                    }
                } else {
                    this.ui.showToast('请输入正确的身高体重')
                }

            },
        },
    }
</script>

<style>
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32 rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 32 rpx;
		color: #333;
		padding-left: 20 rpx;
		flex: 1;
	}

</style>
