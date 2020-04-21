<template>
    <view class="container padding bg-white">
        <!--<text>{{dateUtils.beforeWeekFirst}}</text>-->
        <view class="flex flex-direction">
            <button class="round cu-btn line-blue margin-top" @click='show'>一般弹框</button>
            <button class="round cu-btn line-blue margin-top" @click='show2'>提示文本样式</button>
            <button class="round cu-btn line-blue margin-top" @click='show3'>单个按钮</button>
            <button class="round cu-btn line-blue margin-top" @click="show4">多个按钮</button>
            <button class="round cu-btn line-blue margin-top" @click="show5">圆角按钮</button>
            <button class="round cu-btn line-blue margin-top" @click="show6">按钮颜色</button>
            <button class="round cu-btn line-blue margin-top" @click="show7">遮罩不可点</button>
            <button class="round cu-btn line-blue margin-top" @click="show8">自定义弹窗内容</button>
        </view>

        <modal :show="modal" @click="handleClick" @cancel="hide" title="提示" content="确定退出登录吗？"></modal>

        <modal :show="modal2" @click="handleClick2" @cancel="hide2" content="确定退出登录吗？" color="blue" :size="32"></modal>

        <modal :show="modal3" @click="handleClick3" @cancel="hide3" content="您还未登录，请先登录" :button="button3"></modal>

        <modal :show="modal4" @click="handleClick4" @cancel="hide4" content="请选择支付方式" :button="button4"></modal>

        <modal :show="modal5" @click="handleClick5" @cancel="hide5" content="确定退出登录吗？" color="#333" :size="32" shape="circle"></modal>

        <modal :show="modal6" @click="handleClick6" @cancel="hide6" content="确定退出登录吗？" color="#333" :size="32" :button="button6"></modal>

        <modal :show="modal7" @click="handleClick7" @cancel="hide7" content="您还未登录，请先登录" :button="button3" :maskClosable="false"></modal>

        <modal :show="modal8" @cancel="hide8" :custom="true">
            <view class="mio-modal-custom">
                <image src="http://img2.imgtn.bdimg.com/it/u=1344996754,553300684&fm=26&gp=0.jpg" class="mio-tips-img"></image>
                <view class="mio-modal-custom-text">我是自定内容</view>
                <button class="cu-btn bg-blue block round">常用大按钮</button>
            </view>
        </modal>

		<!--test (e) {if (e.index == 0) {console.log('点击了第一个按钮')}if (e.index == 1) {console.log('点击了第二个按钮')}}-->
		<modal title="标题111" content="这是内容" @click="test" color="#999" :size="32" :maskClosable="false"
				:show="status" @cancel="status = false" shape="['circle', 'square'][1]"
				:button="[{text: '微信', type: ['green', 'default', 'primary', 'red', 'danger', 'warning', 'white', 'gray'][5], plain: true},
				{text: '支付宝', plain: false}]" :custom="true">
			<view class="fa fa-close" style="position: absolute; top:20px;right: 20px" @tap="status = false"></view>
		</modal>
    </view>
</template>

<script>
    import {ui} from 'mioJs/uniapp'

    export default {
        data () {
            return {
                status: true,
                modal: false,
                modal2: false,
                modal3: false,
                button3: [{
                    text: '确定',
                    type: 'red'
                }],
                modal4: false,
                button4: [{
                    text: '微信',
                    type: 'green',
                    plain: true
                }, {
                    text: '支付宝',
                    plain: true
                }, {
                    text: '银行卡',
                    type: 'red',
                    plain: true
                }],
                modal5: false,
                modal6: false,
                button6: [{
                    text: '取消',
                    type: 'gray'
                }, {
                    text: '确定'
                }],
                modal7: false,
                modal8: false,
                modal9: false,
                email: ''
            }
        },
        methods: {
            show () {
                this.modal = true
            },
            show2 () {
                this.modal2 = true
            },
            show3 () {
                this.modal3 = true
            },
            show4 () {
                this.modal4 = true
            },
            show5 () {
                this.modal5 = true
            },
            show6 () {
                this.modal6 = true
            },
            show7 () {
                this.modal7 = true
            },
            show8 () {
                this.modal8 = true
            },
            hide () {
                this.modal = false
            },
            hide2 () {
                this.modal2 = false
            },
            hide3 () {
                this.modal3 = false
            },
            hide4 () {
                this.modal4 = false
            },
            hide5 () {
                this.modal5 = false
            },
            hide6 () {
                this.modal6 = false
            },
            hide7 () {
                this.modal7 = false
            },
            hide8 () {
                this.modal8 = false
            },
            handleClick (e) {
                const index = e.index
                if (index === 0) {
                    ui.showToast('你点击了取消按钮')
                } else {
                    ui.showToast('你点击了确定按钮', 'success')
                    this.ui.showToast('复制成功')
                }
                // this.hide()
            },
            handleClick2 (e) {
                const index = e.index
                if (index === 0) {
                    ui.showToast('你点击了取消按钮')
                } else {
                    ui.showToast('')
                }
                this.hide2()
            },
            handleClick3 (e) {
                const index = e.index
                if (index === 0) {
                    ui.showToast('你点击了确定按钮')
                }
                this.hide3()
            },
            handleClick4 (e) {
                const index = e.index
                ui.showToast('你点击的按钮index：' + index)
                this.hide4()
            },
            handleClick5 (e) {
                const index = e.index
                ui.showToast('你点击的按钮index：' + index)
                this.hide5()
            },
            handleClick6 (e) {
                const index = e.index
                ui.showToast('你点击的按钮index：' + index)
                this.hide6()
            },
            handleClick7 (e) {
                const index = e.index
                ui.showToast('你点击的按钮index：' + index)
                this.hide7()
            },
            handleClick8 () {
                ui.showToast('你点击了自定义按钮')
                this.hide8()
            },
        }
    }
</script>
