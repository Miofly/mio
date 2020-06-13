<!--suppress ALL -->
<template>
	<view>
		<view class="padding">
			<view class="bg-white border-radius padding full-width text-center">
				常用服务电话
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + 3, true ? '' : 'no-border']">
			<view class="cu-item" v-for="(item, index) in lists" :key="index">
				<view class="fa" :class="['fa-' + item.icon, 'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge != 0">
						<block v-if="item.badge != 1">{{item.badge > 99 ? '99+' : item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
				<text style="font-size: 14px;color: red">{{item.phone}}</text>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapState} from 'vuex'
    import {
        publicGet
    } from '@/api'

    export default {
        data() {
            return {
                lists: [
                    {icon: 'phone', color: 'red', badge: 0, name: '114查号台', phone: '114'},
                    {icon: 'phone-square', color: 'orange', badge: 0, name: '报警服务台110'},
                    {icon: 'volume-control-phone', color: 'yellow', badge: 0, name: '火警119'},
                    {icon: 'headphones', color: 'olive', badge: 0, name: '急救中心120'},
                    {icon: 'microphone', color: 'cyan', badge: 0, name: '红十字会急救台999'},
                    {icon: 'mobile-phone', color: 'blue', badge: 0, name: '消费者投诉12315'},
                    {icon: 'phone', color: 'purple', badge: 0, name: '天气预报12121'},
                    {icon: 'volume-control-phone', color: 'mauve', badge: 0, name: '1258012580'},
                ]
            }
        },
    }
</script>

<style>
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32 rpx;
		flex-shrink: 0;
	}

	.tui-input {
		font-size: 32 rpx;
		color: #333;
		padding-left: 20 rpx;
		flex: 1;
	}
</style>
