export default {
    // 数字不满10补0
    addZero (str) {
        let num
        str >= 10 ? num = str : num = `0${str}`
        return num
    }
}
