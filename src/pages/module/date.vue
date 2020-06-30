<template>
	<view>

	</view>
</template>

<script>
    import calendar from 'solarday2lunarday'

    export default {
        onLoad() {
            // console.log(calendar.solar2lunar(2020, 5, 1))
            // console.log(calendar.solar2lunar('2020-6-1'))
            // console.log(calendar.solar2lunar('2020-07-1'))
            // 参数类型：第一种：年份（数字或字符串，1901~2099），月份（数字或字符串，1~12），日期（数字或字符串，1~31）
            // 参数类型：第二种：年月日（字符串 ： 2020-05-01 或者 2020-5-1 或 2020/05/01 或 2020/5/1）
            // 参数类型：第三种：数字（1588691866）

            calendar.lunar2solar(2020, 5, 1, false)
            // calendar.lunar2solar(2020, 5, 1, false)
            // 参数类型：阴历年份（数字 范围 1901 ~ 2099），阴历月份（数字），阴历日期（数字），是否闰月
            // 类型说明：因为在阴历中会有闰月之分，因此在查询时，需要指明是否为阴历的闰月，如果当年没有对应的闰月，则会返回当年没有这个闰月的错误信息

            // 获取一年中所有的节日
            calendar.getAllFestival(2020)
            // 参数类型：年份（数字，范围1901 ~ 2099）

            // 查询星座
            calendar.getConstellation(5, 1)

            console.log(calendar.getYearCN(2000))
            // console.log(calendar.lunarYearDays(2001))

            // 查询某年是否为闰年
            calendar.isLeapYear(2020)



            console.log(calendar)
        },
    }
</script>
