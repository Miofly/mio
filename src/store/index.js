/*
vuex最核心的管理对象store

多组件共享状态的问题
1) 多个视图依赖于同一状态
2) 来自不同视图的行为需要变更同一状态
3) 以前的解决办法
   a. 将数据以及操作数据的行为都定义在父组件
   b. 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
4) vuex 就是用来解决这个问题的

映射 store
import store from './store' new Vue({
    store
})
1.所有用 vuex 管理的组件中都多了一个属性$store, 它就是一个 store 对象
2.属性:
      state: 注册的 state 对象
      getters: 注册的 getters 对象
3.方法:
      dispatch(actionName, data): 分发调用 action

组件中
import {mapState, mapGetters, mapActions} from 'vuex' export default {
    computed: {
        ...mapState(['xxx']),
        ...mapGetters(['mmm']),
    },
    methods: {
       mapActions(['zzz'])
    },
}
{{xxx}} {{mmm}} @click="zzz(data)"
*/
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
