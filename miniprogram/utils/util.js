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

export {
  toast
}