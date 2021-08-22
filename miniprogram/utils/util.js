/**
 * 弹出 toast
 * @param {string} title toast 内容
 * @param {string} icon toast 图表
 * @param {number} duration toast 时间
 */
function toast (title, icon = 'none', duration = 1000) {
  wx.showToast({
    title,
    icon,
    duration
  })
}

/**
 * 返回正确精度的差
 * @param {number} minuend 被减数
 * @param {number} subtraction 减数
 */
function subtraction (minuend, subtraction) {
  return (minuend * 100 - subtraction * 100) / 100
}

export {
  toast,
  subtraction
}