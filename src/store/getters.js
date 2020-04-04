/*
包含多个基于state的getter计算属性的对象

1) 包含多个计算属性(get)的对象
2) 谁来读取: 组件中: $store.getters.xxx
    const getters = {
        mmm (state) {
        return ...
        }
    }
*/
export default {
    accessTokenUrl (state) {
        return `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${state.appId}&secret=${state.secret}`
    }
}
