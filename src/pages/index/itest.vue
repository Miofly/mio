<template>
	<view>
		<!--.test>view>view>view{height: 100%;}-->
		<search class="test" @parentFun="questionListFn" style="height: 100%;">
			<template v-slot:content>
				<view class="cu-list menu" :class="[false?'sm-border':'', true?'card-menu margin-top':'']">
					<view v-for="(item, index) in
						[{name: '列表一', icon: 'video-camera'},
						{name: '列表一', icon: 'user'},
						{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
								<text class="margin-left">{{ item.name }}</text>
							</view>
						</view>
						<view v-show="false" class="action">
							<button :class="['cu-btn', 'bg-blue', 'shadow']" >
								操作
							</button>
						</view>
						<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
					</view>
				</view>
			</template>
			<template v-slot:detail>
				<scroll-view style="height: 85%" scroll-y="true" >
					<view class="cu-list menu" :class="[false?'sm-border':'', false?'card-menu margin-top':'']">
						<view v-for="(item, index) in
							[{name: '列表11一', icon: 'video-camera'},
							{name: '列表一', icon: 'user'},
							{name: '列表一', icon: 'phone'}]" :key="index" class="cu-item">
							<view class="content padding-tb-sm">
								<view>
									<text class="fa text-blue width-lg" :class="['fa-' + item.icon]"></text>
									<text class="margin-left">{{ item.name }}</text>
								</view>
							</view>
							<view v-show="false" class="action">
								<button :class="['cu-btn', 'bg-blue', 'shadow']">
									操作
								</button>
							</view>
							<view v-show="true" class="fa fa-angle-right fa-2x margin-left text-gray"></view>
						</view>
					</view>
					<loadMore :status="loadStatus = 1"></loadMore>
				</scroll-view>
			</template>
		</search>
	</view>
</template>

<script>

</script>

<style>

</style>
