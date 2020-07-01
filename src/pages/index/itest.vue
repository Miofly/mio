<template>
	<view>
		<full-page :options="options" ref="fullpage">
			<view class="section">
				first section
			</view>
			<view class="section footerH">
				second section
			</view>
		</full-page>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                options: {// 整屏插件vue-fullpage选项
                    autoScrolling: false
                    // licenseKey: null,
                    // verticalCentered: true, // 定义每一页的内容是否垂直居中
                    // afterLoad: this.afterLoad, // 滚动到某一屏后的回调函数
                    // // scrollOverflow: true,//内容超过满屏后显示滚动条
                    // controlArrows: true, // 是否通过箭头控制slide幻灯片
                    // loopHorizontal: true, // slide幻灯片是否循环滚动
                    // scrollBar: false, // true则是一滚动就是一整屏
                    // onLeave: this.onLeave, // 滚动前的回调函数，
                },
            }
        }
    }
</script>
