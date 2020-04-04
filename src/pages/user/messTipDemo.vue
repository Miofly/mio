<template>
    <view class="container bg-white text-center">
        <!--居中消息-->
        <mio-tips position="center" ref="toast"></mio-tips>
        <button class="cu-btn bg-blue"  @tap="showTips">消息提示测试</button>
    </view>
</template>

<script>
    import mioTips from 'cn/modal/messTips'

    export default {
        components: {
            mioTips
        },
        methods: {
            showTips () {
                const options = {
                    msg: '操作成功',
                    duration: 2000,
                    type: 'warning'
                }
                this.$refs.toast.showTips(options)
            },
        }
    }
</script>
