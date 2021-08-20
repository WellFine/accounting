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

function getYMDTime (date = null) {
  date = date ? date : new Date

  return {
    year: date.getFullYear(),
    month: _getMonth(date),
    monthStr: _getMonthStr(date),
    day: date.getDate(),
    dayStr: _getDayStr(date)
  }
}

function getHMSTime (date = null) {
  date = date ? date : new Date

  return {
    hour: date.getHours(),
    hourStr: _getHourStr(date),
    minute: date.getMinutes(),
    minuteStr: _getMinuteStr(date),
    seconds: date.getSeconds(),
    secondsStr: _getSecondsStr(date)
  }
}

function getYMDWHMSTime (date = null) {
  date = date ? date : new Date

  return {
    ...getYMDTime(date),
    week: _getWeek(date),
    ...getHMSTime(date)
  }
}

/**
 * 根据传入的日期字符串获取结束日期字符串
 * @param {string}} dateStr 日期字符串 YYYY-MM || YYYY-MM-DD
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

export {
  getYMDTime,
  getHMSTime,
  getYMDWHMSTime,
  getEndTime
}