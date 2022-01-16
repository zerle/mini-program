// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('blog_article').where({
    title: cloud.database().RegExp({
      regexp: event.value,
      options: 'i'  // 大小写不区分
    })
  }).get()
}