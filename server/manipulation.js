const timeStampToDate = (ts) => {
    let date = new Date(ts)
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        hr: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    }
}
const dayConvert = (num) => {
    let arr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return arr[num]
}

const filterDataForBarChartByDate = (datas) => {
    if (datas.length) {
        let map = {}
        for (let i = 0; i < datas.length; i++) {
            let dateInfo = Number(datas[i].first_seen_utc) * 1000 //number(timestamp)
            let obj = timeStampToDate(dateInfo)
            if (map.hasOwnProperty(obj.date) === false) {
                map[obj.date] = []
                map[obj.date].push(datas[i])
            } else {
                map[obj.date].push(datas[i])
            }
        }
        return map;
    }
}

const filterDataForStackedBarChartByDate = (datas) => {
    if (datas.length) {
        let map = {}
        for (let i = 0; i < datas.length; i++) {
            let dateInfo = Number(datas[i].first_seen_utc) * 1000 //number(timestamp)
            let obj = timeStampToDate(dateInfo)
            if (map.hasOwnProperty(obj.date) === false) {
                map[obj.date] = []
                map[obj.date].push(datas[i])
            } else {
                map[obj.date].push(datas[i])
            }
        }
        let stackedBarChartArr = []
        for (let date in map) {
            let object = {}
            let breakfast = 0, lunch = 0, afternoon = 0, dinner = 0, evening = 0, late_night = 0
            for (let i = 0; i < map[date].length; i++) {
                if (map[date][i].day_part == 1) {
                    breakfast++
                } else if (map[date][i].day_part == 2) {
                    lunch++
                } else if (map[date][i].day_part == 3) {
                    afternoon++
                } else if (map[date][i].day_part == 4) {
                    dinner++
                } else if (map[date][i].day_part == 5) {
                    evening++
                } else if (map[date][i].day_part == 6) {
                    late_night++
                }
            }
            object['date'] = date
            object['breakfast'] = breakfast
            object['lunch'] = lunch
            object['afternoon'] = afternoon
            object['dinner'] = dinner
            object['evening'] = evening
            object['late_night'] = late_night
            stackedBarChartArr.push(object)
        }
        return stackedBarChartArr
    }
}

const filterDataForBarChartByDay = (datas) => {
    if (datas.length) {
        let map = {}
        for (let i = 0; i < datas.length; i++) {
            let dateInfo = Number(datas[i].first_seen_utc) * 1000 //number(timestamp)
            let obj = timeStampToDate(dateInfo)
            let convertedDay = dayConvert(obj.day)
            if (map.hasOwnProperty(convertedDay) === false) {
                map[convertedDay] = []
                map[convertedDay].push(datas[i])
            } else {
                map[convertedDay].push(datas[i])
            }
        }
        return map;
    }
}

const filterDataForStackedBarChartByDay = (datas) => {
    if (datas.length) {
        let map = {}
        for (let i = 0; i < datas.length; i++) {
            let dateInfo = Number(datas[i].first_seen_utc) * 1000 //number(timestamp)
            let obj = timeStampToDate(dateInfo)
            let convertedDay = dayConvert(obj.day)
            if (map.hasOwnProperty(convertedDay) === false) {
                map[convertedDay] = []
                map[convertedDay].push(datas[i])
            } else {
                map[convertedDay].push(datas[i])
            }
        }
        let stackedBarChartArr = []
        for (let convertedDay in map) {
            let object = {}
            let breakfast = 0, lunch = 0, afternoon = 0, dinner = 0, evening = 0, late_night = 0
            for (let i = 0; i < map[convertedDay].length; i++) {
                if (map[convertedDay][i].day_part == 1) {
                    breakfast++
                } else if (map[convertedDay][i].day_part == 2) {
                    lunch++
                } else if (map[convertedDay][i].day_part == 3) {
                    afternoon++
                } else if (map[convertedDay][i].day_part == 4) {
                    dinner++
                } else if (map[convertedDay][i].day_part == 5) {
                    evening++
                } else if (map[convertedDay][i].day_part == 6) {
                    late_night++
                }
            }
            object['convertedDay'] = convertedDay
            object['breakfast'] = breakfast
            object['lunch'] = lunch
            object['afternoon'] = afternoon
            object['dinner'] = dinner
            object['evening'] = evening
            object['late_night'] = late_night
            stackedBarChartArr.push(object)
        }
        return stackedBarChartArr
    }
}


exports.filterDataForBarChartByDate = filterDataForBarChartByDate;
exports.filterDataForStackedBarChartByDate = filterDataForStackedBarChartByDate;
exports.filterDataForBarChartByDay = filterDataForBarChartByDay;
exports.filterDataForStackedBarChartByDay = filterDataForStackedBarChartByDay;