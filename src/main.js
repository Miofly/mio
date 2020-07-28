import Vue from 'vue'
import App from './App'
import setting from './pages/setting/home.vue'
import user from './pages/user/home.vue'
import index from './pages/index/home.vue'
import module from './pages/module/home.vue'
import plugin from './pages/plugin/home.vue'

import lz_index from './pages/index/lz/index/index'
import lz_team from './pages/index/lz/index/team'
import lz_user from './pages/index/lz/index/user'
import lz_rank from './pages/index/lz/index/rank'

import dm from './pages/index/movie/dm'
import dy from './pages/index/movie/dy'
import mvIndex from './pages/index/movie/mvIndex'
import lxj from './pages/index/movie/lxj'
import zy from './pages/index/movie/zy'

import '@/common/css/module/font-awesome.css' // font-awesome图标
import store from './store' // 引入vuex
import {RouterMount} from 'uni-simple-router' // 类似vue-router的组件
import routerLink from '../node_modules/uni-simple-router/component/router-link.vue'
import Router from '@/router'
// 两个公用js
import {ui} from '@/common/js/uniapp'
import {tu} from '@/common/js/toolUtils'
// import $ from 'mioJs/utils/zepto.min'

Vue.prototype.ui = ui

Vue.component('index', index)

Vue.prototype.tu = tu
Vue.prototype.router = Router

Vue.component('setting', setting)
Vue.component('user', user)
Vue.component('module', module)
Vue.component('plugin', plugin)
Vue.component('router-link', routerLink)

Vue.component('lz_index', lz_index)
Vue.component('lz_team', lz_team)
Vue.component('lz_user', lz_user)
Vue.component('lz_rank', lz_rank)

Vue.component('dm', dm)
Vue.component('dy', dy)
Vue.component('mvIndex', mvIndex)
Vue.component('lxj', lxj)
Vue.component('zy', zy)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})

// #ifdef H5
RouterMount(app, '#app')
// #endif

// #ifndef H5
app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
