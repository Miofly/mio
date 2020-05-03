export function randomNum(min, max) { // 生成随机数 min<=num<=max
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export function makeRandomArr(arrList, num) { // 随机取出数组元素
    if (num > arrList.length) {
        num = arrList.length
    }
    const tempArr = arrList.slice(0)
    const newArrList = []
    for (var i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * (tempArr.length - 1))
        const arr = tempArr[random]
        tempArr.splice(random, 1)
        newArrList.push(arr)
    }
    return newArrList
}
