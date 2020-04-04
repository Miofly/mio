import Vue from 'vue'

import Router from 'uni-simple-router'

Vue.use(Router)

// 初始化
const router = new Router({
    // mode: 'history', // 去除url中的#号hash
    // routes: [...modules] // 路由表
    routes: ROUTES
})

/*

// 全局前置守卫 确保要调用 next 方法，否则钩子就不会被 resolved。
router.beforeEach((to, from, next) => {
    var username = 'zxx'
    if (username === 'zxx') { // 用户是miofly才进入下一个页面
        console.log('beforeEach全局前置守卫被调用')
        next() // 进行管道中的下一个钩子，必须调用
    } else { // 如果不是回到主页
        // 如果直接写next('/indexs')，会造成死循环（dead loop）
        // 这是因为，执行next('/indexs')这个跳转，会触发beforeEach方法，这时候，就会造成，又执行next('/indexs')  这样的死循环，
        // 所以还要再加一层判断
        if (to.path === '/indexs') {
            next()
        } else {
            next('/indexs')
        }
    }
})

// 全局解析守卫
// 和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to, from, next) => {
    console.log('beforeResolve全局解析守卫被调用')
    next()
})

// 全局后置钩子
// 可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach((to, from) => {
    console.log('afterEach全局后置钩子被调用')
})
*/

export default router
