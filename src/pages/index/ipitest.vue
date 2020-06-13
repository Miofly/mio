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
		methods: {
            // https://mp.weixin.qq.com/mp/videoplayer?action=get_mp_video_play_url&preview=0&
			// __biz=MzI5ODYwMzA1MQ==&mid=2247483917&idx=1&vid=wxv_1379957014004301825&uin=&key=&
			// pass_ticket=&wxtoken=&devicetype=Windows10x64&clientversion=62090070&
			// __biz=MzI5ODYwMzA1MQ%3D%3D&appmsg_token=&x5=0&f=json
		    async test () {
		          const data = await publicGet('https://mp.weixin.qq.com/mp/videoplayer?' +
					  'action=get_mp_video_play_url&' +
					  'preview=0&' +
					  '__biz=MzI5ODYwMzA1MQ==&' +
					  'mid=2247483917&idx=1&' +
					  'vid=wxv_1379957014004301825&' +
					  'uin=&key=&pass_ticket=&' +
					  'wxtoken=&devicetype=Windows10x64&clientversion=62090070&' +
					  '__biz=MzI5ODYwMzA1MQ%3D%3D&appmsg_token=&x5=0&f=json')
		    },
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
