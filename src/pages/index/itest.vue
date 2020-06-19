<template>
	<view class="full-width-height">

	</view>
</template>

<script>
	import {
	    publicPost
	} from '@/api'
	export default {
	    // async onLoad () {
	    //     this.ui.yunFun('getUrlDataPost', {
	    //         // url: 'https://v.kuaishou.com/5mXx7I'
	    //     }, (res) => {
	    //         console.log(res)
	    //         // console.log('得到的数据', res.result.body)
	    //         const data = res.result.body
	    //         // const $ = cheerio.load(data, {_useHtmlParser2: true})
	    //         console.log(data)
	    //     }, true, '加载中', (err) => {
	    //         uni.hideLoading()
	    //         this.ui.showToast('网络不稳定，请求超时', 'none', 3000)
	    //         this.initMv()
	    //         console.log(err)
	    //     })
	    // },
		async onLoad () {

		    const data = await publicPost('ym/616gklUrlApi/urlApi.php', { url: 'https://v.kuaishou.com/5mXx7I', type: 2})

			console.log(data)
		},
	}
</script>
