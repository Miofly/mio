<template>
    <view class="padding">
        <view class="nav-list">
            <router-link :to="'{name:'+item.url+'}'" class="nav-li" :class="'bg-'+item.color"
                         v-for="(item,index) in elements" :key="index">
                <view class="nav-title">{{item.title}}</view>
                <view class="nav-name">{{item.name}}</view>
                <text class="fa" :class="'fa-'+item.icon"></text>
            </router-link>
        </view>
    </view>
</template>

<script>
    import navJson from '@/static/mockJson/navJson.json'

    import {
        navJsonData
    } from '@/api'
    export default {
        data () {
            return {
                elements: []
            }
        },
        // #ifdef H5
        async created () { // eslint-disable-line
            this.elements = await navJsonData()
            console.log(this.elements)
        },
        // #endif

        // #ifdef MP-WEIXIN
        async onReady () {
            this.elements = navJson
        },
        // #endif

    }
</script>

<style>
    .page {
        height: 100vh;
    }
</style>
