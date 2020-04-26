import ajax from './ajax'
import axios from 'axios'

const instanceOne = axios.create()
instanceOne.defaults.baseURL = '' // 实例的baseurl


const navJsonData = () => ajax({url: 'static/mockJson/navJson.json'}) // 导航模块数据
const listJsonData = () => ajax({url: 'static/mockJson/listJson.json'}) // 导航模块数据
const dbJsonData = (type, index = 0, count = 3) => ajax({
    sourceAxios: instanceOne,
    // url: `https://movie.douban.com/j/search_subjects?type=movie&tag=${type}&sort=time&page_limit=${count}&page_start=${index}`,
    // url: `https://douban.uieee.com/v2/movie/${type}?start=${index}&count=${count}`,
    url: `/db/j/search_subjects?type=movie&tag=${type}&sort=time&page_limit=${count}&page_start=${index * count}`,
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
    publicGet,
    publicPost,
    commonGet,
    commonPost,
    navJsonData,
    listJsonData,
    dbJsonData,
    movieDetail
}
