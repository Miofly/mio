<template>
	<view>
		<highcharts :style="{width: width, height: height}" :options="chartOptions"></highcharts>
	</view>
</template>

<script>
    import {Chart} from 'highcharts-vue'

    export default {
        components: {
            highcharts: Chart
        },
        data() {
            return {}
        },
        props: {
            backgroundColor: {
                type: String,
                default: 'transparent',
                required: false
            },
            width: {
                type: String,
                default: '2300rpx',
                required: false
            },
            height: { //
                type: String,
                default: '400rpx',
                required: false
            },
            xData: {
                type: Array,
                default: function () {
                    return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                required: false
            },
            yData: { //
                type: Array,
                default: function () {
                    return [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                },
                required: false
            },
        },
		created () {
		    console.log(Chart)
		},
        computed: {
            chartOptions: function () {
                return {
                    chart: {
                        type: ['areaspline', 'spline', 'line', 'bar', 'column'][0],
                        backgroundColor: this.backgroundColor, // 背景色通明
                        // plotBackgroundImage: '../images/ssybg.jpg' // 背景色用图片代替
                    },
                    title: {
                        text: ['this is my title', null][1],
                        floating: false, // 是否浮动，设置浮动后，标题将不占用图表区位置
                        // margin:130, // 标题和图表区的间隔，当有副标题时，表示标题和副标题之间的间隔
                        style: {color: 'white', fontSize: '18px', fontWeight: 100, fontFamily: 'STKaiti'},
                        x: 10, // 相对于水平、垂直对齐的偏移量
                        y: 10
                    },
                    subtitle: {
                        text: ['this is my title', null][1],
                        style: {color: 'white', fontSize: '18px', fontWeight: 100, fontFamily: 'STKaiti'},
                    },
                    xAxis: {
                        visible: [true, false][0], // 是否显示坐标轴
                        title: {text: ['x轴', null][0]},
                        crosshair: [false, true][0], // 十字准心线 到指定点会出现横线
                        lineColor: ['red', 'transparent'][1], // x轴线颜色
                        alternateGridColor: ['#FDFFD5', 'transparent'][1], // 隔行变色
                        categories: this.xData,
                        labels: { // 坐标轴文字
                            reserveSpace: true, // 不占用图表内容，坐标轴文字左对齐时使用
                            align: ['left', 'center', 'right'][1], // 坐标轴文字对齐
                            rotation: 0, // 坐标轴文字旋转
                            step: 0, // 根据数字分割文字
                            style: {
                                color: 'white' // 坐标轴文字颜色
                            },
                            formatter: function () { // 对坐标轴文字的处理
                                var labelVal = this.value // 获取到刻度值
                                var reallyVal = labelVal // 实际返回的刻度值
                                return reallyVal
                            }
                        },
                        // tickInterval: 0, // 间隔显示与 step 有影响
                        offset: [0, 10, -30][0], // x坐标轴文字距离图表的距离
                        tickColor: ['lightblue', 'transparent'][1], // 刻度线颜色 |小竖条
                        tickWidth: 1, // 刻度线宽度
                        // tickPixelInterval: 0, // 坐标轴刻度间隔
                        gridLineWidth: 1,
                    },
                    yAxis: {
                        visible: [true, false][0], // 是否显示坐标轴
                        title: {text: ['y轴', null][1]},
                        crosshair: [true, false][1], // 十字准心线
                        gridLineWidth: 1,
                        gridLineColor: ['blue', 'transparent'][0], // 网格线颜色 多个横线=== 和左侧坐标轴数据齐等
                        gridLineDashStyle: ['Solid', 'longdash', 'LongDashDot', 'ShortDash', 'ShortDot', 'Dot', 'Dash'][0], // 将网格线变为虚线--
                        labels: {
                            rotation: 0, // 坐标轴文字旋转
                            step: 0, // 显示间隔
                            style: {
                                color: 'white'// 坐标轴文字颜色
                            },
                            formatter: function () {
                                // return this.value + 'k' // 坐标轴数据加单位
                                return '' // 不显示坐标轴文字
                            }
                        },
                        // plotLines: [{color: 'red', width: 2, value: 1, zIndex: 5}], // 设置一个标志线
                        offset: 0, // y坐标轴文字距离图表的距离
                        endOnTick: true, // 强制数据结束于标线,可以使用
                        opposite: false, // 对面显示 坐标轴从左边换到右边
                        // 每个小刻度的线的控制  设置黑色的Y轴次级刻度线
                        // minorGridLineColor: '#C5EEFA',//次网格线的颜色
                        // minorGridLineDashStyle: 'longdash',//次级网格线的风格为长破折号
                        // minorTickInterval: 'auto',//次网格
                        // minorGridLineWidth: 3,
                        // minorTickInterval: 'auto',
                        // minorTickColor: '#ffffff',
                        // minorTickWidth: 1
                    },
                    tooltip: {
                        enabled: [true, false][1], // 是否启用
                        crosshairs: true,
                        headerFormat: '<span style="font-size:10px;font-weight: bold">{point.key}</span><table>', // 自定义提醒内容
                        pointFormat: '<tr><td style="color:black;padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                        formatter: function () { // 自定义提示处理
                            return (this.x + '<br>' + '<span style="font-weight: bold">下载量</span>：' + this.y)
                        }
                    },
                    plotOptions: {
                        areaspline: {
                            dataLabels: {
                                enabled: true, // 是否在图表上显示数据
                                allowOverlap: true // 允许数据标签重叠
                            },
                            pointWidth: 30, // 柱子的宽度
                            borderWidth: 0 // 柱子边框
                        }
                    },
                    series: [
                        {
                            marker: {
                                enabled: [true, false][0], // 不显示图表上的点
                                symbol: ['diamond', 'square'][0], // 点的类型方形
                                radius: 5, // 点的圆角
                                lineColor: 'white', // 折线图点的边框颜色
                                lineWidth: 2 // 折线图点的边框宽度
                            },
                            name: 'name',
                            data: this.yData,
                            cursor: 'pointer', // 变换手势
                            lineColor: 'white', // 线条颜色
                            enableMouseTracking: true, // 禁用鼠标滑入显示
                            color: ['lightblue', 'transparent'][0], // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            fillOpacity: 1, // 面积图包围背景色通明度
                            dashStyle: ['Dot', 'Solid', 'ShortDash', 'ShortDot', 'ShortDashDot',
                                'ShortDashDotDot', 'Dot', 'Dash', 'LongDash', 'DashDot',
                                'LongDashDot', 'LongDashDotDo'][0]
                        }
                    ],
                    legend: { // 图列样式设置
                        enabled: false, // 是否显示图例的名字
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false,
                        itemDistance: 110, // 多个图列名字之间的距离
                        itemHiddenStyle: {color: 'lightblue'}, // 图例隐藏时颜色
                        itemStyle: {color: 'white', fontWeight: 'bold'}, // 图例基本样式
                        itemHoverStyle: {color: 'white'}, // 图例滑入时样式
                    },
                    credits: {enabled: false}, // 是否显示版权信息
                    exporting: {enabled: false} // 导出功能模块
                }
            }
        },
    }
</script>
