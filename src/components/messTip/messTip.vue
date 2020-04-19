<template>
	<view v-if="position=='top'">
		<view class='mio-tips-class mio-toptips'
              :class="['mio-'+type,show?'mio-top-show':'']">
            {{msg}}
        </view>
	</view>
	<view v-else>
		<view class='mio-tips-class mio-toast'
              :class="[position=='center'?'mio-centertips':'mio-bottomtips',show?'mio-toast-show':'']">
			<view class="mio-tips-content" :class="['mio-'+type]">
				{{msg}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'mioTips',
		props: {
			// top bottom center
			position: {
				type: String,
				default: 'top'
			}
		},
		data () {
			return {
				timer: null,
				show: false,
				msg: '无法连接到服务器~',
				// translucent,primary,green,warning,danger
				type: 'translucent'
			}
		},
		methods: {
			showTips (options) {
				const {
					type = 'translucent',
						duration = 2000
				} = options
				clearTimeout(this.timer)
				this.show = true
				// this.duration = duration < 2000 ? 2000 : duration;
				this.type = type
				this.msg = options.msg
				this.timer = setTimeout(() => {
					this.show = false
					clearTimeout(this.timer)
					this.timer = null
				}, duration)
			}
		}
	}
</script>
