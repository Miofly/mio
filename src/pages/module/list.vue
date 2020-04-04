<template>
    <view class="container bg-white">
        <!--九格宫列表-->
        <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
            <view class="cu-item" v-for="(item,index) in listData" :key="index" >
                <view class="fa" :class="['fa-' + item.icon,'text-' + item.color]">
                    <view class="cu-tag badge" v-if="item.badge!=0">
                        <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                    </view>
                </view>
                <text>{{item.name}}</text>
            </view>
        </view>
        <!--菜单型列表-->
        <view class="bg-gradual-pink text-black padding">
            <view class="cu-list menu" :class="[true?'sm-border':'', false?'card-menu margin-top':'']">
                <view class="cu-item" v-for="(keywordList, index) in keywordLists" :key="index">
                    <view class="content padding-tb-sm">
                        <view>
                            <text class="fa fa-video-camera text-blue margin-right-sm"></text>
                            <text>{{keywordList.name}}</text>
                        </view>
                    </view>

                    <view class="action">
                        <button @tap="detail(keywordList.url)" :class="['cu-btn', 'bg-blue', 'shadow']">
                            播放
                        </button>
                    </view>
                    <view v-show="true" class="fa fa-angle-right fa-2x margin-left"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import listJson from '@/static/mockJson/listJson.json'

    export default {
        data () {
            return {
                listData: [],
                gridCol: 4,
                gridBorder: true,

                keywordLists: [
                    {name: 1},
                    {name: 11},
                    {name: 112},
                    {name: 1123},
                    {name: 11234},
                    {name: 112345},
                ]
            }
        },
        async onLoad () {
            this.listData = listJson
        },
    }
</script>
