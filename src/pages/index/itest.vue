<template>
	<view style="height: 100%">
		<image :src="imgSrc" style="width: 100%" :class="[false?'cu-avatar':'', false?'round': '']"></image>
		<image :src="imgSrc1" style="width: 100%" :class="[false?'cu-avatar':'', false?'round': '']"></image>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
    export default {
	    async onLoad () {
            // https://mp.weixin.qq.com/s/qi_5anryoTv0C1m0tFzJKw
            const data = await publicGet('wx/s/qi_5anryoTv0C1m0tFzJKw') // 获取的数
			// this.imgSrc = data.split('property="og:image" content="')[1].split('<meta property="og:description"')[0].split('" />')[0].split('?')[0]

			console.log('公众号名称：', data.split('var nickname = "')[1].split('var appmsg_type = "')[0].split('";')[0])
			console.log('文章标题：', data.split('var msg_title = \'')[1].split('var msg_desc = "')[0].split('\'.html(false);')[0])
			console.log('文章描述：', data.split('var msg_desc = "')[1].split('var msg_cdn_url = "')[0].split('";')[0])
			console.log('图片1地址：', data.split('var msg_cdn_url = "')[1].split('var cdn_url_1_1  = "')[0].split('?wx_fmt=jpeg";')[0])
			console.log('图片2地址：', data.split('var cdn_url_1_1  = "')[1].split('var cdn_url_235_1 = "')[0].split('?wx_fmt=jpeg";')[0])
			console.log('公众号头像1：', data.split('var round_head_img = "')[1].split('var hd_head_img = "')[0].split('?wx_fmt=png";')[0])
			console.log('公众号头像2：', data.split('var hd_head_img = "')[1].split('var ori_head_img_url = "')[0].split('"||"";')[0])
			console.log('公众号头像3：', data.split('var ori_head_img_url = "')[1].split('var msg_title =')[0].split('";')[0])

            this.imgSrc = data.split('var msg_cdn_url = "')[1].split('var cdn_url_1_1  = "')[0].split('?wx_fmt=jpeg";')[0]
            this.imgSrc1 = data.split('var cdn_url_1_1  = "')[1].split('var cdn_url_235_1 = "')[0].split('?wx_fmt=jpeg";')[0]
        },
        data() {
            return {
               imgSrc: '',
               imgSrc1: ''
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
