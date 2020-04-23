<template>
	<div class="flex-box-column-center pdf">
		<p class="margin-top bg-red" ref="copyBtn"
		   @click="copy($event)"
		>复制发票地址</p>
	</div>
	<!--@touchstart="copy($event)"-->
</template>
<script>
    import Clipboard from 'clipboard'
    import {
        commonGet
    } from '@/api'

    export default {
        data() {
            return {
                pdfUrl: '213321123213', // pdf的网址
                clipboard: null, // clipboard的实例

            }
        },
        mounted() {
            this.clipboard = new Clipboard(this.$refs.copyBtn, {text: () => this.pdfUrl})
        },
        methods: {
            async copy(e, text) {
                const data = await commonGet('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa4cec9585a0c00d6&secret=4e3a25657f654f522a820189dc41138a')
                this.pdfUrl = data.expires_in
                this.clipboard.on('success', e => {
                    this.ui.showToast('复制成功')
                })
                this.clipboard.on('error', e => {
                    this.ui.showToast('213312')
                })
            }
        }
    }
</script>
<style scoped>
	.pdf {
		img {
			width: 106px;
			margin: 200px auto 30px;
		}

		.pdf-href {
			margin: 60px auto 20px;
			padding: 0 80px;
			word-break: break-all;
			text-align: center;
		}

		.pdf-btn {
			width: 294px;
			height: 80px;
			font-size: 32px;
			color: #fff;
			border-radius: 40px;
			background: #1b82d2;
			margin-top: 60px;
			box-shadow: 0.05rem 0.05rem 0.1rem #cde4f5;
			cursor: pointer;
			margin: 60px auto 40px;
		}
	}
</style>
