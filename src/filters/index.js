import courierPng from '../assets/man_btn_peo.png'
import failPng from '../assets/404.jpg'

import senPng from '../assets/inc_ico_sen.png'
import proPng from '../assets/inc_ico_pro.png'
import colPng from '../assets/inc_ico_col.png'
import toPng from '../assets/inc_ico_to.png'
import disPng from '../assets/inc_ico_dis.png'

const DISPATCH_TYPE = {
  // 入库
  'Arrive': '到件',
  'Invite': '自提件',
  'Send': '分派件',
  // 出库
  'Received': '签收',
  'Back': '退回',
  // 在库
  'InSend': '分派件',
  'InArrive': '到件',
  'InInvite': '自提件',
  // 问题件
  'Questioned': '已解决',
  'Questioning': '未解决'
}

const BRAND_TYPE = {
  '0': '全部品牌',
  '3': '龙邦',
  '4': '速尔',
  '5': '快捷',
  '6': '全峰'
}

const BRAND_IMG = {
  '0': '全部品牌',
  '3': '../static/imgs/expresslogo/longbang.png',
  '4': '../static/imgs/expresslogo/suer.png',
  '5': '../static/imgs/expresslogo/kuaijie.png',
  '6': '../static/imgs/expresslogo/quanfeng.png'
}

export const getDispatchType = function (type) {
  return DISPATCH_TYPE[type]
}

export const getBrandType = function (val) {
  if (!val) {
    return BRAND_TYPE['0']
  }
  val = val.toString()
  return BRAND_TYPE[val]
}

export const getBrandImg = function (val) {
  return BRAND_IMG[val]
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

export const dateFormateStamp = function (timpstamp) {
  if (!timpstamp) {
    return ''
  }
  let date = new Date(Number(timpstamp))
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 10 ? month : '0' + month
  let day = date.getDate()
  day = day > 10 ? day : '0' + day
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + h + m + s
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

export const getIncomeImg = function (feetype) {
  const imgs = {
    '1': senPng,
    '2': proPng,
    '3': colPng,
    '4': toPng,
    '5': disPng
  }
  return imgs[feetype]
}

export const feetype = function (val) {
  const feetypes = {
    '1': '寄件费',
    '2': '代收货款',
    '3': '到付件',
    '4': '派件费',
    '5': '保价费'
  }
  return feetypes[val]
}

export const paytype = function (val) {
  const paytypes = {
    '0': '全部支付',
    '1': '支付宝支付',
    '2': '微信支付',
    '3': '余额支付',
    '4': '现金支付'
  }
  return paytypes[val]
}

export const getExpresstype = function (val) {
  const expresstypes = {
    '1': '普通件'
  }
  return expresstypes[val]
}
