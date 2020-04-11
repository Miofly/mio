<template>
	<view class="bg-white">
		<view class="cu-form-group margin-top">
			<view class="title">标题</view>
			<input placeholder="请输入标题" name="input"/>
		</view>
		<view class="cu-form-group align-start" style="border-bottom: 1px solid #eee">
			<view class="title">描述</view>
			<textarea maxlength="-1" @input="textareaAInput" placeholder="请输入描述"></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/2
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" @tap="ViewImage"
					  :data-url="imgList">
					<image :src="imgList" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class="fa fa-close"></text>
					</view>
				</view>
				<view class="solids text-center" @tap="ChooseImage">
					<view class="fa fa-camera margin-top-forty text-grey" style="font-size: 1.2rem"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                imgList: '',
            }
        },
        methods: {
            textareaAInput(e) {
                this.textareaAValue = e.detail.value
            },
            delImg(e) {
                uni.showModal({
                    title: '召唤师',
                    content: '确定要删除这段回忆吗？',
                    cancelText: '再看看',
                    confirmText: '再见',
                    success: res => {
                        if (res.confirm) {
                            // this.imgList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
            ChooseImage() {
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 从相册选择
                    success: (res) => {
                        console.log(res)
                    }
                })
            }
        },
    }
</script>

<style>

</style>
