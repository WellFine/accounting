function _getMonth (date) {
  return date.getMonth() + 1
}
function _pad (value) {
  return value < 10 ? `${value}`.padStart(2, 0) : `${value}`
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

function getYMDWHMSTime () {
  const date = new Date

  return {
    ...getYMDTime(date),
    week: _getWeek(date),
    ...getHMSTime(date)
  }
}

export {
  getYMDTime,
  getHMSTime,
  getYMDWHMSTime
}