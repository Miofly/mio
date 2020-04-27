<template>
	<view class="container">
		<button @tap="resolve">解析</button>
	</view>
</template>
<script>
	import {
        publicGet,
	    publicPost
	} from '@/api'
	export default {
	    methods: {
			async resolve () {
				const data = await publicPost('http://x2.itsm.top/pub/sv/parse', {url: 'https://kphbeijing.m.chenzhongtech.com/fw/photo/3xbiitmn346pw82?fid=1272311984&cc=share_wxms&appType=21&docId=9&photoId=3xbiitmn346pw82&shareId=161809250937&shareToken=X8F6vAxEXzKM1rh_A&userId=3xfh32jhpgcxb6s&shareType=1&et=1_a%2F2000046395501986801_p0&timestamp=1587621571362'})
				var test = `http://x2.itsm.top/pub/sv/parse/video?rid=${data}&failRetry=4`
				const mess = await publicGet(test)
				console.log(mess)
			},
	    },
	}
</script>
