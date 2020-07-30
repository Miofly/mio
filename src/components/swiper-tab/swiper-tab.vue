<template>
	<view class="navTabBox" :style="{width: fullWidth, color: defaultColor}">
		<view class="longTab">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation
						 :scroll-left="tabLeft">
				<view class="longItem" :data-index="index"
					  :style="{color: index===myTab ? activeColor : '', width: isWidth + 'px', fontSize: index===myTab ? activeSize : textSize,
					  height: tabHeight + 'rpx', lineHeight: tabHeight + 'rpx', fontWeight: isBold}"
					  v-for="(item,index) in tabLists" :key="index" :id="'id'+index" @click="longClick(index)">
					{{item.name}}
				</view>
				<view class="underlineBox"
					  :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px;height:"+underLineHeight+"rpx"'>
					<view class="underline" :style="{background: lineColor, width: underLineWidth}"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
    export default {
        props: {
            defaultColor: { // 默认文字颜色
                type: String,
                default: 'blue',
                required: false
            },
            isBold: { // 字体加粗
                type: String,
                default: 'bold',
                required: false
            },
            tabHeight: { // tab栏高度
                type: Number,
                default: 90,
                required: false
            },
            textSize: { // 文字大小
                type: String,
                default: '14px',
                required: false
            },
            activeColor: { // 选中颜色
                type: String,
                default: 'red',
                required: false
            },
            activeSize: { // 选中文字大小
                type: String,
                default: '20px',
                required: false
            },
            tabLists: { // tab栏数据
                type: Array,
                default: function () {
                    return []
                },
                required: false
            },
            tabClick: { // 当前被点击的导航
                type: Number,
                default: 0, // 导航栏被点击
                required: false
            },
            fullWidth: { // 宽度是否100%
                type: String,
                default: '94vw',
                required: false
            },
            underLineHeight: { // 下划线高度
                type: Number,
                default: 6,
                required: false
            },
            underLineWidth: { // 下划线宽度
                type: String,
                default: '20%',
                required: false
            },
            lineColor: { // 下划线颜色
                type: String,
                default: 'green',
                required: false
            },
        },
        data() {
            return {
                isLeft: 0, // 导航栏下划线位置
                isWidth: 0, // 每个导航栏占位
                tabLeft: 0,
                myTab: 0
            }
        },
        created() {
            this.myTab = this.tabClick
            var that = this
            // 获取设备宽度
            uni.getSystemInfo({ // 用于控制每个tab的宽度
                success(e) {
                    if (that.tabLists.length <= 5) {
                        that.isWidth = e.windowWidth / that.tabLists.length // 宽度除以导航标题个数=一个导航所占宽度
                    } else {
                        // that.isWidth = e.windowWidth / 4
                        that.isWidth = e.windowWidth / 5.5
                    }
                }
            })
        },
        methods: {
            longClick(index) { // 导航栏被点击事件
                if (this.tabLists.length > 5) {
                    this.tabLeft = (index - 2) * this.isWidth // 设置下划线位置
                }
                this.myTab = index // 设置导航点击了哪一个
                this.isLeft = index * this.isWidth // 设置下划线位置
                this.$emit('input', index)
                this.$emit('change', index) // 设置swiper的第几页
            }
        }
    }
</script>

<style>
	.navTabBox {
		background: rgba(255, 255, 255, 1);
	}

	.longTab {
		width: 100%;
	}

	.longItem {
		display: inline-block;
		text-align: center;
	}

	.underlineBox {
		display: flex;
		align-content: center;
		justify-content: center;
		transition: .5s;
	}
</style>
