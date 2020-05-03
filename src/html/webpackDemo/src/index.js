import Vue from '../../js/vue.js'
import '@/common/css/main.scss'

var app = new Vue({
    el: '#app',
    data() {
        return {
            num: 1,
            timer: null,
            textImg: ''
        }
    },
})
