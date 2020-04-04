<template>
	<view class="nav-list">
		<router-link v-for="(item,index) in elements" :key="index" :to="'{name:'+item.url+'}'"
					 class="nav-li" :class="'bg-'+item.color">
			<view class="nav-title">{{ item.title }}</view>
			<view class="nav-name">{{ item.name }}</view>
			<text class="fa" :class="'fa-'+item.icon"></text>
		</router-link>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                elements: [
                    {title: '登录模块', name: 'login', icon: 'user', color: 'blue', url: 'login'},
                    {title: '测试模块', name: 'itest', icon: 'user', color: 'blue', url: 'itest'}
                ]
            }
        }
    }
</script>
