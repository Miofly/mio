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

        <view class="nav-list">
            <router-link :to="'{name:'+item.url+'}'" class="nav-li-fill" :class="'bg-'+item.color"
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

    export default {
        data () {
            return {
                elements: []
            }
        },
        async onShow () {
            this.elements = navJson
        }
    }
</script>

<style lang="scss">

</style>
