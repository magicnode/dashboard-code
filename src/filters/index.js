import courierPng from '../assets/man_btn_peo.png'
import failPng from '../assets/404.jpg'

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

export const failImg = function (val) {
  if (!val || val === '' || val === undefined) {
    return failPng
  }
  return val
}

export const dateFormate = function (date) {
  date = new Date(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 10 ? month : '0' + month
  let day = date.getDate()
  day = day > 10 ? day : '0' + day
  return year + '-' + month + '-' + day
}

export const handleNull = function (val) {
  /* eslint-disable no-unneeded-ternary */
  return val ? val : 0
}

export const expresstype = function (val) {
  const types = {
    0: '普通件',
    1: '到付件',
    2: '代收货款到付件'
  }
  return types[val]
}

export const expressoperation = function (val) {
  const operations = {
    5: '云通知',
    101: '到件',
    102: '上架',
    103: '分派',
    301: '签收',
    302: '退回',
    201: '问题件'
  }
  return operations[val]
}

export const expressstate = function (val) {
  const states = {
    0: '等待数据',
    1: '成功',
    2: '未接听',
    3: '空号',
    4: '线路故障',
    5: '失败',
    101: '到件',
    102: '上架',
    103: '分派',
    301: '签收',
    302: '退回',
    201: '问题件'
  }
  return states[val]
}

