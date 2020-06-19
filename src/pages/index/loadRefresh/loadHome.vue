<template>
	<view class="nav-list">
		<router-link v-for="(item,index) in [
					{title: 'loadAndTopBottom', name: 'loadAndTopBottom~', icon: 'user', color: 'blue', url: 'loadAndTopBottom'},
                    {title: 'loadFullLongTab', name: 'loadFullLongTab~', icon: 'user', color: 'blue', url: 'loadFullLongTab'},
                    {title: 'loadFullNoTab', name: 'loadFullNoTab~', icon: 'user', color: 'blue', url: 'loadFullNoTab'},
                    {title: 'loadFullOneTab', name: 'loadFullOneTab~', icon: 'user', color: 'blue', url: 'loadFullOneTab'},
                    {title: 'loadFullShortTab', name: 'loadFullShortTab~', icon: 'user', color: 'blue', url: 'loadFullShortTab'},
                    {title: 'loadTestOne', name: 'loadTestOne~', icon: 'user', color: 'blue', url: 'loadTestOne'},
                    {title: 'loadTestTwo', name: 'loadTestTwo~', icon: 'user', color: 'blue', url: 'loadTestTwo'},
                ]" :key="index" :to="'{name:'+item.url+'}'"
					 class="nav-li" :class="'bg-'+item.color">
			<view class="nav-title">{{ item.title }}</view>
			<view class="nav-name">{{ item.name }}</view>
			<text class="fa" :class="'fa-'+item.icon"></text>
		</router-link>
	</view>
</template>

<script>
    export default {}
</script>

<style>

</style>
