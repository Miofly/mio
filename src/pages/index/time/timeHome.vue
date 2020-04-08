<template>
	<view>
		<view class="nav-list">
			<router-link v-for="(item,index) in [
		                {title: 'timeOne', name: 'timeOne~', icon: 'user', color: 'blue', url: 'timeOne'},
		                {title: 'timeTwo', name: 'timeTwo~', icon: 'user', color: 'blue', url: 'timeTwo'},
		                {title: 'timeThree', name: 'timeThree~', icon: 'user', color: 'blue', url: 'timeThree'}
		            ]" :key="index" :to="'{name:'+item.url+'}'"
						 class="nav-li" :class="'bg-'+item.color" :navType="item.isTab ? 'pushTab' : 'push'">
				<view class="nav-title">{{ item.title }}</view>
				<view class="nav-name">{{ item.name }}</view>
				<text class="fa" :class="'fa-'+item.icon"></text>
			</router-link>
		</view>
	</view>
</template>

<script>
    export default {

    }
</script>

<style>

</style>
