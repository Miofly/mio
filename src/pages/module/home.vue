<template>
    <view>
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
    import {
        navJsonData
    } from '@/api'

    import navJson from 'json/navJson'
    export default {
        data () {
            return {
                elements: []
            }
        },
        beforeCreate () {
            console.log('beforeCreate：组件被实例化')
        },
        async created () {
            console.log('created：实例创建完成')
            // #ifdef H5
            this.elements = await navJsonData()
            // #endif
            // #ifdef MP-WEIXIN
            this.elements = navJson
            // #endif
        },
        beforeMount () {
            console.log('beforeMount：实例开始挂载')
        },
        mounted () {
            console.log('mounted：实例挂载完成')
        }
    }
</script>

<style>
    .page {
        height: 100vh;
    }
</style>
