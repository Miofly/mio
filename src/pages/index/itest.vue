<template>
	<view class="container">

	</view>
</template>

<script>
    import {
        publicGet
    } from '@/api'

    export default {
        async onLoad() {
            const data = await publicGet('https://api.weixin.qq.com/cgi-bin/shorturl?access_token=ACCESS_TOKEN')
            // console.log(data)
        },
        data() {

        },
        methods: {}
    }
</script>
