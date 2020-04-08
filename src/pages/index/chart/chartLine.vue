<template>
	<view>
		<highcharts :options="chartOptions"></highcharts>

	</view>
</template>

<script>
    import {Chart} from 'highcharts-vue'

    export default {
        components: {
            highcharts: Chart
        },
        data() {
            return {
                chartOptions: {
                    chart: {
                        type: 'areaspline',
                        // spline  折线图  areaspline  面积折线图 bar 横柱状图 column 竖向柱状图
                        // backgroundColor: 'rgba(0,0,0,1)',
                        backgroundColor: 'transparent' // 背景色通明
                        // plotBackgroundImage: '../images/ssybg.jpg'/*背景色用图片代替*/
                    },
                    title: {
                        // text: null // 不展示标题
                        text: 'this is my title',
                        floating: false, /* 是否浮动，设置浮动后，标题将不占用图表区位置 */
                        // margin:130,/*标题和图表区的间隔，当有副标题时，表示标题和副标题之间的间隔*/
                        style: {color: 'white', fontSize: '18px', fontWeight: 100, fontFamily: 'STKaiti'},
                        x: 10,
                        y: 10/* 相对于水平、垂直对齐的偏移量 */
                    },
                    subtitle: {
                        // text: null, // 不展示标题
                        text: '这是副标题',
                        style: {color: 'white', fontSize: '14px', fontWeight: 'normal', fontFamily: 'Times New Roman'}
                        /* text: 'Source: WorldClimate.com',
						style:{color: 'red',fontSize: '13px',fontWeight:600}, */
                    },
                    xAxis: {
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        lineColor: 'transparent', /* x轴线颜色 */
                        // lineColor: 'red', /*x轴线颜色*/
                        // alternateGridColor: '#FDFFD5', // 隔行变色
                        /* 数据 */
                        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        labels: {
                            reserveSpace: true, // 不占用图表内容，坐标轴文字左对齐时使用
                            align: 'center', // 坐标轴文字左对齐 center right
                            rotation: 0, // 坐标轴文字旋转
                            step: 1, /* 间隔刻度 */
                            style: {
                                color: 'white'/* 坐标轴文字颜色 */
                            },
                            formatter: function () {
                                // 对坐标轴文字的处理
                                // 获取到刻度值
                                var labelVal = this.value
                                // 实际返回的刻度值
                                var reallyVal = labelVal
                                // 判断刻度值的长度
                                // if(strlength(labelVal) > 15){
                                //     //截取刻度值
                                //     reallyVal = labelVal.substr(0,2)+'...'
                                //     // reallyVal = labelVal.substr(0,8)+"<br/>"+labelVal.substring(3,labelVal.length-1);
                                // }
                                return reallyVal
                            }
                        },

                        tickInterval: 0, /* 间隔显示 */
                        tickPixelInterval: 0, /* 坐标轴刻度间隔 */
                        // offset: 0, /*x坐标轴文字距离图表的距离*/
                        // tickColor: 'transparent', /*刻度线颜色 |小竖条*/
                        tickColor: 'lightblue', /* 刻度线颜色 |小竖条 */
                        visible: true/* 是否显示坐标轴 */
                    },
                    yAxis: {
                        endOnTick: true, /* 强制数据结束于标线,可以使用 */
                        opposite: false, // 对面显示 坐标轴从左边换到右边
                        title: {text: '我是左侧坐标轴'},
                        crosshair: true, /* 十字准心线 */
                        gridLineColor: 'transparent', /* 网格线颜色 多个横线=== */
                        // gridLineColor: 'red',/*网格线颜色 多个横线=== 和左侧坐标轴数据齐等*/
                        gridLineDashStyle: 'longdash', /* 将网格线变为虚线-- */
                        labels: {
                            rotation: 0, // 坐标轴文字旋转
                            step: 1, /* 显示间隔 */
                            style: {
                                color: 'white'/* 坐标轴文字颜色 */
                            },
                            formatter: function () {
                                return this.value + 'k' /* 坐标轴数据加单位 */
                            }
                        },
                        plotLines: [{ // 设置一个标志线
                            color: 'red',
                            width: 2,
                            value: 1000,
                            zIndex: 5 // 控制层级
                        }],
                        offset: 0, /* y坐标轴文字距离图表的距离 */
                        visible: true/* 是否显示坐标轴 */
                        /* 每个小刻度的线的控制  设置黑色的Y轴次级刻度线 */
                        // minorGridLineColor: '#C5EEFA',/*次网格线的颜色*/
                        // minorGridLineDashStyle: 'longdash',/*次级网格线的风格为长破折号*/
                        // minorTickInterval: 'auto',/*次网格*/
                        //  minorGridLineWidth: 3,
                        //  minorTickInterval: 'auto',
                        //  minorTickColor: '#ffffff',
                        //  minorTickWidth: 1
                    },
                    tooltip: {
                        crosshairs: true,
                        // head + 每个 point + footer 拼接成完整的 table
                        // 自定义提醒内容
                        headerFormat: '<span style="font-size:10px;font-weight: bold">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:black;padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                        // formatter: function () {
                        //     return(this.x+'<br>'+'<span style="font-weight: bold">下载量</span>：'+this.y);
                        // }
                        /* formatter: function () {
							// console.log();
							// console.log(this.points.series.points);
							return('['+dataType[this.points[0].point.index]+']'+this.x+'<br>'+'<span style="font-weight: bold">下载量</span>：'+this.y);
						} */
                    },
                    plotOptions: {
                        column: {
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
                                // enabled: false, // 不显示图表上的点
                                symbol: 'diamond', // 点的类型 square 方形
                                radius: 5, // 点的圆角
                                lineColor: 'white', // 折线图点的边框颜色
                                lineWidth: 2 // 折线图点的边框宽度
                            },
                            name: '东京',
                            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                            cursor: 'pointer', // 变换手势
                            lineColor: 'white', // 线条颜色
                            enableMouseTracking: true, // 禁用鼠标滑入显示
                            color: 'purple', // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            fillOpacity: 1, // 面积图包围背景色通明度
                            dashStyle: 'Dot'
                            /* 线条样式Solid ShortDash   ShortDot  ShortDashDot  ShortDashDotDot Dot Dash
							LongDash    DashDot LongDashDot LongDashDotDo */
                        }, {
                            marker: {
                                enabled: false // 不显示图表上的点
                            },
                            name: '伦敦',
                            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
                            cursor: 'pointer', // 变换手势
                            lineColor: 'red', // 线条颜色
                            color: 'green', // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            fillOpacity: 0.3 // 面积图包围背景色通明度

                        }],
                    /* 关闭图例series的name */
                    // legend: {
                    //     // enabled: true,
                    //     // itemDistance: 110,/*多个图列名字之间的距离*/
                    //     // itemHiddenStyle: {color: 'lightblue'}, /*图例隐藏时颜色*/
                    //     // itemStyle: {color: 'white', fontWeight: 'bold'}, /*图例基本样式*/
                    //     // itemHoverStyle: {color: 'white'}, /*图例滑入时样式*/
                    //     // floating: true,x: 90,y: 60,
                    // },
                    legend: { // 图列样式设置
                        align: 'right',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    /* 是否显示版权信息 */credits: {enabled: false},
                    /* 导出功能模块 */exporting: {enabled: false}
                }
            }
        }

    }
</script>

<style>

</style>
