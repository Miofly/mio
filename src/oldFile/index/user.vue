<template>
	<view class="full-width-height">
		<view class="height-thirty bg-blue padding">
			11
		</view>
		<view class="cu-list menu margin-top-xl" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
			<view v-for="(item, index) in
				[{name: '我要提现', icon: 'money'},
				{name: '提现记录', icon: 'file-text'},
				{name: '账单记录', icon: 'file-text'}]" :key="index" class="cu-item" @tap="listFn(item.name)">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
						<text class="margin-left">{{ item.name }}</text>
					</view>
				</view>

				<view v-show="false" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>

		<view class="cu-list menu margin-top" :class="[false?'sm-border':'', false?'card-menu margin-top-xxl':'']">
			<view v-for="(item, index) in
				[{name: '修改密码', icon: 'lock'},
				{name: '退出登录', icon: 'power-off'}]" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
						<text class="margin-left">{{ item.name }}</text>
					</view>
				</view>

				<view v-show="false" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow']" @tap="detail(item.url)">
						操作
					</button>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
		methods: {
            listFn (name) {
				if (name == '我要提现') {
				    this.ui.showToast(name)
				}
                if (name == '提现记录') {
                    this.ui.showToast(name)
                }
                if (name == '账单记录') {
                    this.ui.showToast(name)
                }
            },
		},
    }
</script>

<style>

</style>
