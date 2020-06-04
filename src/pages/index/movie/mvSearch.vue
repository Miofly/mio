<template>
	<view style="background: rgb(30, 30, 40)">
		<movie-header ref="head"></movie-header>
		<view class="text-white padding">
			<view>
				<h3 class="margin-bottom" style="color: #ccc;">
					与<span class="margin-left-sm margin-right-sm text-bold" style="color: #ff9f16;">{{keyword}}</span>相关的影片
				</h3>
				<span style="line-height: 50rpx;color: #ccc;" class="margin-top">请注意<span style="color: #ff9f16;">不要有错别字</span>，否则搜索不到<br>
					若未找到您想搜索的影片，可
					<span style="color: #ff9f16;" @tap="showImg" >点击此处加群留言</span>
					，我们会及时添加。</span>
			</view>
		</view>

		<view style="background: rgb(30, 30, 40)" class="cu-list grid bg-black" :class="['col-' + 3,true?'':'no-border']">
			<view @tap="mvDetail(item.url)" v-for="(item, index) in datas" :key="index" class="padding-left-right-sm">
				<view style="position: relative">
					<image :src="item.img" mode="scaleToFill" style="height: 330rpx;"
						   :class="[false?'cu-avatar':'', false?'round': '']"></image>
					<text style="position: absolute;bottom: 10rpx;right: 10rpx;font-size: 12px">
						{{item.update_info}}
					</text>
				</view>
				<view style="color: #ccc;font-size: 14px" class="padding-top-bottom-lg">{{item.title.length > 7 ?
					item.title.slice(0, 7) + '...' : item.title}}
				</view>
			</view>
		</view>

		<view v-if="datas.length == 0" class="full-width text-center text-white text-lg" @tap="showImg" >没有相关资源，点击联系管理员</view>

		<view class="full-width text-center margin-top-lg margin-bottom">
			<button @tap="backIndex" class="cu-btn" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
			        <text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
			    首页
			</button>
			<button @tap="beforePgae" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
				<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
				上一页
			</button>
			<button class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
				<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
				{{page}} / {{pageTotal}}
			</button>
			<button @tap="nextPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
				<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
				下一页
			</button>
			<button @tap="lastPage" class="cu-btn margin-left-sm" style="background: rgb(46, 46, 58);color: #ccc;" :class="[['sm', 'lg', ''][2], false ? 'round' : '', true ? 'shadow' : '', false ? 'block' : '']">
				<text v-if="false" class="fa fa-wechat padding-right-twenty" :disabled=false></text>
				尾页
			</button>
		</view>

		<movie-footer></movie-footer>

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
				<button class="cu-btn fa-home fa bg-black shadow" :class="PageCur=='mvIndex'?'text-mv-yellow':'text-gray'"></button>
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

		<modal title="标题111" content="这是内容" @click="test" color="#999" :size="32" :maskClosable="false"
			   :show="status" @cancel="status = false" shape="['circle', 'square'][1]"
			   :button="[{text: '微信', type: ['green', 'default', 'primary', 'red', 'danger', 'warning', 'white', 'gray'][5], plain: true},
				{text: '支付宝', plain: false}]" :custom="true">
			<view class="fa fa-close fa-2x" style="position: absolute; top:20px;right: 10px;color: black" @tap="status = false"></view>
			<image :src="src" mode="scaleToFill" :class="[false?'cu-avatar':'', false?'round': '']"></image>
		</modal>
	</view>
</template>

<script>
    import {mapState} from 'vuex'
	import {tu} from 'mioJs/toolUtils'

    export default {
        data() {
            return {
                PageCur: '',
                datas: [],
                keyword: '',
				pageTotal: '',
                status: false,
				page: '',
                src: ''
            }
        },
        onLoad(e) {
            // #ifdef MP-WEIXIN
            var data = JSON.parse(uni.getStorageSync('ssData'))
            this.datas = data.list
            this.page = data.pageInfo.page
            this.pageTotal = data.pageInfo.pageTotal
            this.keyword = uni.getStorageSync('sskey')
            // #endif

            // #ifdef H5
			this.src = localStorage.getItem('qrcode')
            var data = JSON.parse(localStorage.getItem('ssData'))
            this.datas = data.list
            this.page = data.pageInfo.page
            this.pageTotal = data.pageInfo.pageTotal
            this.keyword = localStorage.getItem('sskey')
            // #endif
        },
        computed: {
            ...mapState(['ssData', 'ssKey', 'indexPage', 'sspage']),
        },
        methods: {
            showImg () {
                this.status = true
            },
            beforePgae: tu.throttle(function () {
                if (this.$store.state.sspage !== 1) {
                    this.$store.state.sspage = this.$store.state.sspage - 1
                    this.ui.showLoading()
                    this.$refs.head.doSearch()
                }
            }, 1500),
            nextPage: tu.throttle(function () {
                if (this.pageTotal !== 1 && this.$store.state.sspage < this.pageTotal) {
					this.$store.state.sspage = this.$store.state.sspage + 1
                    this.ui.showLoading()
                    this.$refs.head.doSearch()
                }
            }, 1500),
			lastPage: tu.throttle(function () {
                if (this.pageTotal !== 1 && this.$store.state.sspage < this.pageTotal) {
                    this.$store.state.sspage = this.pageTotal
                    this.ui.showLoading()
                    this.$refs.head.doSearch()
                }
            }, 1500),
            NavChange(e) {
                this.$store.state.indexPage = e.currentTarget.dataset.cur
                this.router.push({name: 'mvHome'})
            },
            backIndex: tu.throttle(function () {
                if (this.$store.state.sspage !== 1) {
                    this.$store.state.sspage = 1
                    this.ui.showLoading()
                    this.$refs.head.doSearch()
                }
            }, 1500),
            mvDetail (url) {
                // #ifdef MP-WEIXIN
                uni.setStorageSync('ssUrl', url)
                // #endif
				// #ifdef H5
                localStorage.setItem('ssUrl', url)
                // #endif
                this.router.push({name: 'movieDetail'})
            },
        },
    }
</script>

<style>
	page {
		background: rgb(30, 30, 40)
	}
</style>
