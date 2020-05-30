<template>
	<view>
		<view class="cu-list menu sm-border card-menu margin-top margin-bottom-xl">

			<view class="cu-item" v-for="(item, index) in lists" :key="index">
				<view class="content padding-tb-sm">
					<view>
						<text class="fa fa-bars text-blue margin-right-sm"></text>
						<text class="text-grey">{{item.name}}</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
			<button open-type="share" style="background: white;border: none!important;border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;border-top-left-radius: 0;
            border-top-right-radius: 0;" class="cu-item share">
				<view class="content">
					<view>
						<text class="fa fa-share text-blue margin-right-sm"></text>
						<text class="text-grey">分享给朋友</text>
					</view>
				</view>
				<view v-show="true" class="fa fa-angle-right margin-left text-gray"
					  style="font-size: 1.3rem"></view>
			</button>
		</view>
	</view>
</template>

<script>
    export default {
        onLoad() {
            this.getSystemInfo()
        },
        data() {
            return {
                lists: []
            }
        },
        methods: {
            getSystemInfo() {
                uni.getSystemInfo({
                    success: (res) => {
                        console.log(res)
                        this.brand = res.brand // 手机品牌
                        this.lists.push(
                            {name: '手机品牌：' + res.brand},
                            {name: '手机型号：' + res.model},
                            {name: '设备像素比：' + res.pixelRatio},
                            {name: '屏幕宽度：' + res.windowWidth},
                            {name: '屏幕高度：' + res.windowHeight},
                            {name: '应用设置的语言：' + res.language},
                            {name: '引擎版本号：' + res.version},
                            {name: '客户端平台：' + res.platform},
                            {name: '操作系统版本：' + res.system},
                            {name: '用户字体大小设置：' + res.fontSizeSetting + 'px'},
                            {name: '客户端基础库版本：' + res.SDKVersion}
                        )
                    }
                })
            },
        },
    }
</script>

<style>
	button::after { /*button的边框样式是通过::after方式实现的*/
		border: none;
	}
</style>
