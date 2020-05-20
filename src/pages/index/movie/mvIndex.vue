<template>
	<view style="height: 100%">
		1111
	</view>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                PageCur: 'mv_Index'
            }
        },
        onLoad() {
            console.log('onLoad：页面加载完成')
            this.PageCur = 'mvIndex'
        },
        onUnload() {
            console.log('onUnload：页面卸载')
        },
        onShow() {
            console.log('onShow：页面显示')
        },
        onHide() {
            console.log('onHide：页面隐藏')
        },
        onReady() {
            console.log('onReady：页面初次渲染完成')
        },
        onResize() {
            console.log('onResize：页面尺寸发生变化')
        },
        onBackPress() {
            console.log('onBackPress：页面返回')
        },
        methods: {
            NavChange(e) {
                this.PageCur = e.currentTarget.dataset.cur
            }
        },
        computed: {
            ...mapState(['indexData', 'indexPage']),
        },
    }
</script>
