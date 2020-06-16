<template>
	<view class="full-width-height">
		<keep-alive>
			<lz_index v-if="PageCur===pageOptions[0]"></lz_index>
		</keep-alive>
		<keep-alive>
			<lz_team v-if="PageCur===pageOptions[1]"></lz_team>
		</keep-alive>
		<keep-alive>
			<lz_user v-if="PageCur===pageOptions[2]"></lz_user>
		</keep-alive>
		<view class="cu-bar tabbar bg-white foot">
			<view @click="NavChange" class="action" :data-cur=pageOptions[1]>
				<view class="fa fa-users" :class="PageCur==pageOptions[1]?'text-blue':'text-gray'"></view>
				<view :class="PageCur==pageOptions[1]?'text-blue':'text-gray'">{{indexData[1]}}</view>
			</view>
			<view @click="NavChange" class="action text-gray add-action" :data-cur=pageOptions[0]>
				<button class="cu-btn fa-home fa shadow" :class="PageCur==pageOptions[0]?'bg-blue':'bg-gray'"></button>
				<view :class="PageCur==pageOptions[0]?'text-blue':'text-gray'">{{indexData[0]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[2]>
				<view class="fa fa-user-circle" :class="PageCur==pageOptions[2]?'text-blue':'text-gray'"></view>
				<view :class="PageCur==pageOptions[2]?'text-blue':'text-gray'">{{indexData[2]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
            return {
                PageCur: 'lz_index',
                indexData: ['主页', '团队', '我的'],
				pageOptions: ['lz_index', 'lz_team', 'lz_user']
            }
        },
        onLoad () {
        },
        methods: {
            NavChange (e) {
                this.PageCur = e.currentTarget.dataset.cur
            }
        }
    }
</script>
