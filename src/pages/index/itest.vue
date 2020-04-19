<template>
	<view class="bg-white">
		<upLoadImgSingle ref="uploadImg"></upLoadImgSingle>
		<button @tap="submit" class="cu-btn" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][2],
		        ['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
		        <text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
		    提交
		</button>
	</view>
</template>

<script>
    export default {
        methods: {
            async submit () {
                const formData = new FormData()
                formData.append('pic', this.$refs.uploadImg.file)
                const token = localStorage.getItem('TOKEN_KEY')
                uni.uploadFile({
                    url: '/title/add-team-title', // 仅为示例，非真实的接口地址
                    filePath: this.file,
                    header: {Authorization: `${token}`},
                    name: 'pic',
                    formData: {
                        title: this.title,
                        desc: this.desc
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.statusCode == 200) {
                            this.ui.showToast('上传成功')
                            this.title = ''
                            this.desc = ''
                            this.imgList = ''
                            this.file = ''
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
