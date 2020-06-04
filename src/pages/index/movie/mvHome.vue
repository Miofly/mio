<template>
	<view style="height:80%">
		<movie-header></movie-header>

		<dy v-if="PageCur==='dy'"></dy>
		<lxj v-if="PageCur==='lxj'"></lxj>
		<mvIndex v-if="PageCur==='mvIndex'"></mvIndex>
		<zy v-if="PageCur==='zy'"></zy>
		<dm v-if="PageCur==='dm'"></dm>

		<view class="cu-bar tabbar foot" style="background: rgb(39, 41, 56)">

			<view @click="NavChange" class="action" data-cur="dy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/movie' + [PageCur=='dy'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dy'?'text-mv-yellow':'text-gray'">电影</view>
			</view>
			<view @click="NavChange" class="action" data-cur="lxj">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/TV' + [PageCur=='lxj'?'1':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='lxj'?'text-mv-yellow':'text-gray'">连续剧</view>
			</view>
			<view @click="NavChange" class="action text-gray add-action" data-cur="mvIndex">
				<button class="cu-btn fa-home fa bg-black shadow"
						:class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'"></button>
				<view :class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'">首页</view>
			</view>
			<view @click="NavChange" class="action" data-cur="zy">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/variety' + [PageCur=='zy'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='zy'?'text-mv-yellow':'text-gray'">综艺</view>
			</view>
			<view @click="NavChange" class="action" data-cur="dm">
				<view class="fa-cu-image">
					<image :src="'/static/images/movie/cartoon' + [PageCur=='dm'?'1':''] + '.png'"></image>
					<!--<view class="cu-tag badge">99</view>-->
				</view>
				<view :class="PageCur=='dm'?'text-mv-yellow':'text-gray'">动漫</view>
			</view>
		</view>
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                PageCur: 'mvIndex'
            }
        },
        onShow() {
            console.log(this.$store.state.indexPage)
            if (this.$store.state.indexPage !== '') {
                this.PageCur = this.$store.state.indexPage
            } else {
                this.PageCur = 'mvIndex'
            }
        },

        methods: {
            NavChange(e) {
                this.PageCur = e.currentTarget.dataset.cur
            }
        },
        ...mapState(['indexPage']),
    }
</script>
