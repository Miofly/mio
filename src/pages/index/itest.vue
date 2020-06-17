<template>
	<view class="full-width-height">

	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
	export default {
	    async onLoad () {
	        this.ui.yunFun('getUrlData', {
	            url: 'https://kphbeijing.m.chenzhongtech.com/fw/photo/3xmndemhw99quvs?fid=1272311984&cc=share_wxms&shareMethod=CARD&docId=0&kpn=KUAISHOU&subBiz=PHOTO&photoId=3xmndemhw99quvs&shareId=192916886337&shareToken=X-8yIVD99KQjE1L1_A&shareResourceType=PHOTO_OTHER&userId=3xptw6b66vqakmm&shareType=1&et=1_i%2F0_unknown0&groupName=&appType=21&shareObjectId=30409226748&shareUrlOpened=0&timestamp=1592298200869'
	        }, (res) => {
	            console.log(res)
	            // console.log('得到的数据', res.result.body)
	            const data = res.result.body
	            // const $ = cheerio.load(data, {_useHtmlParser2: true})
	            console.log(data)
	        }, true, '加载中', (err) => {
	            uni.hideLoading()
	            this.ui.showToast('网络不稳定，请求超时', 'none', 3000)
	            this.initMv()
	            console.log(err)
	        })
	        // const data = await publicGet('')
			// console.log(data)
	    },
	}
</script>
