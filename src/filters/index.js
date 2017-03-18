const DISPATCH_TYPE = {
  'enter': '入库',
  'out': '出库',
  'in': '在库',
  'question': '问题件'
}

export const getDispatchType = function (type) {
  return DISPATCH_TYPE[type]
}
