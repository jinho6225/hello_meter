const timeStampToDate = (ts) => {
    let date = new Date(ts)
    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        date: date.getUTCDate(),
        day: date.getUTCDay(),
        hr: date.getUTCHours(),
        min: date.getUTCMinutes(),
        sec: date.getUTCSeconds()
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
            let breakfast = 0, lunch = 0, afternoon = 0, dinner = 0, evening = 0, late_night = 0;
            let tts_breakfast = 0, tts_lunch = 0, tts_afternoon = 0, tts_dinner = 0, tts_evening = 0, tts_late_night = 0;
            let fast_breakfast = Infinity, fast_lunch = Infinity, fast_afternoon = Infinity, fast_dinner = Infinity, fast_evening = Infinity, fast_late_night = Infinity;
            let slow_breakfast = -Infinity, slow_lunch = -Infinity, slow_afternoon = -Infinity, slow_dinner = -Infinity, slow_evening = -Infinity, slow_late_night = -Infinity;

            for (let i = 0; i < map[date].length; i++) {
                if (map[date][i].day_part == 1) {
                    breakfast++
                    tts_breakfast += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_breakfast) {
                        slow_breakfast = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_breakfast) {
                        fast_breakfast = Number(map[date][i].tts)
                    }
                } else if (map[date][i].day_part == 2) {
                    lunch++       
                    tts_lunch += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_lunch) {
                        slow_lunch = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_lunch) {
                        fast_lunch = Number(map[date][i].tts)
                    }
                } else if (map[date][i].day_part == 3) {
                    afternoon++                    
                    tts_afternoon += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_afternoon) {
                        slow_afternoon = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_afternoon) {
                        fast_afternoon = Number(map[date][i].tts)
                    }
                } else if (map[date][i].day_part == 4) {
                    dinner++                    
                    tts_dinner += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_dinner) {
                        slow_dinner = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_dinner) {
                        fast_dinner = Number(map[date][i].tts)
                    }
                } else if (map[date][i].day_part == 5) {
                    evening++              
                    tts_evening += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_evening) {
                        slow_evening = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_evening) {
                        fast_evening = Number(map[date][i].tts)
                    }
                } else if (map[date][i].day_part == 6) {
                    late_night++                   
                    tts_late_night += Number(map[date][i].tts)
                    if (Number(map[date][i].tts) > slow_late_night) {
                        slow_late_night = Number(map[date][i].tts)
                    }
                    if (Number(map[date][i].tts) < fast_late_night) {
                        fast_late_night = Number(map[date][i].tts)
                    }
                }
            }
            object['date'] = date
            object['breakfast'] = breakfast
            object['lunch'] = lunch
            object['afternoon'] = afternoon
            object['dinner'] = dinner
            object['evening'] = evening
            object['late_night'] = late_night
            object['tts_breakfast'] = tts_breakfast
            object['tts_lunch'] = tts_lunch
            object['tts_afternoon'] = tts_afternoon
            object['tts_dinner'] = tts_dinner
            object['tts_evening'] = tts_evening
            object['tts_late_night'] = tts_late_night
            object['slow_breakfast'] = slow_breakfast
            object['slow_lunch'] = slow_lunch
            object['slow_afternoon'] = slow_afternoon
            object['slow_dinner'] = slow_dinner
            object['slow_evening'] = slow_evening
            object['slow_late_night'] = slow_late_night
            object['fast_breakfast'] = fast_breakfast
            object['fast_lunch'] = fast_lunch
            object['fast_afternoon'] = fast_afternoon
            object['fast_dinner'] = fast_dinner
            object['fast_evening'] = fast_evening
            object['fast_late_night'] = fast_late_night
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
            let tts_breakfast = 0, tts_lunch = 0, tts_afternoon = 0, tts_dinner = 0, tts_evening = 0, tts_late_night = 0;
            let fast_breakfast = Infinity, fast_lunch = Infinity, fast_afternoon = Infinity, fast_dinner = Infinity, fast_evening = Infinity, fast_late_night = Infinity;
            let slow_breakfast = -Infinity, slow_lunch = -Infinity, slow_afternoon = -Infinity, slow_dinner = -Infinity, slow_evening = -Infinity, slow_late_night = -Infinity;
            for (let i = 0; i < map[convertedDay].length; i++) {
                if (map[convertedDay][i].day_part == 1) {
                    breakfast++
                    tts_breakfast += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_breakfast) {
                        slow_breakfast = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_breakfast) {
                        fast_breakfast = Number(map[convertedDay][i].tts)
                    }                    
                } else if (map[convertedDay][i].day_part == 2) {
                    lunch++
                    tts_lunch += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_lunch) {
                        slow_lunch = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_lunch) {
                        fast_lunch = Number(map[convertedDay][i].tts)
                    }                    
                } else if (map[convertedDay][i].day_part == 3) {
                    afternoon++
                    tts_afternoon += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_afternoon) {
                        slow_afternoon = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_afternoon) {
                        fast_afternoon = Number(map[convertedDay][i].tts)
                    }                    
                } else if (map[convertedDay][i].day_part == 4) {
                    dinner++
                    tts_dinner += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_dinner) {
                        slow_dinner = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_dinner) {
                        fast_dinner = Number(map[convertedDay][i].tts)
                    }                    
                } else if (map[convertedDay][i].day_part == 5) {
                    evening++
                    tts_evening += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_evening) {
                        slow_evening = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_evening) {
                        fast_evening = Number(map[convertedDay][i].tts)
                    }                    
                } else if (map[convertedDay][i].day_part == 6) {
                    late_night++
                    tts_late_night += Number(map[convertedDay][i].tts)
                    if (Number(map[convertedDay][i].tts) > slow_late_night) {
                        slow_late_night = Number(map[convertedDay][i].tts)
                    }
                    if (Number(map[convertedDay][i].tts) < fast_late_night) {
                        fast_late_night = Number(map[convertedDay][i].tts)
                    }                    
                }
            }
            object['convertedDay'] = convertedDay
            object['breakfast'] = breakfast
            object['lunch'] = lunch
            object['afternoon'] = afternoon
            object['dinner'] = dinner
            object['evening'] = evening
            object['late_night'] = late_night
            object['tts_breakfast'] = tts_breakfast
            object['tts_lunch'] = tts_lunch
            object['tts_afternoon'] = tts_afternoon
            object['tts_dinner'] = tts_dinner
            object['tts_evening'] = tts_evening
            object['tts_late_night'] = tts_late_night
            object['slow_breakfast'] = slow_breakfast
            object['slow_lunch'] = slow_lunch
            object['slow_afternoon'] = slow_afternoon
            object['slow_dinner'] = slow_dinner
            object['slow_evening'] = slow_evening
            object['slow_late_night'] = slow_late_night
            object['fast_breakfast'] = fast_breakfast
            object['fast_lunch'] = fast_lunch
            object['fast_afternoon'] = fast_afternoon
            object['fast_dinner'] = fast_dinner
            object['fast_evening'] = fast_evening
            object['fast_late_night'] = fast_late_night            
            stackedBarChartArr.push(object)
        }
        return stackedBarChartArr
    }
}


exports.filterDataForBarChartByDate = filterDataForBarChartByDate;
exports.filterDataForStackedBarChartByDate = filterDataForStackedBarChartByDate;
exports.filterDataForBarChartByDay = filterDataForBarChartByDay;
exports.filterDataForStackedBarChartByDay = filterDataForStackedBarChartByDay;