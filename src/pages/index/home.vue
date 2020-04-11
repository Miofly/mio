<template>
	<view class="nav-list">
		<!---->
		<router-link v-for="(item,index) in elements" :key="index" :to="'{name:'+item.url+'}'"
					 class="nav-li" :class="'bg-'+item.color" :navType="item.isTab ? 'pushTab' : 'push'">
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
                    {title: '测试模块', name: 'itest', icon: 'user', color: 'blue', url: 'itest'},
                    {title: '乐转主页模块', name: 'lz_index', icon: 'user', color: 'blue', url: 'lz_home', isTab: false},
                    {title: '图表模块', name: 'chartHome', icon: 'user', color: 'blue', url: 'chartHome'},
                    {title: '时间模块', name: 'timeHome', icon: 'user', color: 'blue', url: 'timeHome'},
                    {title: '上拉加载', name: '下滑刷新', icon: 'user', color: 'blue', url: 'loadHome'}
                ]
            }
        }
    }
</script>
