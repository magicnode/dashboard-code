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
