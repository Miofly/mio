<template>
	<view class="bg-white">
		<image src="https://tinypng.com/images/example-shrunk.png"
			   mode="widthFix" show-menu-by-longpress="false"
			   :class="[false?'cu-avatar':'', false?'round': '']"></image>

		<image class="full-width" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
			   :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]" :class="[false?'cu-avatar':'', false?'round': '']">
		</image>
	</view>
</template>

<script>

</script>
