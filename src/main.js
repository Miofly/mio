import Vue from 'vue'
import App from './App'

import setting from './pages/setting/home.vue'
import user from './pages/user/home.vue'
import index from './pages/index/home.vue'
import module from './pages/module/home.vue'
import plugin from './pages/plugin/home.vue'
import '@/common/css/module/font-awesome.css' // font-awesome图标
import store from './store' // 引入vuex
import router from './router' // eslint-disable-line
import {RouterMount} from 'uni-simple-router'
import routerLink from '../node_modules/uni-simple-router/component/router-link.vue'
import colorData from './static/mockJson/color'
import {ui} from '@/common/js/uniapp'
import {tu} from '@/common/js/toolUtils'

import MescrollBody from 'cn/load/mescroll-uni/mescroll-body.vue'
import MescrollUni from 'cn/load/mescroll-uni/mescroll-uni.vue'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)


Vue.prototype.ui = ui
Vue.prototype.tu = tu
Vue.component('setting', setting)
Vue.component('user', user)
Vue.component('index', index)
Vue.component('module', module)
Vue.component('plugin', plugin)
Vue.component('router-link', routerLink)

Vue.prototype.ColorList = colorData

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
