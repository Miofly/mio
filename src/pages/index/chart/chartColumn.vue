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
                        type: 'column',
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
                        type: 'category',
                        title: {text: null},
                        crosshair: true, /* 十字准心线 */
                        lineColor: 'transparent', /* x轴线颜色 */
                        // lineColor: 'red', /*x轴线颜色*/
                        // alternateGridColor: '#FDFFD5', // 隔行变色
                        /* 数据 */
                        // categories: ['胡22歌', '林心..如', '维11维信息', '二代证符号1a[]', '测..试[专用]', '测试字符数特殊..符号','胡22歌', '林心..如', '维11维信息', '二代证符号1a[]', '测..试[专用]', '测试字符数特殊..符号'],
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
                        offset: 0, /* y坐标轴文字距离图表的距离 */
                        visible: true, /* 是否显示坐标轴 */
                        plotLines: [{ // 设置一个标志线
                            color: 'red',
                            width: 2,
                            value: 10,
                            zIndex: 5 // 控制层级
                        }]
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
                        // series: { // 点击每一个柱子的数据
                        //     events: {
                        //         click: function (e) {
                        //             console.log(this.data[e.point.x])
                        //         }
                        //     },
                        // }
                    },
                    series: [
                        {
                            name: '2131',
                            colorByPoint: true, // 随机颜色
                            // data: [3.7, 5.2, 4.7, 6.5, 19, 12.2, 1.0, 5.6, 4.2, 3.3, 6.6, 4.8],
                            // color:'red', // 状图柱子色
                            // cursor:'pointer', // 变换手势
                            // lineColor: 'black', // 线条颜色
                            data: [{
                                name: 'Microsoft Internet Explorer',
                                y: 56.33
                            }, {
                                name: 'Chrome',
                                y: 24.03
                            }, {
                                name: 'Firefox',
                                y: 10.38
                            }, {
                                name: 'Safari',
                                y: 4.77
                            }, {
                                name: 'Opera',
                                y: 0.91
                            }, {
                                name: 'Proprietary or Undetectable',
                                y: 0.2
                            }]
                        }

                    ],
                    /* 关闭图例series的name */
                    legend: {
                        enabled: true,
                        itemDistance: 110, /* 多个图列名字之间的距离 */
                        itemHiddenStyle: {color: 'lightblue'}, /* 图例隐藏时颜色 */
                        itemStyle: {color: 'white', fontWeight: 'bold'}, /* 图例基本样式 */
                        itemHoverStyle: {color: 'white'} /* 图例滑入时样式 */
                        // floating: true,x: 90,y: 60,
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
