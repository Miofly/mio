<template>
	<view>
		<line-progress :percent="percentOne" active-color="lightblue" height="60" percentColor="black"
					   borderStyle="0 solid red"
					   percentSize="15px" :striped="true" :stripedActive="true" inactiveColor="transparent"
					   :showPercent="true">
		</line-progress>
		<!-- this.timer = setInterval(() => { this.percent = this.percent + 10 / 10; if (this.percent == 100) { clearInterval(this.timer) } }, 100) -->
		<line-progress :percent="percentTwo" active-color="lightblue" height="60" percentColor="black" borderStyle="3px solid red"
					   percentSize="15px" :striped="true" :stripedActive="false" inactiveColor="transparent" :showPercent="true">
		</line-progress>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                percentOne: 0,
                percentTwo: 100,
                timerOne: null,
                timerTwo: null
            }
        },
        onLoad() {
            this.timerOne = setInterval(() => {
                this.percentOne = this.percentOne + 10 / 10
                if (this.percentOne == 100) {
                    clearInterval(this.timerOne)
                }
            }, 100)
            this.timerTwo = setInterval(() => {
                this.percentTwo = this.percentTwo - 10 / 10
                if (this.percentTwo == 0) {
                    clearInterval(this.timerTwo)
                }
            }, 100)
        },
    }
</script>
