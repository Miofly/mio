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
                        type: ['pie', 'spline', 'areaspline', 'bar', 'column'][0],
                        backgroundColor: ['transparent', 'white'][0],
                        // plotBackgroundImage: '../images/ssybg.jpg'/*背景色用图片代替*/
                    },
                    title: {
                        // text:  // 不展示标题
                        text: [null, '这是标题'][0],
                        align: ['left', 'center', 'right'][1],
                        floating: false, /* 是否浮动，设置浮动后，标题将不占用图表区位置*/
                        // margin:130,/*标题和图表区的间隔，当有副标题时，表示标题和副标题之间的间隔*/
                        style: {color: 'lightblue', fontSize: '12px', fontWeight: 600, fontFamily: 'YouYuan'},
                        x: 10,
                        y: 10/* 相对于水平、垂直对齐的偏移量*/
                    },
                    subtitle: { // 和title使用方法一致
                        text: null // 不展示标题
                        /* text: 'Source: WorldClimate.com',
						style:{color: 'red',fontSize: '13px',fontWeight:600},*/
                    },
                    xAxis: {
                        title: {text: null},
                        crosshair: true, // 十字准心线
                        lineColor: 'transparent', // x轴线颜色
                        // alternateGridColor: '#FDFFD5', // 隔行变色
                        categories: ['胡22歌', '林心..如', '维11维信息', '二代证符号1a[]', '测..试[专用]', '测试字符数特殊..符号', '胡22歌', '林心..如', '维11维信息', '二代证符号1a[]', '测..试[专用]', '测试字符数特殊..符号'],
                        labels: {
                            reserveSpace: true, // 不占用图表内容，坐标轴文字左对齐时使用
                            align: ['left', 'center', 'right'][0],
                            rotation: 0, // 坐标轴文字旋转
                            step: 3, // 每间隔三个展示一个
                            style: {
                                color: 'rgba(0, 0, 0, 1)'/* 坐标轴文字颜色*/
                            },
                            // formatter: function () {
                            //     // 对坐标轴文字的处理
                            //     // 获取到刻度值
                            //     var labelVal = this.value
                            //     // 实际返回的刻度值
                            //     var reallyVal = labelVal
                            //     // 判断刻度值的长度
                            //     if (strlength(labelVal) > 15) {
                            //         // 截取刻度值
                            //         reallyVal = labelVal.substr(0, 2) + '...'
                            //         // reallyVal = labelVal.substr(0,8)+"<br/>"+labelVal.substring(3,labelVal.length-1);
                            //     }
                            //     return reallyVal
                            // },
                        },
                        tickInterval: 1, /* 间隔显示*/
                        tickPixelInterval: 10, /* 坐标轴刻度间隔*/
                        // offset: 0, /*x坐标轴文字距离图表的距离*/
                        tickColor: 'transparent', /* 刻度线颜色 |小竖条*/
                        visible: true/* 是否显示坐标轴*/
                    },
                    yAxis: {
                        endOnTick: false, /* 强制数据结束于标线*/
                        opposite: false, // 对面显示 坐标轴从左边换到右边
                        title: {text: null},
                        crosshair: true, /* 十字准心线*/
                        gridLineColor: 'transparent', /* 网格线颜色 多个横线===*/
                        // gridLineDashStyle: 'longdash', /*将网格线变为虚线--*/
                        labels: {
                            rotation: 45, // 坐标轴文字旋转
                            step: 1, /* 显示间隔*/
                            style: {
                                color: 'rgba(0, 0, 0, 1)'/* 坐标轴文字颜色*/
                            },
                            formatter: function () {
                                return this.value /* + 'k'*/
                            }
                        },
                        // offset: 151, /*y坐标轴文字距离图表的距离*/
                        visible: true, /* 是否显示坐标轴*/
                        /* 每个小刻度的线的控制  设置黑色的Y轴次级刻度线*/
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
                        shared: true,
                        formatter: function () {
                            return (this.x + '<br>' + '<span style="font-weight: bold">下载量</span>：' + this.y)
                        }
                        /* formatter: function () {
							// console.log();
							// console.log(this.points.series.points);
							return('['+dataType[this.points[0].point.index]+']'+this.x+'<br>'+'<span style="font-weight: bold">下载量</span>：'+this.y);
						}*/
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true, // 允许数据标签重叠
                            },
                            pointWidth: 13, // 柱子的宽度
                        },
                    },
                    series: [
                        {
                            // name: name,
                            cursor: 'pointer', // 变换手势
                            marker: {
                                // enabled: false, // 不显示图表上的点
                                symbol: 'diamond', // 点的类型 square
                                radius: 5, // 点的圆角
                                lineColor: 'white', // 折线图点的边框颜色
                                lineWidth: 2, // 折线图点的边框宽度
                            },
                            enableMouseTracking: true, // 禁用鼠标滑入显示
                            color: 'lightblue', // 线条颜色 或者面积图包围背景色 柱状图柱子色 ,折线图点的背景色
                            lineColor: 'white', // 线条颜色
                            fillOpacity: 0.3, // 面积图包围背景色通明度
                            dashStyle: 'Solid',
                            /* 线条样式Solid ShortDash   ShortDot  ShortDashDot  ShortDashDotDot Dot Dash
							LongDash    DashDot LongDashDot LongDashDotDo*/
                            data: [3.7, 5.2, 4.7, 6.5, 19, 12.2, 1.0, 5.6, 4.2, 3.3, 6.6, 4.8]
                        }
                    ],
                    legend: { // 关闭图例series的name
                        enabled: true,
                        itemDistance: 100, // 多个图列名字之间的距离
                        itemHiddenStyle: {color: 'lightblue'}, // 图例隐藏时颜色
                        itemStyle: {color: 'white', fontWeight: 'bold'}, // 图例基本样式
                        itemHoverStyle: {color: 'white'}, // 图例滑入时样式
                        // floating: true,x: 90,y: 60,
                    },
                    credits: {enabled: false}, // 是否显示版权信息
                    exporting: {enabled: false}, // 导出功能模块
                }
            }
        }

    }
</script>

<style>

</style>
