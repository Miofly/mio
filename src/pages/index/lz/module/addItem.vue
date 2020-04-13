<template>
	<view class="bg-white">
		<view class="cu-form-group margin-top">
			<view class="title">标题</view>
			<input v-model="title" placeholder="请输入标题" name="input" />
		</view>
		<view class="cu-form-group align-start" style="border-bottom: 1px solid #eee">
			<view class="title">描述</view>
			<textarea v-model="desc" maxlength="-1" @input="textareaAInput" placeholder="请输入描述"></textarea>
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
				<view v-show="imgList" class="bg-img" @tap="ViewImage"
					  :data-url="imgList">
					<image :src="imgList" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg">
						<text class="fa fa-close"></text>
					</view>
				</view>

				<view class="solids text-center">
					<input type="file" @tap="ChooseImage" class="fa fa-camera margin-top-forty text-grey" style="font-size: 1.2rem" />
				</view>
			</view>
		</view>
		<button class="cu-btn" @tap="submit" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][2],
		        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
		        <text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
		    提交
		</button>
	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'
    export default {
        data() {
            return {
                title: '',
                desc: '',
                imgList: '',
				file: '',
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
                            this.imgList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
            ChooseImage(data) {
                // console.log(data)
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 从相册选择
                    success: (res) => {
                        console.log(res)
						this.file = res.tempFilePaths[0]
						console.log(JSON.stringify(this.file))
                        this.imgList = res.tempFilePaths[0]
                    }
                })
            },
            async submit () {
                const formData = new FormData()
                formData.append('title', this.title)
                formData.append('desc', this.desc)
				console.log(this.file)
                formData.append('pic', this.file)
                const token = localStorage.getItem('TOKEN_KEY')
                uni.uploadFile({
                    url: '/lz/title/add-team-title', // 仅为示例，非真实的接口地址
                    filePath: this.file,
                    header: {Authorization: `${token}`},
                    name: 'pic',
                    formData: {
                        title: this.title,
                        desc: this.desc
                    },
                    success: (res) => {
						if (res.code == 200) {
						    this.ui.showToast('上传成功')
						}
                    },
                    error: (err) => {
                        console.log(err)
					}
                })
            },
        },
    }
</script>

<style>

</style>
