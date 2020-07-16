<template>
	<view style="">
		<view style="background: rgb(76, 76, 76);">
			<view >
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg"
					   :class="[false?'cu-avatar':'', false?'round': '']"
				    style="width: 100%;position: relative">
					<view style="position: absolute;top: 25rpx;left: 20rpx;color:white">广告</view>
					<view>

					</view>
				</image>

			</view>
			<view style="height: 120rpx;background: rgb(76, 76, 76);width: 100vw;"
				  class="flex align-center justify-between">
				<view class="cu-avatar margin-left" :class="[false ? 'radius' : 'round']"
					  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);
						width: 80rpx">
					<view v-if="false" class="cu-tag badge">999</view>
					<view style="color: white;margin-left: 300rpx">
						小招助手
					</view>
				</view>
				<view style="color: white;margin-right: 20rpx">
					查看详情

				</view>
			</view>
		</view>
	</view>
</template>

<script>

</script>

<!--


http://121.51.91.34/om.tc.qq.com/Av0IDFOrinK8f_KLrFAEzgx1ppS7NS1re5kQx6R8bzAM/uwMROfz2r5zAoaQXGdGnCWdfhznRB49zMd5W21cdf5StCD5A/j3111dqsgjp.m701.mp4?
vkey=6DFE767C60FBADEC6D7E0E34F140FA25A89AF9097AE6B5FCDB24CBFA7C96C00549DBA50D5FEEFD773942C5FBD191736EBC6CC4517019153BFBCA1AD22B052988781D317EB50BA3AE73B3B8CCA6855BD7CF43541CE9664A0B6CD55D1F14F424E3FEBFD9A433B72AB1053B07E62AF22855
-->
