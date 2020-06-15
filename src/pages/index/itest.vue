<template>
	<view class="full-width-height">
		<view class="margin">
			<view class="cu-form-group radius-sm">
				<view class="title">微信文章地址</view>
				<input placeholder="请输入微信文章地址" v-model="article" name="input" />
			</view>

			<button @tap="wechatGet(article)" class="cu-btn margin-top" :class="[['bg-blue', 'line-blue', 'line-blue lines-blue'][0],
		        ['sm', 'lg', ''][1], true ? 'radius-sm' : '', true ? 'shadow' : '', true ? 'block' : '']">
				<text v-show="false" class="fa fa-wechat padding-right-twenty" :disabled="false"></text>
				提取
			</button>
		</view>

		<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
			<view v-for="(item, index) in lists" :key="index" class="cu-item">
				<view class="content padding-tb-sm">
					<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
					<text class="text-black margin-left">{{ item.name.length > 12 ? item.name.slice(0, 12) + '...' :
						item.name }}
					</text>
					<text class="text-black margin-left text-sm">{{ item.remark.length > 12 ? item.remark.slice(0, 12) +
						'...' : item.remark}}
					</text>
				</view>

				<view v-show="true" class="action">
					<button :class="['cu-btn', 'bg-blue', 'shadow', 'sm']" @tap="copyText(item.remark)">
						复制
					</button>
				</view>
				<view v-show="false" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
			</view>
		</view>
		<view class="padding" style="padding-bottom: 0!important;">
			<view class="bg-white border-radius padding full-width text-center text-bold">
				图片预览(可点击图片长按保存)
			</view>
		</view>
		<!--
			scrollTop: 0 || newscroll(e) {this.scrollTop = e.detail.scrollTop}
			>>> .spin-circle {background: url('@/static/images/common/loading1.gif') no-repeat center !important;}
			>>> .easy-loadimage{width: 100%;}  >>> .origin-img{border-radius: 20rpx;}
			>>> .loadfail-img, >>>.loading-img{height: 500rpx;}
		-->
		<view v-for="(item, index) in imgLists" :key="index" class="text-center">
			<imgLoad :showAll="true" :scrollTop="0"
					 :mode="['aspectFit', 'scaleToFill', 'aspectFill', 'widthFix', 'heightFix'][0]"
					 :image-src="item"
					 :loading-mode="['spin-circle', 'skeleton-1', 'skeleton-2', 'looming-gray'][0]">
			</imgLoad>
		</view>

	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'

    export default {
        async onLoad() {
            // #ifdef H5
            this.wechatGet('wx/s/spd-h3drTQB8dveGdX3D6Q')
            // #endif
            // #ifdef MP-WEIXIN
            this.wechatGet('https://mp.weixin.qq.com/s/spd-h3drTQB8dveGdX3D6Q')
            // #endif
        },
        data() {
            return {
                article: '',
                lists: [],
                imgSrc: '',
                imgSrc1: '',
                imgLists: []
            }
        },
        methods: {
            copyText(str) {
                this.tu.getClipboardData(str)
            },
            async wechatGet(url) {
                if (url == '') {
                    this.ui.showToast('请输入公众号文章链接')
                    return
                }
                // if (url.indexOf('http://mp.weixin.qq.com/') == -1 && url.indexOf('https://mp.weixin.qq.com/') == -1) {
                //     this.ui.showToast('请填写 “http or https://mp.weixin.qq.com/ ” 开头的网址')
                //     return
                // }
                const data = await publicGet(url) // 获取的数

                try {
                    const name = data.split('var nickname = "')[1].split('var appmsg_type = "')[0].split('";')[0]
                    const title = data.split('var msg_title = \'')[1].split('var msg_desc = "')[0].split('\'.html(false);')[0]
                    const desc = data.split('var msg_desc = "')[1].split('var msg_cdn_url = "')[0].split('";')[0]
                    const coverOne = data.split('var msg_cdn_url = "')[1].split('var cdn_url_1_1  = "')[0].split('?wx_fmt=jpeg";')[0]
                    const coverTwo = data.split('var cdn_url_1_1  = "')[1].split('var cdn_url_235_1 = "')[0].split('?wx_fmt=jpeg";')[0]
                    const avatarOne = data.split('var round_head_img = "')[1].split('var hd_head_img = "')[0].split('?wx_fmt=png";')[0]
                    const avatarTwo = data.split('var hd_head_img = "')[1].split('var ori_head_img_url = "')[0].split('"||"";')[0]
                    const avatarThree = data.split('var ori_head_img_url = "')[1].split('var msg_title =')[0].split('";')[0]
                    console.log('公众号名称：', name)
                    console.log('文章标题：', title)
                    console.log('文章描述：', desc)
                    console.log('公众号文章封面图片1地址：', coverOne)
                    console.log('公众号文章封面图片2地址：', coverTwo)
                    console.log('公众号头像1：', avatarOne)
                    console.log('公众号头像2：', avatarTwo)
                    console.log('公众号头像3：', avatarThree)

                    this.lists = [
                        {name: '公众号名称：', remark: name, icon: 'bars'},
                        {name: '文章标题：', remark: title, icon: 'bars'},
                        {name: '文章描述：', remark: desc, icon: 'bars'},
                        {name: '文章封面图片1地址：', remark: coverOne, icon: 'bars'},
                        {name: '文章封面图片2地址：', remark: coverTwo, icon: 'bars'},
                        {name: '公众号头像地址1：', remark: avatarOne, icon: 'bars'},
                        {name: '公众号头像地址2：', remark: avatarTwo, icon: 'bars'},
                        {name: '公众号头像地址3：', remark: avatarThree, icon: 'bars'},
                    ]

                    this.imgLists = [coverOne, coverTwo, avatarOne, avatarTwo, avatarThree]
                } catch {
                    const name = data.split('d.nick_name = "')[1].split('d.round_head_img')[0].split('";')[0]
                    const title = data.split('d.title = "')[1].split('d.nick_name = "')[0].split('";')[0].replace(/\x0a/g, '')
                    const coverOne = data.split('<meta property="twitter:image" content="')[1].split('<meta property="twitter:title" content="')[0].split('" />')[0]
                    const avatarOne = data.split('d.round_head_img =')[1].split('?wx_fmt=png"||')[0].split('"')[1]
                    const avatarTwo = data.split('d.hd_head_img = "')[1].split('"||"";')[0]

                    console.log('公众号名称：', name)
                    console.log('文章标题：', title)
                    console.log('公众号文章封面图片1地址：', coverOne)
                    console.log('公众号头像1：', avatarOne)
                    console.log('公众号头像2：', avatarTwo)

                    this.lists = [
                        {name: '公众号名称：', remark: name, icon: 'bars'},
                        {name: '文章标题：', remark: title, icon: 'bars'},
                        {name: '文章封面图片1地址：', remark: coverOne, icon: 'bars'},
                        {name: '公众号头像地址1：', remark: avatarOne, icon: 'bars'},
                        {name: '公众号头像地址2：', remark: avatarTwo, icon: 'bars'},
                    ]

                    this.imgLists = [coverOne, avatarOne, avatarTwo]
                }
            },
        },
        computed: {},
    }
</script>
