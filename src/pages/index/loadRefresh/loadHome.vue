<template>
	<view class="nav-list">
		<router-link v-for="(item,index) in [
                    {title: 'loadOne', name: 'loadOne~', icon: 'user', color: 'blue', url: 'loadOne'},
                    {title: 'loadTwo', name: 'loadTwo~', icon: 'user', color: 'blue', url: 'loadTwo'},
                    {title: 'loadThree', name: 'loadThree~', icon: 'user', color: 'blue', url: 'loadThree'},
                    {title: 'loadFour', name: 'loadFour~', icon: 'user', color: 'blue', url: 'loadFour'},
                    {title: 'loadFive', name: 'loadFive~', icon: 'user', color: 'blue', url: 'loadFive'}
                ]" :key="index" :to="'{name:'+item.url+'}'"
					 class="nav-li" :class="'bg-'+item.color">
			<view class="nav-title">{{ item.title }}</view>
			<view class="nav-name">{{ item.name }}</view>
			<text class="fa" :class="'fa-'+item.icon"></text>
		</router-link>
	</view>
</template>

<script>
    export default {

    }
</script>

<style>

</style>
