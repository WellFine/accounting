/**
 * 将金额格式化为小数点后两位
 * @param {string} money 金额数值字符串
 */
function moneyFormat (money) {
  // 以小数点为分隔, 保证只有一个小数点且第一个小数点后数字不超 2 位
  const arr = money.split('.')
  let [ integer, decimal ] = arr

  // 如果以 0 开头且长度大于 1, 则删除开头的 0
  if (integer.startsWith('0') && integer.length > 1) {
    integer = integer.slice(1, integer.length)
    money = integer
  }

  // 如果小数点后的数字超过两位, 则保留两位
  if (decimal && decimal.length > 2) money = `${integer}.${decimal.slice(0, 2)}`
  
  // 只能输入一个小数点
  if (arr.length > 2) money = `${integer}.${decimal}`

  return money
}

export {
  moneyFormat
}