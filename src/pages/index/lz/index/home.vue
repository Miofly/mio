<template>
	<view class="full-width-height">
		<keep-alive>
			<lz_index v-if="PageCur===pageOptions[0]"></lz_index>
		</keep-alive>
		<keep-alive>
			<lz_team v-if="PageCur===pageOptions[1]"></lz_team>
		</keep-alive>
		<keep-alive>
			<lz_rank v-if="PageCur===pageOptions[2]"></lz_rank>
		</keep-alive>
		<keep-alive>
			<lz_user v-if="PageCur===pageOptions[3]"></lz_user>
		</keep-alive>
		<view class="cu-bar tabbar bg-white foot">
			<view @click="NavChange" class="action" :data-cur=pageOptions[0]>
				<view class="fa fa-users" :class="PageCur==pageOptions[0]?'text-red':'text-gray'"></view>
				<view :class="PageCur==pageOptions[0]?'text-red':'text-gray'">{{indexData[0]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[1]>
				<view class="fa fa-users" :class="PageCur==pageOptions[1]?'text-red':'text-gray'"></view>
				<view :class="PageCur==pageOptions[1]?'text-red':'text-gray'">{{indexData[1]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[2]>
				<view class="fa fa-user-circle" :class="PageCur==pageOptions[2]?'text-red':'text-gray'"></view>
				<view :class="PageCur==pageOptions[2]?'text-red':'text-gray'">{{indexData[2]}}</view>
			</view>
			<view @click="NavChange" class="action" :data-cur=pageOptions[3]>
				<view class="fa fa-users" :class="PageCur==pageOptions[3]?'text-red':'text-gray'"></view>
				<view :class="PageCur==pageOptions[3]?'text-red':'text-gray'">{{indexData[3]}}</view>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data () {
            return {
                PageCur: 'lz_index',
                indexData: ['首页', '团队', '排行', '我的'],
				pageOptions: ['lz_index', 'lz_team', 'lz_rank', 'lz_user']
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
