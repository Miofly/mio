import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl
instanceOne.defaults.withCredentials = false // 实例的baseurl


const goodGirlData = (type = 'Android', pageNum, pageSize) => ajax({
    sourceAxios: instanceOne,
    url: `https://gank.io/api/v2/data/category/GanHuo/type/${type}/page/${pageNum}/count/${pageSize}`,
    getHeader: {
        'Content-Type': 'json'
    }
})

const navJsonData = () => ajax({url: 'static/mockJson/navJson.json'}) // 导航模块数据
const listJsonData = () => ajax({url: 'static/mockJson/listJson.json'}) // 导航模块数据
const dbJsonData = (type, index = 0, count = 3) => ajax({
    sourceAxios: instanceOne,
    // #ifdef MP-WEIXIN
    url: `https://movie.douban.com/j/search_subjects?type=movie&tag=${type}&sort=time&page_limit=${count}&page_start=${index}`,
    // #endif
    // #ifdef H5
    url: `/db/j/search_subjects?type=movie&tag=${type}&sort=time&page_limit=${count}&page_start=${index * count}`,
    // #endif
    // cancelBefore: true,
    getHeader: {
        'Content-Type': 'json'
    }
})
const movieDetail = (url) => ajax({
    url: url,
    getHeader: {'Content-Type': 'json'}
})

const publicPost = (url, data) => ajax({
    // sourceAxios: instanceOne,
    url: url,
    method: 'POST',
    data: data,
})

const publicGet = (url) => ajax({
    sourceAxios: instanceOne,
    url: url,
    getHeader: {
        'Content-Type': 'json'
    }
})

const commonPost = (url, data) => ajax({
    // sourceAxios: instanceOne,
    url: '/lz' + url,
    method: 'POST',
    data: data,
    getHeader: {
        'Content-Type': 'multipart/form-data'
    }
})

const commonGet = (url) => ajax({
    url: '/wx' + url,
    getHeader: {
        'Content-Type': 'json'
    }
})



export {
    goodGirlData,
    publicGet,
    publicPost,
    commonGet,
    commonPost,
    navJsonData,
    listJsonData,
    dbJsonData,
    movieDetail
}
