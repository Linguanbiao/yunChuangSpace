//  将时间戳转为正常的年月日
export function formatDate(timestamp) {
  var date = new Date()
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1 // 月
  var day = date.getDate() // 天

  var hour = date.getHours() // 小时
  var minute = date.getMinutes() // 分
  var second = date.getSeconds() // 秒

  var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var week = weekArr[date.getDay()] // getDay() 不是获取哪一天，而是表明今天是一周中的那一天

  //不足两位的在前面添加 0
  if (month >= 1 && month <= 9) month = '0' + month
  if (day >= 1 && day <= 9) day = '0' + day
  if (hour >= 1 && hour <= 9) hour = '0' + hour
  if (minute >= 1 && minute <= 9) minute = '0' + minute
  if (second >= 1 && second <= 9) second = '0' + second


  return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second + '  ' + week
}
