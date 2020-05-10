<template>
	<view>
		<view class="cu-list grid margin-top-ten-five" :class="['col-' + 5, false ? '' : 'no-border']">
			<view class="cu-item" v-for="(item, index) in toolLists" :key="index">
				<view class="fa" :class="['fa-' + item.icon, 'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge != 0">
						<block v-if="item.badge != 1">{{item.badge > 99 ? '99+' : item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
            return {
                toolLists: [
                    {icon: 'weixin', color: 'red', badge: 0, name: 'weixin'},
                    {icon: 'close', color: 'orange', badge: 0, name: '录像'},
                    {icon: 'weixin', color: 'yellow', badge: 0, name: '图像'},
                    {icon: 'weixin', color: 'olive', badge: 0, name: '通知'},
                    {icon: 'weibo', color: 'cyan', badge: 0, name: '排行榜通知'},
                    {icon: 'qq', color: 'blue', badge: 0, name: '皮肤'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '帮助发现图像'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '帮助'},
                    {icon: 'weixin', color: 'purple', badge: 0, name: '问答'},
                    {icon: 'weixin', color: 'mauve', badge: 0, name: '版权'}
                ]
            }
        },
    }
</script>

<style>

</style>
