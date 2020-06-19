<template>
	<view class="navTabBox" :style="{width: fullWidth}">
		<view class="longTab">
			<scroll-view scroll-x="true" style="white-space: nowrap; display: flex" scroll-with-animation
						 :scroll-left="tabLeft">
				<view class="longItem" :style='"width:"+isWidth+"px"' :data-index="index"
					  :class="index===myTab?'click':''"
					  v-for="(item,index) in tabLists" :key="index" :id="'id'+index" @click="longClick(index)">
					{{item.name}}
				</view>
				<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
					<view class="underline"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
    export default {
        props: {
            tabLists: {
                type: Array,
                default: []
            },
            tabClick: { //
                type: Number,
                default: 0, // 导航栏被点击
                required: false
            },
            fullWidth: { // 宽度是否100%
                type: String,
                default: '94vw',
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
            uni.getSystemInfo({
                success(e) {
                    if (that.tabLists.length <= 5) {
                        that.isWidth = e.windowWidth / that.tabLists.length // 宽度除以导航标题个数=一个导航所占宽度
                    } else {
                        that.isWidth = e.windowWidth / 5
                    }
                }
            })
        },
        methods: {
            // 导航栏点击
            longClick(index) {
                console.log(index)
                if (this.tabLists.length > 5) {
                    var tempIndex = index - 2
                    tempIndex = tempIndex <= 0 ? 0 : tempIndex
                    this.tabLeft = (index - 2) * this.isWidth // 设置下划线位置
                }
                this.myTab = index // 设置导航点击了哪一个
                this.isLeft = index * this.isWidth // 设置下划线位置
                this.$emit('input', index)
                this.$emit('change', index)// 设置swiper的第几页
            }
        }
    }
</script>

<style>
	.navTabBox {
		color: black;
		background: rgba(255, 255, 255, 1);
	}

	.click {
		color: red;
	}

	.longTab {
		width: 100%;
	}

	.longItem {
		height: 90rpx;
		display: inline-block;
		line-height: 90rpx;
		text-align: center;
		font-size: 14px;
	}

	.underlineBox {
		height: 3px;
		width: 20%;
		display: flex;
		align-content: center;
		justify-content: center;
		transition: .5s;
	}

	.underline {
		width: 60%;
		height: 4px;
		background-color: red;
	}
</style>
