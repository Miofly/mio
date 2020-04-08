<template>
	<view class="padding bg-white">

		<view class="cu-avatar margin-left" @tap="takePhoto"
			  :class="[false ? 'radius' : 'round', ['sm', 'lg', 'xl', ''][3], ]"
			  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);">
			<view v-show="true" class='cu-tag badge'>999</view>
		</view>

		<view class="padding">
			<view class="cu-avatar round"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
			<view class="cu-avatar radius margin-left"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
		</view>

		<view class="padding">
			<view class="cu-avatar sm round"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
			<view class="cu-avatar round margin-left"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
			<view class="cu-avatar lg round margin-left"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
			<view class="cu-avatar xl round margin-left"
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>
		<view class="padding">
			<view class="cu-avatar sm radius bg-red"> A</view>
			<view class="cu-avatar round margin-left bg-red">B</view>
			<view class="cu-avatar lg radius margin-left bg-red">
				<text>wl</text>
			</view>
			<view class="cu-avatar xl round margin-left bg-red">
				<text class="avatar-text">网络</text>
			</view>
		</view>

		<view class="padding">
			<view class="cu-avatar radius bg-blue">
				<text class="fa-angle-double-right fa"></text>
			</view>

			<view class="cu-avatar radius margin-left bg-orange">
				<text>魏</text>
			</view>
		</view>

		<view class="padding">
			<view class='cu-avatar xl radius'
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)">
				<view class='cu-tag badge'>999</view>
			</view>

			<view class='cu-avatar xl round margin-left-xl'
				  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)">
				<view class='cu-tag badge bg-green'>yy</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        methods: {
            takePhoto() {
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 'original',
                    sourceType: ['album'], // 从相册选择
                    success: function (res) {
                        console.log(res.tempFilePaths) // 图片的本地文件路径列表
                        console.log(res.tempFiles) // 图片的本地文件列表，每一项是一个 File 对象
                        console.log(JSON.stringify(res.tempFilePaths))
                    }
                })
            },
        },
    }
</script>
