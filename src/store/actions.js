/*
通过mutation间接更新state的多个方法的对象
包含个方法: 触发 mutation 调用, 间接更新 state
一个方法就是一个 action
action 中可以有逻辑代码和异步代码
action 由组件来触发调用: this.$store.dispatch('actionName')

1) 包含多个事件回调函数的对象
2) 通过执行: commit()来触发 mutation 的调用, 间接更新 state
3) 谁来触发: 组件中: $store.dispatch('action 名称', data1) // 'zzz' 4)
   可以包含异步代码(定时器, ajax)
    const actions = {
        zzz ({commit, state}, data1) {
            commit('yyy', {data1})
        }
   }
*/
// import {
//     reqEvents,
// } from '../api'

export default {

}
