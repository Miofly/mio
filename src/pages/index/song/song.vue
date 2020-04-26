<template>
    <view style="height: 100%">
        <view class="cu-bar search bg-white fixed">
            <!--头像-->
            <image v-if="!isShow" class="cu-avatar round" :src="avatar === '' ? '/static/HM-search/logo.png' : avatar"></image>
            <view v-else @tap="backIndex" class="fa-back text-gray"
                  style="margin-left: 10upx;font-size: 75upx"></view>

            <view class="search-form round" style="margin: 0 10rpx">
                <text class="cuIcon-search"></text>
                <input :placeholder="defaultKeyword" @search="doSearch(keyword)" confirm-type="search"
                       @input="inputChange" @focus="inputChange" @confirm="doSearch(keyword)" v-model="keyword"
                       type="text"></input>
                <!--删除文字图标-->
                <text @tap="delectVal" class="cuIcon-close padding-right-sm"></text>
            </view>
            <!--触发搜索-->
            <view class="action">
                <button class="cu-btn bg-blue shadow-blur round" @tap="doSearch(keyword)">搜索</button>
            </view>
        </view>

        <!--历史热门搜索-->
        <view v-show="isShow" class="search-keyword" @touchstart="blur">
            <view class="keyword-box" style="margin-top: 13%">
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
            </view>
        </view>


        <view v-if="isShows" class="cu-bar bg-white solid-bottom" style="margin-top: 13%">
            <view class="action">
                <text class="cuIcon-title text-red text-xsl"></text>
                歌曲列表
                <view @tap="downMethod"
                      class="margin-left-xl tui-tag-small tui-tag-outline tui-blue-outline">下载教程
                </view>
            </view>
        </view>

        <scroll-view v-if="isShows" style="height: 100%" class="panel-scroll-box" scroll-y
                     @scrolltolower="loadMore">
            <view class="cu-list menu"
                  :class="[menuBorder?'sm-border':'', menuCard?'card-menu margin-top':'']">
                <view class="cu-item" :class="menuArrow?'arrow':''" v-for="(row, index) in songList"
                      :key="index">
                    <view class="content padding-tb-sm">
                        <view>
                            <text style="transform:rotate(270deg);margin-top: -3px"
                                  class="cuIcon-tagfill text-blue margin-right-sm"></text>
                            <rich-text>{{row.names}}</rich-text>
                        </view>
                    </view>

                    <view class="action">
                        <button @tap="detail(row.id)" :class="['cu-btn', 'bg-blue', 'shadow']">
                            详情
                        </button>
                    </view>
                </view>
            </view>
            <!-- 上滑加载更多组件 -->
            <mix-load-more v-if="isShows" :status="loadMoreStatus"></mix-load-more>
        </scroll-view>
        <ad unit-id="adunit-25b59fd8185c8f72" ad-intervals="30"></ad>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    let cheerio = require('cheerio');

    export default {
        onLoad () {
            // this.loadPwdKeyword()

            // 在页面中定义插屏广告
            this.interstitialAd = null

            // 在页面onLoad回调事件中创建插屏广告实例
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: 'adunit-e3da36f2854215d1'
                })
                this.interstitialAd.onLoad(() => {
                    console.log('插屏广告加载成功')
                })
                this.interstitialAd.onError((err) => {
                    console.log('插屏广告出错', err)
                })
                this.interstitialAd.onClose(() => {
                    console.log('插屏广告关闭')
                })
            }
            this.init()
            wx.showShareMenu({
                withShareTicket: true
            })
        },
        // onShow () {
        //     this.loadPwdKeyword()
        // },
        data () {
            return {
                pwd: '',
                custoStates: false,
                menuBorder: false, // 短边框
                menuArrow: false, // 是否显示箭头
                menuCard: false, // 卡片
                forbid: '',
                defaultKeyword: '',
                hotKeywordList: [],
                oldKeywordList: [],
                keyword: '',
                isShow: false,
                isShows: true,
                pageIndex: 1,
                pageNum: 0,
                songList: [],
                loadMoreStatus: 1,
                songResult: [],
                interstitialAd: null
            }
        },
        methods: {
            //加载历史搜索,自动读取本地Storage
            loadPwdKeyword() {
                uni.getStorage({
                    key: 'pwdKeys',
                    success: (res) => {
                        console.log(res.data)
                        this.pwd = res.data;
                        if (this.pwd === 'waxx') {
                            this.custoStates = false
                        }
                    }
                });
            },
            detail(id) { // 查看电影详情
                this.router.push({name: 'songList', params: {id: encodeURIComponent(id)}})
                this.interstitialAd.show()

            },
            //上滑加载
            loadMore() {
                if (this.loadMoreStatus !== 2) {
                    this.getData(this.keyword)
                }
            },
            copyStr (str) {
                ui.copyStr(str)
            },
            init () {
                this.loadOldKeyword()
                this.loadDefaultKeyword()
                this.loadHotKeyword()
                this.getData('周杰伦')
            },
            getData (keyword) {
                console.log('当前页：', this.pageIndex)
                this.keyword = keyword
                this.ui.yunFun('httpRequest', {
                    singer: encodeURI(keyword),
                    num: this.pageIndex
                }, (res) => {
                    const $ = cheerio.load(res.result.body, {_useHtmlParser2: true})
                    let num = $('.main div').eq(1).find('a').text().replace(/共/, '').replace(/页/, '')
                    this.pageNum = num

                    $("#wlsong ul li a").each((index, item) => {
                        // 取出title，注意这里使用了$(item)，而不是item本身
                        // let id = $(item).attr('onclick').split('\',\'')[1].replace(/'\);/g, '')
                        let id = $(item).attr('href').replace(/\?v=/g, '')
                        let names = $(item).find('span').text()
                        let tmpObj = {
                            id: id,
                            names: names
                        };

                        if (this.songList === []) {
                            this.songList.push(tmpObj)
                        } else {
                            this.songList = this.songList.concat(tmpObj)
                        }

                        if (this.pageIndex >= this.pageNum) {
                            this.loadMoreStatus = 2
                        } else {
                            this.loadMoreStatus = 1
                        }
                    })
                    console.log(this.songList)
                    this.pageIndex = this.pageIndex + 1
                }, false)
            },
            delectVal () {
                this.keyword = ''
            },
            inputChange(event) {
                this.isShow = true
                this.isShows = false
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },
            backIndex () {
                this.isShows = true
                this.isShow = false
            },
            blur() {
                uni.hideKeyboard()
            },
            //执行搜索
            doSearch(key) {
                this.songList = []
                this.pageIndex = 1
                key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
                this.keyword = key;
                this.saveKeyword(key); //保存为历史
                this.getData(key)
                this.isShows = true
                this.isShow = false
            },
            //清除历史搜索
            oldDelete() {
                uni.showModal({
                    content: '确定清除历史搜索记录？',
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            this.oldKeywordList = [];
                            uni.removeStorage({
                                key: 'songKeys'
                            });
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            //热门搜索开关
            hotToggle() {
                this.forbid = this.forbid ? '' : '_forbid';
            },
            //保存关键字到历史记录
            saveKeyword(keyword) {
                uni.getStorage({
                    key: 'songKeys',
                    success: (res) => {
                        console.log(res.data);
                        var songKeys = JSON.parse(res.data);
                        var findIndex = songKeys.indexOf(keyword);
                        if (findIndex == -1) {
                            songKeys.unshift(keyword);
                        } else {
                            songKeys.splice(findIndex, 1);
                            songKeys.unshift(keyword);
                        }
                        //最多10个纪录
                        songKeys.length > 10 && songKeys.pop();
                        uni.setStorage({
                            key: 'songKeys',
                            data: JSON.stringify(songKeys)
                        });
                        this.oldKeywordList = songKeys; //更新历史搜索
                    },
                    fail: (e) => {
                        var songKeys = [keyword];
                        uni.setStorage({
                            key: 'songKeys',
                            data: JSON.stringify(songKeys)
                        });
                        this.oldKeywordList = songKeys; //更新历史搜索
                    }
                });
            },
            blur() {
                uni.hideKeyboard()
            },
            //加载默认搜索关键字
            loadDefaultKeyword() {
                //定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
                this.defaultKeyword = "请输入歌曲或歌手名称";
            },
            //加载历史搜索,自动读取本地Storage
            loadOldKeyword() {
                uni.getStorage({
                    key: 'songKeys',
                    success: (res) => {
                        var songKeys = JSON.parse(res.data);
                        this.oldKeywordList = songKeys;
                    }
                });
            },
            //加载热门搜索
            loadHotKeyword() {
                //定义热门搜索关键字，可以自己实现ajax请求数据再赋值
                this.hotKeywordList = ['周杰伦', '陈奕迅', '喜欢你', '萧萧', '告白气球', '华晨宇', '许嵩'];
            },
        },
        computed: {
            ...mapState(['avatar', 'integral', 'openId', 'hd']),
        },
    }
</script>

<style>
    page { // 固定搜索栏
        height: 100%;
    }
    .search-box {width:100%;background-color:rgb(242,242,242);padding:15upx 1.0%;display:flex;justify-content:space-between;}
    .search-box .mSearch-input-box{width: 91%;}
    .search-box .input-box {width:90%;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
    .search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:28upx;color:#fff;background:linear-gradient(to right,#ff9801,#ff570a);border-radius:60upx;}
    .search-box .input-box>input {width:100%;height:60upx;font-size:32upx;border:0;border-radius:60upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
    .placeholder-class {color:#9e9e9e;}
    .search-keyword {width:100%;background-color:rgb(242,242,242);}
    .keyword-list-box {height:calc(100vh - 250upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
    .keyword-entry-tap {background-color:#eee;}
    .keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
    .keyword-entry image {width:60upx;height:60upx;}
    .keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
    .keyword-entry .keyword-text {width:90%;}
    .keyword-entry .keyword-img {width:10%;justify-content:center;}
    .keyword-box {border-radius:20upx 20upx 0 0;background-color:#fff;}
    .keyword-box .keyword-block {padding:10upx 0;}
    .keyword-box .keyword-block .keyword-list-header {width:98%;padding:10upx 1%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
    .keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
    .keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
    .keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
    .keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
</style>
