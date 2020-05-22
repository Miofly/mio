<template>
	<view>
		lxj
	</view>
</template>

<script>
	import {
	    publicGet
	} from '@/api'
    export default {
	    async mounted () {
			const data = await publicGet('http://123.0t038.cn/jin-61/0509gkl/515love/api/getHomeInfo.php?type=2')
			console.log(data)
	    },
	}
</script>

<style>

</style>
