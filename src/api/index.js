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
export {
    navJsonData,
    listJsonData,
    dbJsonData,
    movieDetail
}
