<template>
	<div>
		<ul class="noticeContent" :class="noticeList.length>1?{notice_top:animate}:''">
			<li v-for="(item, index) in noticeList" :key="index">
				{{item.content}}
			</li>
		</ul>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                noticeList: [
                    {
                        content: '苹果也疯狂！iPhone XR来到小米价，刷新售价底线'
                    },
                    {
                        content: '“5号电池一出”，充电宝没用了，所有手机通用，行千里不关机'
                    },
                    {
                        content: '小米10一出手就高配置，小米9难及十分之一，友商都汗颜'
                    },
                    {
                        content: 'iPhone XR2性能曝光，A13处理器+后置双摄'
                    }
                ],
                animate: false
            }
        },
        created() {
            // 页面显示
            setInterval(this.showNotice, 3000)
        },
        methods: {
            showNotice() {
                this.animate = true
                setTimeout(() => {
                    this.noticeList.push(this.noticeList[0])
                    this.noticeList.shift()
                    this.animate = false
                }, 500)
            }
        }
    }
</script>
<style>
	.noticeContent {
		margin-top: 10px;
		display: block;
		width: 100%;
		height: 20px; // 控制高度以达到控制显示条数的目的 overflow: hidden;
	}

	.notice_top {
		transition: all 0.5s;
		margin-top: -30px;
	}
</style>
