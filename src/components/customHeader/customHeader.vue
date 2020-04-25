<template>
	<view>
		<view class="full-width bg-red text-xl text-center" style="height: 100rpx;
		line-height: 100rpx;padding: 0!important;">
			<view @tap="tu.back()" class="fa fa-angle-left fa-2x fl margin-left"
				  style="line-height: 100rpx"></view>
			{{name}}
		</view>
	</view>
</template>

<script>
    export default {
        props: { // String Number Boolean Array Object Function || validator (value) {}
            name: { //
                type: String,
                default: '这是标题',
                required: false
            },
        },
	}
</script>

<style>

</style>
