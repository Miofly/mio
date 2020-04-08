<template>
	<view>
		<view class="nav-list">
			<router-link v-for="(item,index) in [
		                {title: 'chartIndex', name: 'chartIndex~', icon: 'user', color: 'blue', url: 'chartIndex'},
		                {title: 'chartBar', name: 'chartBar~', icon: 'user', color: 'blue', url: 'chartBar'},
		                {title: 'chartColumn', name: 'chartColumn~', icon: 'user', color: 'blue', url: 'chartColumn'},
		                {title: 'chartColumns', name: 'chartColumns~', icon: 'user', color: 'blue', url: 'chartColumns'},
		                {title: 'chartLine', name: 'chartLine~', icon: 'user', color: 'blue', url: 'chartLine'},
		                {title: 'chartPie', name: 'chartPie~', icon: 'user', color: 'blue', url: 'chartPie'}
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
