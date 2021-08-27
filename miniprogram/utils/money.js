/**
 * 限制金额只能有一个小数点且小数点后数字不超过 2 位
 * @param {number} money 金额数值
 */
function makeMoneyTrue (money) {
  const arr = String(money).split('.')
  let [ integer, decimal ] = arr

  // 如果以 0 开头且长度大于 1, 则删除开头的 0
  if (integer.startsWith('0') && integer.length > 1) {
    integer = integer.slice(1, integer.length)
    money = integer
  }

  // 如果小数点后的数字超过两位, 则保留两位
  if (decimal && decimal.length > 2) {
    decimal = decimal.slice(0, 2)
    money = `${integer}.${decimal}`
  }
  
  // 只能输入一个小数点
  if (arr.length > 2) money = `${integer}.${decimal}`

  return money
}

/**
 * 将金额格式化为每隔三位数字加一个指定字符串
 * @param {number} money 金额数值
 * @param {string} str 每隔三个数字添加的字符
 */
function moneyFormat (money, str) {
  let [ integer, decimal ] = String(money).split('.')
  let format = ''

  let length = integer.length

  for (let i = length % 3, j = 0; i <= length; j = i, i += 3) {
    if (i === 0) continue
    format += `${integer.slice(j, i)}${str}`
  }
  
  return `${format.slice(0, format.length - str.length)}.${decimal}`
}

/**
 * 将金额变为 xxx.xx 的字符串格式
 * @param {number} money 金额数值
 */
function padMoney (money) {
  // const [ integer, decimal] = String(money).split('.')

  // // decimal 存在证明有小数点
  // if (decimal) return Number(`${integer}.${decimal.padEnd(2, 0)}`).toFixed(2)

  // return `${integer}.00`
  return Number(money).toFixed(2)
}

export {
  makeMoneyTrue,
  moneyFormat,
  padMoney
}