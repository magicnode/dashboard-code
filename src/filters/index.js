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
  '2': '优速',
  '3': '龙邦',
  '4': '速尔',
  '5': '快捷',
  '6': '全峰',
  '7': '百世快递',
  '8': '天天',
  '9': '中通',
  '11': '申通',
  '12': '圆通',
  '14': 'EMS',
  '15': '国通',
  '16': '蚂蚁帮',
  '17': '邮政小包',
  '18': '宅急送',
  '19': '跨越',
  '20': '京东',
  '21': '达达',
  '22': '万象',
  '23': '妙寄',
  '24': '中铁',
  '27': '品骏',
  '26': '安能',
  '28': '日日顺',
  '29': '如风达',
  '10': '韵达',
  '13': '顺丰',
  '71': '高铁快运'
}

const BRAND_IMG = {
  '0': '全部品牌',
  '2': './static/imgs/expresslogo/yousu.png',
  '3': './static/imgs/expresslogo/longbang.png',
  '4': './static/imgs/expresslogo/suer.png',
  '5': './static/imgs/expresslogo/kuaijie.png',
  '6': './static/imgs/expresslogo/quanfeng.png',
  '7': './static/imgs/expresslogo/baishi.png',
  '8': './static/imgs/expresslogo/tiantian.png',
  '9': './static/imgs/expresslogo/zhongtong.png',
  '10': './static/imgs/expresslogo/yunda.png',
  '11': './static/imgs/expresslogo/shentong.png',
  '12': './static/imgs/expresslogo/yuantong.png',
  '13': './static/imgs/expresslogo/shunfeng.png',
  '14': './static/imgs/expresslogo/ems.png',
  '15': './static/imgs/expresslogo/guotong.png',
  '16': './static/imgs/expresslogo/mayibang.png',
  '17': './static/imgs/expresslogo/yuancheng.png',
  '18': './static/imgs/expresslogo/zhaijisong.png',
  '19': './static/imgs/expresslogo/kuayue.png',
  '20': './static/imgs/expresslogo/jingdong.png',
  '21': './static/imgs/expresslogo/dada.png',
  '22': './static/imgs/expresslogo/wanxiang.png',
  '23': './static/imgs/expresslogo/miaoji.png',
  '24': './static/imgs/expresslogo/zhongtie.png',
  '27': './static/imgs/expresslogo/pinjun.png',
  '26': './static/imgs/expresslogo/anneng.png',
  '28': './static/imgs/expresslogo/ririshun.png',
  '29': './static/imgs/expresslogo/rufengda.png',
  '71': './static/imgs/expresslogo/gaotiekuaiyun.png'
}

export const getDispatchType = function (type) {
  return DISPATCH_TYPE[type]
}

export const getBrandType = function (val) {
  if (!val) {
    return BRAND_TYPE['0']
  }
  val = val.toString()
  if (!BRAND_TYPE[val]) {
    return '快递'
  }
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
