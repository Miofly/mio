<template>
	<view>

	</view>
</template>

<script>
    import {dateUtils} from 'mioJs/dateUtils'
    export default {
        onLoad() {
            console.log(dateUtils.timeFun({ymrSign: true})) // 年月日有符号 2020-07-01
            console.log(dateUtils.getAllFestival()) // 查询节日
            console.log(dateUtils.getYearCN()) // 星座
            console.log(dateUtils.getConstellation()) // 查询某年是否为闰年
            console.log(dateUtils.isLeapYear()) // 年份转化成中文
            console.log(dateUtils.solar2lunar()) // 年份转化成中文
        },
    }
</script>
