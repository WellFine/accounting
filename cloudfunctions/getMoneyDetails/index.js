// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const collection = db.collection('account')
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type, name, beginTime, endTime, isGroup } = event

  if (isGroup) {
    return await collection.aggregate()
      .match({
        _openid: OPENID,
        time: _.and(_.gte(beginTime), _.lt(endTime))  // match 不可使用聚合操作符，只能使用查询操作符
      })
      .group({
        _id: '$time',  // 根据 time 字段分组
        data: $.push({
          account: '$account',
          money: '$money',
          type: '$type',
          name: '$name',
          py: '$py',
          sub: '$sub',
          how: '$how',
          time: '$time',
          remark: '$remark'
        })
      })
      .sort({
        _id: -1   // -1 为降序，1 为升序
      })
      .limit(31)  // 默认返回 20 条数据，这里根据时间聚合后最多能查询到 31 条数据
      .end()
  }
  
  return await collection
    .where({
      _openid: OPENID,
      type: type ? type : undefined,
      name: name ? (name === '全部类型' ? undefined : name) : undefined,
      time: _.and(_.gte(beginTime), _.lt(endTime))
    })
    .orderBy('time', 'desc')
    .field({
      _openid: false
    })
    .get()
}