<template>
	<view class="full-width-height bg-white">
		<view class="full-width bg-red text-xl text-center" style="height: 100rpx;line-height: 100rpx;padding: 0!important;">
			<view @click="router.back(0)" class="fa fa-angle-left fa-2x fl margin-left" style="line-height: 100rpx"></view>
			<view >我的点击明细趋势</view>
		</view>
		<view style="overflow-x: scroll!important;border: 1px solid #eee;border-radius: 1rem" class="bg-white padding margin">
			<view class="padding">
				<view class="margin-bottom">
					今日视频总计费次数: {{total_clickOne}}
				</view>
				<highcharts style="width: 1000px;height: 400rpx;overflow-x: scroll!important;" :options="chartOptions"></highcharts>
			</view>
		</view>

		<view style="overflow-x: scroll!important;border: 1px solid #eee;border-radius: 1rem" class="bg-white padding margin">
			<view class="padding">
				<view class="margin-bottom">
					今日视频总计费次数：{{total_clickTwo}}
				</view>
				<highcharts style="width: 1000px;height: 400rpx;overflow-x: scroll!important;" :options="chartOptionTwo"></highcharts>
			</view>
		</view>

	</view>
</template>

<script>
    import {Chart} from 'highcharts-vue'
	import {
	    commonPost
	} from '@/api'
    export default {
        components: {
            highcharts: Chart
        },
		async mounted () {
			const dataOne = await commonPost('/my/member-click-trend')
			const dataTwo = await commonPost('/my/member-seven-click-trend\n')
			this.dataOneList = dataOne.data.list
			this.total_clickOne = dataOne.data.total_click
			this.dataTwoList = dataTwo.data.list
			this.total_clickTwo = dataTwo.data.total_click
			console.log(this.dataOneList)
			console.log(this.dataTwoList)
		},
        data() {
            return {
                dataOneList: [],
                dataTwoList: [],
                dataOneHour: [],
                dataOneClick: [],
                dataTwoHour: [],
                dataTwoClick: [],
                total_clickOne: 0,
                total_clickTwo: 0,
            }
        },
		methods: {
		},
		computed: {
            chartOptions: function () {
                for (let i = 0; i < this.dataOneList.length; i++) {
                    this.dataOneHour.push(this.dataOneList[i].trans_hour)
                    this.dataOneClick.push(this.dataOneList[i].effective_click_total)
                }

				return {
                    chart: {
                        type: 'areaspline',
                        backgroundColor: '#eee', // 背景色通明
                    },
                    title: {
                        text: null // 不展示标题
                    },
                    xAxis: {
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        lineColor: 'transparent', /* x轴线颜色 */
                        tickmarkPlacement: 'on',
                        tickPosition: 'inside',
                        categories: this.dataOneHour,
                        labels: {
                            reserveSpace: true, // 不占用图表内容，坐标轴文字左对齐时使用
                            align: 'center', // 坐标轴文字左对齐 center right
                            rotation: 0, // 坐标轴文字旋转
                            step: 1, /* 间隔刻度 */
                            style: {
                                color: 'black'/* 坐标轴文字颜色 */
                            },
                        },
                        tickInterval: 0, /* 间隔显示 */
                        tickPixelInterval: 30, /* 坐标轴刻度间隔 */
                        tickColor: 'lightblue', /* 刻度线颜色 |小竖条 */
                        visible: true/* 是否显示坐标轴 */
                    },
                    yAxis: {
                        endOnTick: true, /* 强制数据结束于标线,可以使用 */
                        opposite: false, // 对面显示 坐标轴从左边换到右边
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        gridLineColor: 'white', /* 网格线颜色 多个横线=== */
                        // gridLineDashStyle: 'longdash', /* 将网格线变为虚线-- */
                        plotLines: [{ // 设置一个标志线
                            color: 'red',
                            width: 2,
                            value: 1000,
                            zIndex: 5 // 控制层级
                        }],
                        offset: 0, /* y坐标轴文字距离图表的距离 */
                        visible: true/* 是否显示坐标轴 */
                    },
                    tooltip: {
                        crosshairs: true,
                        headerFormat: '<span style="font-size:10px;font-weight: bold">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:black;padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        areaspline: {
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true // 允许数据标签重叠
                            },
                            pointWidth: 30, // 柱子的宽度
                            borderWidth: 0 // 柱子边框
                        }
                    },
                    series: [
                        {
                            marker: {
                                symbol: 'diamond', // 点的类型 square 方形
                                radius: 5, // 点的圆角
                                lineColor: 'white', // 折线图点的边框颜色
                                lineWidth: 2 // 折线图点的边框宽度
                            },
                            data: this.dataOneClick,
                            cursor: 'pointer', // 变换手势
                            lineColor: 'transparent', // 线条颜色
                            enableMouseTracking: true, // 禁用鼠标滑入显示
                            color: 'lightblue', // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            fillOpacity: 1, // 面积图包围背景色通明度
                        }],
                    legend: {
                        enabled: false
					},
                    /* 是否显示版权信息 */credits: {enabled: false},
                    /* 导出功能模块 */exporting: {enabled: false}
                }
            },
            chartOptionTwo: function () {
                for (let i = 0; i < this.dataTwoList.length; i++) {
                    this.dataTwoHour.push(this.dataTwoList[i].stat_date)
                    this.dataTwoClick.push(parseInt(this.dataTwoList[i].effective_click_total))
                }

                console.log(this.dataTwoHour)
                console.log(this.dataTwoClick)

                return {
                    chart: {
                        type: 'areaspline',
                        backgroundColor: '#eee', // 背景色通明
                    },
                    title: {
                        text: null // 不展示标题
                    },
                    xAxis: {
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        lineColor: 'transparent', /* x轴线颜色 */
                        tickmarkPlacement: 'on',
                        tickPosition: 'inside',
                        categories: this.dataTwoHour,
                        labels: {
                            reserveSpace: true, // 不占用图表内容，坐标轴文字左对齐时使用
                            align: 'center', // 坐标轴文字左对齐 center right
                            rotation: 0, // 坐标轴文字旋转
                            step: 1, /* 间隔刻度 */
                            style: {
                                color: 'black'/* 坐标轴文字颜色 */
                            },
                        },
                        tickInterval: 0, /* 间隔显示 */
                        tickPixelInterval: 30, /* 坐标轴刻度间隔 */
                        tickColor: 'lightblue', /* 刻度线颜色 |小竖条 */
                        visible: true/* 是否显示坐标轴 */
                    },
                    yAxis: {
                        endOnTick: true, /* 强制数据结束于标线,可以使用 */
                        opposite: false, // 对面显示 坐标轴从左边换到右边
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        gridLineColor: 'white', /* 网格线颜色 多个横线=== */
                        // gridLineDashStyle: 'longdash', /* 将网格线变为虚线-- */
                        plotLines: [{ // 设置一个标志线
                            color: 'red',
                            width: 2,
                            value: 1000,
                            zIndex: 5 // 控制层级
                        }],
                        offset: 0, /* y坐标轴文字距离图表的距离 */
                        visible: true/* 是否显示坐标轴 */
                    },
                    tooltip: {
                        crosshairs: true,
                        headerFormat: '<span style="font-size:10px;font-weight: bold">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:black;padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        areaspline: {
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true // 允许数据标签重叠
                            },
                            pointWidth: 30, // 柱子的宽度
                            borderWidth: 0 // 柱子边框
                        }
                    },
                    series: [
                        {
                            marker: {
                                symbol: 'diamond', // 点的类型 square 方形
                                radius: 5, // 点的圆角
                                lineColor: 'white', // 折线图点的边框颜色
                                lineWidth: 2 // 折线图点的边框宽度
                            },
                            data: this.dataTwoClick,
                            cursor: 'pointer', // 变换手势
                            lineColor: 'transparent', // 线条颜色
                            enableMouseTracking: true, // 禁用鼠标滑入显示
                            color: 'lightblue', // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            fillOpacity: 1, // 面积图包围背景色通明度
                        }],
                    legend: {
                        enabled: false
                    },
                    /* 是否显示版权信息 */credits: {enabled: false},
                    /* 导出功能模块 */exporting: {enabled: false}
                }
            }
		},

    }
</script>

<style>
	page{
		height: 100%;
		width: 100%;
	}

</style>
