<template>
	<view style="height: 100%">
		<view v-for="(item, index) in dataLists" :key="index" class="cu-item">
			<imgLoad style="height: 180px" :scroll-top="scrollTop" :image-src="item.images[0]"
					 loading-mode="spin-circle"></imgLoad>
		</view>
	</view>
</template>

<script>
	import {
	    goodGirlData
	} from '@/api'
    export default {
	    async onLoad () {
            const data = await goodGirlData('iOS', 1, 10) // 获取的数
			this.dataLists = data.data
	    },
        data() {
            return {
                scrollTop: 0,
                dataLists: []
            }
        },
        onPageScroll({scrollTop}) {
            console.log(scrollTop)
            // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
            this.scrollTop = scrollTop;
        },
    }
</script>

<style>
	page {
		height: 100%;
	}
	.item {
		width: 48%;
		background: #fff;
		margin-bottom: 80 rpx;
		border-radius: 20 rpx;
	}

	.item >>> .easy-loadimage {
		width: 100%;
		/* height: 500rpx; */
		margin-bottom: 38 rpx;
	}

	.item >>> .origin-img {
		border-radius: 20 rpx;
	}

	/* mode为widthFix即图片高度自适应时要设置占位图默认高度 */
	.item >>> .loadfail-img, .item >>> .loading-img {
		height: 500 rpx;
	}
</style>
