export const isEmptyObject = function (ob) {
  if (typeof ob === 'object' && !(ob instanceof Array)) {
    let hasProp = false
    /* eslint-disable no-unused-vars */
    for (let prop in ob) {
      hasProp = true
      break
    }
    return hasProp
  }
  return false
}

export const GetDateStr = function (AddDayCount) {
  let date = new Date()
  date.setDate(date.getDate() + AddDayCount)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 10 ? m : '0' + m
  let d = date.getDate()
  d = d > 10 ? d : '0' + d
  return y + '-' + m + '-' + d
}

export const GetDateFormate = function (date) {
  date = new Date(date)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 10 ? m : '0' + m
  let d = date.getDate()
  d = d > 10 ? d : '0' + d
  return y + '-' + m + '-' + d
}

export const feedtype = function (val) {
  const feedtypes = {
    '1': '寄件费',
    '2': '代收货款',
    '3': '到付件',
    '4': '派件费',
    '5': '保价费'
  }
  return feedtypes[val]
}

