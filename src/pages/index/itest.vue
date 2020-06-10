<template>
	<view style="height: 100%">
		<image :src="imgSrc" style="width: 100%" :class="[false?'cu-avatar':'', false?'round': '']"></image>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
    export default {
	    async onLoad () {
            // https://mp.weixin.qq.com/
            const data = await publicGet('wx/s/spd-h3drTQB8dveGdX3D6Q') // 获取的数
			this.imgSrc = data.split('property="og:image" content="')[1].split('<meta property="og:description"')[0].split('" />')[0]
            console.log(this.imgSrc)
        },
        data() {
            return {
               imgSrc: ''
            }
        },
    }
</script>

<style>
	page {
		height: 100%;
	}
	.item {
		width: 48%;
		background: #fff;
		margin-bottom: 80 rpx;
		border-radius: 20 rpx;
	}

	.item >>> .easy-loadimage {
		width: 100%;
		/* height: 500rpx; */
		margin-bottom: 38 rpx;
	}

	.item >>> .origin-img {
		border-radius: 20 rpx;
	}

	/* mode为widthFix即图片高度自适应时要设置占位图默认高度 */
	.item >>> .loadfail-img, .item >>> .loading-img {
		height: 500 rpx;
	}
</style>
