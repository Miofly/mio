<template>
	<view class="bg-white">
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view v-show="imgList" class="bg-img" @tap="ViewImage"
					  :data-url="imgList">
					<image @tap="test" :src="imgList" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="status = true">
						<text class="fa fa-close"></text>
					</view>
				</view>
				<view class="solids text-center " @tap="ChooseImage" v-if="imgList.length<4">
					<view class="fa fa-camera text-grey" style="margin-top: 43.5%"></view>
				</view>
			</view>
		</view>
		<modal title="提示" content="确认要删除图片吗？" @click="handleClick"
				:show="status" :custom="false" @cancel="status = false">
			<view class="fa fa-close" style="position: absolute; top:20px;right: 20px" @tap="status = false"></view>
		</modal>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                imgList: '',
                file: '',
				status: false,
            }
        },
        methods: {
            test () {
                uni.previewImage({
					urls: [this.imgList],
                    current: this.imgList
                })
            },
            handleClick (e) {
				if (e.index == 0) {
				    this.status = false
				} else {
					this.file = ''
					this.imgList = ''
                    this.status = false
				}
            },
            ChooseImage(data) {
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'][1], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 从相册选择
                    success: (res) => {
                        this.file = res.tempFilePaths[0] // 要用formData上传的信息
						console.log(res.tempFilePaths)
						console.log(this.file)
                        this.imgList = res.tempFilePaths[0] // 要显示的图片资源
                    }
                })
            },
        },
    }
</script>
