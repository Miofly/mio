import root from './root'

const DAY_TIME = 86400000 // 一天的时间

const dateShift = (time) => new Date(new Date().getTime() - time * DAY_TIME) // 控制时间在多少天前/后

const monthDayShift = (monthNum, dayNum) => new Date(
        new Date(
            new Date().setMonth(
                new Date().getMonth() - monthNum
            )
        ).setDate(dayNum)
    ) // 控制月/日

const today = dateShift(0) // 今天
const yesterdayTime = dateShift(1) // 昨天
const beforeYesterdayTime = dateShift(2) // 前天
const beforeSevenDays = dateShift(7) // 七天前
const beforeThirtyDays = dateShift(30) // 三十天前
const tomorrowTime = dateShift(-1) // 昨天
const afterTomorrowTime = dateShift(-2) // 前天
const afterSevenDay = dateShift(-7) // 七天前
const afterThirtyDays = dateShift(-30) // 三十天前

const beforeWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) - 6) // 上周第一天
const thisWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 1) // 本周第一天
const afterWeekFirstDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 8) // 下周第一天

const beforeWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7)) // 上周最后一天
const thisWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 7) // 本周最后一天
const afterWeekLastDay = monthDayShift(0, new Date().getDate() - (new Date().getDay() || 7) + 14) // 下周最后一天

const beforeHalfYearFirstDay = monthDayShift(6, 1) // 前半年的第一天
const beforeThirdMonthFirstDay = monthDayShift(3, 1) // 前三个月的第一天
const beforeTwoMonthFirstDay = monthDayShift(2, 1) // 前两个月的第一天
const beforeMonthFirstDay = monthDayShift(1, 1) // 上月的第一天
const thisMonthFirstDay = monthDayShift(0, 1) // 本月月的第一天
const afterMonthFirstDay = monthDayShift(-1, 1) // 下个月的第一天

const beforeHalfYearLastDay = monthDayShift(5, 0) // 半年前的最后一天
const beforeThirdMonthLastDay = monthDayShift(2, 0) // 上三个月的最后一天
const beforeTwoMonthLastDay = monthDayShift(1, 0) // 上两个月的最后一天
const beforeMonthLastDay = monthDayShift(0, 0) // 上月的最后一天
const thisMonthLastDay = monthDayShift(-1, 0) // 本月的最后一天
const afterMonthLastDay = monthDayShift(-2, 0) // 下个月的最后一天

const dateUtils = {
    timeFun ({
                 date = new Date(),
                 ymr = false, // 无符号年月日
                 ymrSign = false, // 有符号年月日
                 time = false, // 无符号时分秒
                 timeSign = false, // 有符号时分秒
                 allTime = false, // 年月日时分秒
                 allTimeSign = true, // 有符号年月日时分秒
                 allTimeWeek = false, // 有符号年月日时分秒、星期
                 dateSigns = '-', // 年月日符号
                 timeSigns = ':', // 时分秒符号
                 timeFormat = false // 时间格式化
             }) {
        const year = date.getFullYear().toString()
        // const month = date.getMonth() + 1
        // const todayDate = date.getDate()
        //
        // const hours = timeFormat ? date.setHours(0) : date.getHours()
        // const minutes = timeFormat ? date.setMinutes(0) : date.getMinutes()
        // const seconds = timeFormat ? date.setSeconds(0) : date.getSeconds()
        // const milliseconds = timeFormat ? date.setMilliseconds(0) : date.getMilliseconds()
        const week = date.getDay()

        const addZeroMonth = root.addZero(date.getMonth() + 1)
        const addZeroDate = root.addZero(date.getDate()).toString()
        const addZeroHours = root.addZero(date.getHours()).toString()
        const addZeroMinutes = root.addZero(date.getMinutes()).toString()
        const addZeroSeconds = root.addZero(date.getSeconds()).toString()

        const dateStr = year + addZeroMonth + addZeroDate
        const timeStr = addZeroHours + addZeroMinutes + addZeroSeconds
        const dateHaveSign = year + dateSigns + addZeroMonth + dateSigns + addZeroDate
        const timeHaveSign = addZeroHours + timeSigns + addZeroMinutes + timeSigns + addZeroSeconds

        if (ymr) return dateStr
        if (ymrSign) return dateHaveSign
        if (time) return timeStr
        if (timeSign) return timeHaveSign
        if (allTime) return dateStr + timeStr
        if (allTimeWeek) return dateHaveSign + ' ' + timeHaveSign + ' ' + this.weekStr(week)
        if (allTimeSign) return dateHaveSign + ' ' + timeHaveSign
    },

    today (params) {
        return this.timeFun({date: today, ...params})
    },
    beforeWeekFirst (params) { // 上周第一天
        return this.timeFun({date: beforeWeekFirstDay, ...params})
    },
    thisWeekFirst (params) { // 这周第一天
        return this.timeFun({date: thisWeekFirstDay, ...params})
    },
    afterWeekFirst (params) { // 下周第一天
        return this.timeFun({date: afterWeekFirstDay, ...params})
    },
    beforeWeekLast (params) { // 上周最后一天
        return this.timeFun({date: beforeWeekLastDay, ...params})
    },
    thisWeekLast (params) { // 这周最后一天
        return this.timeFun({date: thisWeekLastDay, ...params})
    },
    afterWeekLast (params) { // 下周最后一天
        return this.timeFun({date: afterWeekLastDay, ...params})
    },
    beforeHalfYearFirst (params) { // 半年前第一天
        return this.timeFun({date: beforeHalfYearFirstDay, ...params})
    },
    beforeThirdMonthFirst (params) { // 三个月前第一天
        return this.timeFun({date: beforeThirdMonthFirstDay, ...params})
    },
    beforeTwoMonthFirst (params) { // 两个月前第一天
        return this.timeFun({date: beforeTwoMonthFirstDay, ...params})
    },
    beforeMonthFirst (params) { // 一个月前第一天
        return this.timeFun({date: beforeMonthFirstDay, ...params})
    },
    thisMonthFirst (params) { // 本月第一天
        return this.timeFun({date: thisMonthFirstDay, ...params})
    },
    afterMonthFirst (params) { // 下个月第一天
        return this.timeFun({date: afterMonthFirstDay, ...params})
    },
    beforeHalfYearLast (params) { // 半年前最后一天
        return this.timeFun({date: beforeHalfYearLastDay, ...params})
    },
    beforeThirdMonthLast (params) { // 三个月前最后一天
        return this.timeFun({date: beforeThirdMonthLastDay, ...params})
    },
    beforeTwoMonthLast (params) { // 两个月前最后一天
        return this.timeFun({date: beforeTwoMonthLastDay, ...params})
    },
    beforeMonthLast (params) { // 一个月前最后一天
        return this.timeFun({date: beforeMonthLastDay, ...params})
    },
    thisMonthLast (params) { // 本月最后一天
        return this.timeFun({date: thisMonthLastDay, ...params})
    },
    afterMonthLast (params) { // 下个月最后一天
        return this.timeFun({date: afterMonthLastDay, ...params})
    },
    tomorrow (params) { // 明天
        return this.timeFun({date: tomorrowTime, ...params})
    },
    afterTomorrow (params) { // 后天
        return this.timeFun({date: afterTomorrowTime, ...params})
    },
    afterSeven (params) { // 七天后
        return this.timeFun({date: afterSevenDay, ...params})
    },
    afterThirty (params) { // 三十天后
        return this.timeFun({date: afterThirtyDays, ...params})
    },
    yesterday (params) { // 昨天
        return this.timeFun({date: yesterdayTime, ...params})
    },
    beforeYesterday (params) { // 前天
        return this.timeFun({date: beforeYesterdayTime, ...params})
    },
    beforeSeven (params) { // 七天前
        return this.timeFun({date: beforeSevenDays, ...params})
    },
    beforeThirty (params) { // 三十天前
        return this.timeFun({date: beforeThirtyDays, ...params})
    },
    weekStr (week, weekText = '星期') { // 星期转换
        if (week === 0) week = weekText + '日'
        if (week === 1) week = weekText + '一'
        if (week === 2) week = weekText + '二'
        if (week === 3) week = weekText + '三'
        if (week === 4) week = weekText + '四'
        if (week === 5) week = weekText + '五'
        if (week === 6) week = weekText + '六'
        return week
    },

}

export {dateUtils}
