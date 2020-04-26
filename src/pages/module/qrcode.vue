<template xlang="wxml">
	<view class="container">
		<!-- pdground="rgba(123, 191, 234, 1) -->
		<tki-qrcode :show="true" :size="200" unit="upx" cid="qrcode1" ref="qrcode"
					val="https://ext.dcloud.net.cn/plugin?id=39" :showLoading="false"
					icon="/static/images/lz/lz_bg.png"
					:iconSize="40" :onval="false" :loadMake="true" :usingComponents="true"
					@result="qrR" />
		<button type="primary" @tap="creatQrcode">生成二维码</button>
		<button type="primary" @tap="saveQrcode">保存到图库</button>
	</view>
</template>
<script>
    import {dateUtils} from 'mioJs/dateUtils'
    export default {
        onLoad () {
            console.log(dateUtils.today({ymrSign: true}))
        },
        data() {
            return {
                ifShow: true,
                val: 'http://www.baidu.com', // 要生成的二维码值
                size: 200, // 二维码大小
                unit: 'upx', // 单位
                background: '#b4e9e2', // 背景色
                foreground: '#309286', // 前景色
                pdground: '#32dbc6', // 角标色
                icon: '', // 二维码图标
                iconsize: 40, // 二维码图标大小
                lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
                onval: false, // val值变化时自动重新生成二维码
                loadMake: true, // 组件加载完成后自动生成二维码
                src: '' // 二维码生成后的图片地址或base64
            }
        },
        methods: {

            creatQrcode() {
                this.$refs.qrcode._makeCode()
            },
            saveQrcode() {
                this.$refs.qrcode._saveCode()
            },
            qrR(res) {
                this.src = res
            },
            clearQrcode() {
                this.$refs.qrcode._clearCode()
                this.val = ''
            },
            ifQrcode() {
                this.ifShow = !this.ifShow
            },
        },
    }
</script>

<style>
	/* @import "../../../common/icon.css"; */
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.qrimg {
		display: flex;
		justify-content: center;
	}

	.qrimg-i {
		margin-right: 10px;
	}

	slider {
		width: 100%;
	}

	input {
		width: 100%;
		margin-bottom: 20 upx;
	}

	.btns {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	button {
		width: 100%;
		margin-top: 10 upx;
	}
</style>
