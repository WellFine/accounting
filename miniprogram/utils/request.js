async function request (name, data) {
  return await wx.cloud.callFunction({
    name,
    data
  })
}

export {
  request
}