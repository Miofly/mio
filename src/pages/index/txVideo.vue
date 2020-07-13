<template>
	<view>
		<video></video>
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'

    export default {
	    async onLoad () {
            const data = await publicGet('http://vv.video.qq.com/getinfo?vids=b0136et5ztz&platform=101001&charge=0&otype=json')
			console.log(data)
        },
	}
</script>

<style>

</style>
