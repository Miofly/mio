<template>
	<view>

	</view>
</template>

<script>
	import axios from 'axios'
	export default {
	    onLoad () {
            axios.defaults.withCredentials = true // 允许axios请求携带cookie等凭证
            axios.get('http://www.okzyw.com/index.php?m=vod-search', {
                wd: '庆余年',
                submit: 'search'
            }).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
	    },
	}
</script>
