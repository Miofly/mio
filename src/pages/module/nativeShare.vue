<template>
	<view class="bg-white">
		<view @tap="test">跳转</view>
	</view>
</template>

<script>
    import NativeShare from 'nativeshare'

    export default {
        data () {
            return {
                nativeShare: new NativeShare()
            }
        },
        methods: {
			test () {
			    // const nativeShare = new NativeShare()
                if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
                    this.ui.showToast('图文分享请打开QQ浏览器', 2)
                } else {
                    try {
                        this.nativeShare.setShareData({
                            // link: 'http://192.168.3.82:8080/#/pages/index/itest',
                            title: 'title111',
                            desc: 'desc11',
                            icon: 'https://t12.baidu.com/it/u=751929707,172094732&fm=76',
                        })
                        this.nativeShare.call('wechatFriend')
                    } catch (err) {
                        console.log(err)
                        this.ui.showToast('此浏览器不支持跳转')
                    }
                }
			},
        },
    }
</script>
