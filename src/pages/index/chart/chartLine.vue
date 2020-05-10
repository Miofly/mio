<template>
	<view class="bg-black" style="width: 100%">
		<scroll-view scroll-x>
			<chart :xData="xDataOne" :yData="yDataOne" backgroundColor="red"></chart>
		</scroll-view>

		<scroll-view scroll-x>
			<chart :xData="xDataTwo" :yData="yDataTwo"></chart>
		</scroll-view>
	</view>
</template>

<script>
	// #ifdef H5
    import chart from 'zj/chart/lineChart'
    export default {
        components: {
            chart
        },
        data() {
            return {
                xDataOne: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                xDataTwo: ['111一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                yDataOne: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                yDataTwo: [113.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            }
        },
    }
	// #endif

</script>
