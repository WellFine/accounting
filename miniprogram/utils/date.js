function _getMonth (date) {
  return date.getMonth() + 1
}
function _pad (value) {
  return String(value).padStart(2, 0)
}
function _getMonthStr (date) {
  return _pad(date.getMonth() + 1)
}
function _getDayStr (date) {
  return _pad(date.getDate())
}
function _getHourStr (date) {
  return _pad(date.getHours())
}
function _getMinuteStr (date) {
  return _pad(date.getMinutes())
}
function _getSecondsStr (date) {
  return _pad(date.getSeconds())
}
function _getWeek (date) {
  // 星期天以数字 7 表示
  return date.getDay() === 0 ? 7 : date.getDay()
}

function getYMDTime (date = new Date) {
  return {
    year: date.getFullYear(),
    month: _getMonth(date),
    monthStr: _getMonthStr(date),
    day: date.getDate(),
    dayStr: _getDayStr(date)
  }
}

function getHMSTime (date = new Date) {
  return {
    hour: date.getHours(),
    hourStr: _getHourStr(date),
    minute: date.getMinutes(),
    minuteStr: _getMinuteStr(date),
    seconds: date.getSeconds(),
    secondsStr: _getSecondsStr(date)
  }
}

function getYMDWHMSTime (date = new Date) {
  return {
    ...getYMDTime(date),
    week: _getWeek(date),
    ...getHMSTime(date)
  }
}

/**
 * 获取时间戳
 * @param {Object} date date 对象
 * @param {string} type 获取月时间戳或者天时间戳
 */
function getTimestamp (date = new Date, type = 'month') {
  const { year, monthStr, dayStr } = getYMDTime(date)

  const dateStr = (type === 'month') ? `${year}-${monthStr}` : `${year}-${monthStr}-${dayStr}`

  return {
    beginTime: Date.parse(dateStr),
    endTime: getEndTime(dateStr)
  }
}

/**
 * 根据传入的日期字符串获取结束日期字符串
 * @param {string} dateStr 日期字符串 YYYY-MM || YYYY-MM-DD
 */
function getEndTime (dateStr) {
  let [ year, month, day ] = dateStr.split('-')

  // 传入的是 YYYY-MM-DD
  if (day) {
    return Date.parse(dateStr) + 86400000
  }

  // 传入的是 YYYY-MM
  month = Number(month) + 1
  // 如果是 12 月，则加载明年一月前数据
  if (month > 12) {
    year = Number(year) + 1
    month = '01'
  }
  return Date.parse(`${year}-${_pad(month)}`)
}

/**
 * 获取本月剩余天数
 * @param {Object} date Date 日期对象
 */
function getMonthLeftoverDay (date = new Date) {
  const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  const { year, month, day } = getYMDTime(date)
  
  if (isLeapYear(year)) dayInMonth[1]++
  
  return dayInMonth[month - 1] - day + 1
}

/**
 * 判断是否为闰年
 * @param {number}} year 年份
 */
function isLeapYear (year) {
  return Number.isInteger(year / 4) && Number.isInteger(year / 400)
}

export {
  getYMDTime,
  getHMSTime,
  getYMDWHMSTime,
  getTimestamp,
  getEndTime,
  getMonthLeftoverDay
}