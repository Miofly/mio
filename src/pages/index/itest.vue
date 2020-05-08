<template>
	<vue-qr :text="downloadData.url" :margin="0"
			:logoSrc="downloadData.icon" :logoScale="0.3" :size="200"></vue-qr>
</template>

<script>
    import vueQr from 'vue-qr'

    export default {
        components: {
            vueQr
        },
        data() {
            return {
                downloadData: {
                    url: 'http://www.baidu.com',
                    icon: 'static/images/lz/hbg.jpg'
                }
            }
        }
    }
</script>
