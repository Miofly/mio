<template>
	<view class="bg-white">
		<image :src="customer_wechat" mode="scaleToFill" :class="[false?'cu-avatar':'', false?'round': '']"></image>
	</view>
</template>

<script>
	import {
	    commonPost
	} from '@/api'
    export default {
	   	data () {
	   	    return {
                customer_wechat: ''
	   	    }
	   	},
		async mounted() {
		    const data = await commonPost('my/system-info')
			console.log(data.data)
			this.customer_wechat = data.data.customer_wechat
			console.log(this.customer_wechat)
			console.log(this.customer_wechat)
        }
    }
</script>

<style>

</style>
