<!--suppress ALL -->
<template>
	<view>

	</view>
</template>

<script>
    import {mapState} from 'vuex'
	import {
	    publicGet
	} from '@/api'

	export default {
	    async onLoad () {
	      	const data = await publicGet('https://ip.cn/?ip=223.245.67.193')
			console.log(data)
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
