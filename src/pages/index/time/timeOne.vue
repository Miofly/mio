<template>
	<view>
		<view class="test">
			<view>日期选择 - 示例</view>
			{{date}}
			<button type="primary" @click="onShowDatePicker('date')">选择日期</button>
			{{time}}
			<button type="primary" @click="onShowDatePicker('time')">选择时间</button>
			{{datetime}}
			<button type="primary" @click="onShowDatePicker('datetime')">选择日期时间</button>
			{{range[0]}} - {{range[1]}}
			<button type="primary" @click="onShowDatePicker('range')">选择日期范围</button>
			{{rangetime[0]}} - {{rangetime[1]}}
			<button type="primary" @click="onShowDatePicker('rangetime')">选择日期时间范围</button>
		</view>
		<datepicker :show="showPicker" type="date" :value="value" :show-tips="true" :begin-text="'入住'"
					:end-text="'离店'"
					:show-seconds="true" @confirm="showPicker = false" @cancel="showPicker = false"/>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                showPicker: false,
                date: '2019/01/01',
                time: '15:00:12',
                datetime: '2019/01/01 15:00:12',
                range: ['2019/01/01', '2019/01/06'],
                rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
                type: 'rangetime',
                value: ''
            }
        },
        methods: {
            onShowDatePicker () {
                this.showPicker = true
            },
        },
    }
</script>


<style>
	.test {
		text-align: center;
		padding: 10px 0;
	}

	button {
		margin: 20 upx;
		font-size: 28 upx;
	}
</style>
