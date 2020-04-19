<template>
	<view>
		<!-- 文字滚动 -->
		<scrollMess text="这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
					:speed="100" background-color="#fffbe8" color="#de8c17"
					:showClose="false" showIcon="true" :scrollable="true" :single="true"
					:showGetMore="false" :moreText="false ? '查看更多' : ''" moreColor="#999999" @getmore="getMore">
		</scrollMess>

	</view>
</template>

<script>
	export default {

	}
</script>
