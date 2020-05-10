<template>
    <view style="position: relative;height: 100%">
        <!--上面搜索栏-->
        <view class="cu-bar search fixed" :class="['bg-'+bgColor]">
            <view v-if="avatarShow">
                <view v-if="backSwitch" class="cu-avatar round"
                      :style="[{background: 'url('+ avatarSrc +') no-repeat', backgroundSize: '100% 100%'}]"
                ></view>
                <view v-else @tap="backIndex" class="fa fa-reply text-gray"
                      style="margin-left: 10upx;font-size: 40rpx"></view>
            </view>

            <view class="search-form round">
                <text class="fa fa-search"></text>
                <!-- @blur="InputBlur"
                -->
                <input v-model="keyword" @focus="inputFocus"
                       @input="realTimeInput(keyword)"
                       :adjust-position="false" type="text"
                       :placeholder=placeholder
                       confirm-type="search"
                       @search="doSearch(keyword)"
                >
                <!--删除文字图标-->
                <text @tap="deleteVal" class="fa fa-close padding-right-sm"></text>
            </view>

            <view class="action">
                <button @tap="doSearch(keyword)" :class="['bg-'+ btnColor]" class="cu-btn shadow-blur round">搜索</button>
            </view>
        </view>

        <view style="margin-top: 13%;height: 100%" v-show="indexShow">
            <slot name="content"></slot>
        </view>
        <!--历史热门搜索-->
        <scroll-view style="height: 100%;position: fixed;top: 6.5%;" class="keyword-box" v-show="searchListShow" scroll-y="true" @scrolltolower="">
            <!--历史搜索-->
            <view class="keyword-block" v-if="oldKeywordList.length>0">
                <view class="keyword-list-header">
                    <view>历史搜索</view>
                    <view>
                        <image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
                    </view>
                </view>
                <view class="keyword">
                    <view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">
                        {{keyword}}
                    </view>
                </view>
            </view>

            <!--热门搜索-->
            <view class="keyword-block">
                <view class="keyword-list-header">
                    <view>热门搜索</view>
                    <view>
                        <image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
                    </view>
                </view>
                <view class="keyword" v-if="forbid==''">
                    <view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">
                        {{keyword}}
                    </view>
                </view>
                <view class="hide-hot-tis" v-else>
                    <view>当前搜热门搜索已隐藏</view>
                </view>
            </view>
            <!--#ifdef MP-WEIXIN-->
            <!--<ad unit-id="adunit-35711c1e83d8593c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>-->
            <!--<ad unit-id="adunit-f199c3512f32503a" ad-type="video" ad-theme="black"></ad>-->
            <!--<ad unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>-->
            <!--#endif-->
        </scroll-view>

        <view v-show="!searchListShow && !indexShow" style="margin-top: 13%;height: 100%">
            <slot name="detail"></slot>
        </view>
    </view>
</template>

<script>
    import {tu} from '@/common/js/toolUtils'
    export default {
        props: { // String Number Boolean Array Object Function || validator (value) {}
            avatarShow: { // 是否显示头像
                type: Boolean,
                default: true,
                required: false
            },
            avatarSrc: { // 头像资源
                type: String,
                default: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/github.svg',
                required: false
            },
            bgColor: { // 背景颜色
                type: String,
                default: 'white',
                required: false
            },
            btnColor: { // 按钮颜色
                type: String,
                default: 'blue',
                required: false
            },
            placeholder: { // 输入提示
                type: String,
                default: '请输入要搜索的内容',
                required: false
            },
            hotKeywordList: { // 热门搜索信息
                type: Array,
                default: function () {
                    return ['周杰伦', '陈奕迅', '华晨宇', '许嵩']
                },
                required: false
            },
        },
        data () {
            return {
                indexShow: true, // 显示热门历史搜索模块
                searchListShow: false, // 显示热门历史搜索模块
                oldKeywordList: [], // 历史搜索信息
                hisKeys: 'hisKeys', // 历史搜索的key值
                keyword: '', // 搜索关键字
                forbid: '', // 热门搜索开关
                backSwitch: true, // 头像与返回按钮显示切换
            }
        },
        created () {
            this.init()
        },
        methods: {
            backIndex () { // 返回首页
                this.searchListShow = false
                this.backSwitch = true
                this.indexShow = true
            },
            init () { // 初始化
                this.loadOldKeyword()
                // this.loadHotKeyword()
            },
            // 加载历史搜索,自动读取本地Storage
            loadOldKeyword () {
                uni.getStorage({
                    key: this.hisKeys,
                    success: (res) => {
                        const hisKeysData = JSON.parse(res.data)
                        this.oldKeywordList = hisKeysData
                    }
                })
            },
            // 加载热门搜索
            // loadHotKeyword () {
            //     // 定义热门搜索关键字，可以自己实现ajax请求数据再赋值
            //     this.hotKeywordList = ['周杰伦', '陈奕迅', '华晨宇', '许嵩']
            // },
            inputFocus () { // 搜索框聚焦事件
                this.indexShow = false
                this.searchListShow = true
                this.backSwitch = false
            },
            // 清除输入框内容
            deleteVal () {
                this.keyword = ''
                this.searchListShow = true
            },
            // 清除历史搜索
            oldDelete () {
                uni.showModal({
                    content: '确定清除历史搜索记录？',
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            this.oldKeywordList = []
                            uni.removeStorage({
                                key: this.hisKeys
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            // 热门搜索开关
            hotToggle () {
                this.forbid = this.forbid ? '' : '_forbid'
            },
            // 保存关键字到历史记录
            saveKeyword (keyword) {
                uni.getStorage({
                    key: this.hisKeys,
                    success: (res) => {
                        console.log(res.data)
                        const songKeys = JSON.parse(res.data)
                        const findIndex = songKeys.indexOf(keyword)
                        if (findIndex === -1) {
                            songKeys.unshift(keyword)
                        } else {
                            songKeys.splice(findIndex, 1)
                            songKeys.unshift(keyword)
                        }
                        // 最多10个纪录
                        songKeys.length > 10 && songKeys.pop()
                        uni.setStorage({
                            key: this.hisKeys,
                            data: JSON.stringify(songKeys)
                        })
                        this.oldKeywordList = songKeys // 更新历史搜索
                    },
                    fail: (e) => {
                        const songKeys = [keyword]
                        uni.setStorage({
                            key: this.hisKeys,
                            data: JSON.stringify(songKeys)
                        })
                        this.oldKeywordList = songKeys // 更新历史搜索
                    }
                })
            },
            realTimeInput: tu.debounce(function (key) { // 实时输入搜索
                this.indexShow = false
                if (key.trim() != '') { // eslint-disable-line
                    this.saveKeyword(key.trim())
                    this.searchListShow = false
                    this.$emit('parentFun', key.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                }
            }, 2000),
            // 执行搜索
            doSearch: tu.throttle(function (key) {
                this.indexShow = false
                if (this.keyword !== key.trim() && key.trim() != '') { // eslint-disable-line
                    this.keyword = key.trim()
                    this.saveKeyword(this.keyword)
                    this.searchListShow = false
                    this.$emit('parentFun', key.trim()) // 子组件传值到父组件（父组件接收时的方法，传递的值）
                } else {
                    this.searchListShow = false
                    console.log('搜索内容为空或者与上次一致')
                }
            }, 2000),
        },
    }

</script>

<style>
    .search-box .input-box > input {
        width: 100%;
        height: 60rpx;
        font-size: 32rpx;
        border: 0;
        border-radius: 60rpx;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0 3%;
        margin: 0;
        background-color: #ffffff;
    }

    .keyword-entry image {
        width: 60rpx;
        height: 60rpx;
    }

    .keyword-box {
        width: 100%;
        border-radius: 0rpx 0rpx 20rpx 20rpx;
        background-color: #fff;
    }

    .keyword-box .keyword-block {
        padding: 10rpx 0;
    }

    .keyword-box .keyword-block .keyword-list-header {
        width: 98%;
        padding: 10rpx 1%;
        font-size: 27rpx;
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    .keyword-box .keyword-block .keyword-list-header image {
        width: 40rpx;
        height: 40rpx;
    }

    .keyword-box .keyword-block .keyword {
        width: 94%;
        padding: 3px 3%;
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
    }

    .keyword-box .keyword-block .hide-hot-tis {
        display: flex;
        justify-content: center;
        font-size: 28rpx;
        color: #6b6b6b;
    }

    .keyword-box .keyword-block .keyword > view {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 60rpx;
        padding: 0 20rpx;
        margin: 10rpx 20rpx 10rpx 0;
        height: 60rpx;
        font-size: 28rpx;
        background-color: rgb(242, 242, 242);
        color: #6b6b6b;
    }
</style>
