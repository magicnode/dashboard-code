import courierPng from '../assets/man_btn_peo.png'

const DISPATCH_TYPE = {
  'enter': '入库',
  'out': '出库',
  'in': '在库',
  'question': '问题件'
}

const BRAND_TYPE = {
  '0': '全部品牌',
  '3': '龙邦',
  '4': '速尔',
  '5': '快捷',
  '6': '全峰'
}

export const getDispatchType = function (type) {
  return DISPATCH_TYPE[type]
}

export const getBrandType = function (val) {
  val = val.toString()
  return BRAND_TYPE[val]
}

export const defaultCourierImg = function (val) {
  if (!val || val === '' || val === undefined) {
    // console.log('val', val)
    // const img = '../static/imgs/man_btn_peo.png'
    // console.log('con', img)
    return courierPng
  }
  return val
}

export const dateFormate = function (date) {
  // console.log('date', date)
  // console.log('date', typeof date)
  // if (typeof date === 'string') {
  //   return date
  // }
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day
}
