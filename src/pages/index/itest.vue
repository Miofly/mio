<template>
	<view>
		<video></video>
	</view>
</template>

<script>
	import {
	    publicPost
	} from '@/api'
    export default {
		async onLoad () {
		    const data = await publicPost('wxv/api/out/get-v-url')
			console.log(data)
		},
    }
</script>

<!--


http://121.51.91.34/om.tc.qq.com/Av0IDFOrinK8f_KLrFAEzgx1ppS7NS1re5kQx6R8bzAM/uwMROfz2r5zAoaQXGdGnCWdfhznRB49zMd5W21cdf5StCD5A/j3111dqsgjp.m701.mp4?
vkey=6DFE767C60FBADEC6D7E0E34F140FA25A89AF9097AE6B5FCDB24CBFA7C96C00549DBA50D5FEEFD773942C5FBD191736EBC6CC4517019153BFBCA1AD22B052988781D317EB50BA3AE73B3B8CCA6855BD7CF43541CE9664A0B6CD55D1F14F424E3FEBFD9A433B72AB1053B07E62AF22855
-->
