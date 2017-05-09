let apiUrl = 'http://192.168.0.201:8890'
if (process.env.NODE_ENV !== 'development') {
  apiUrl = 'http://app.quandikeji.com:8088'
}

const ApiStore = {
  income: apiUrl + '/StatisticalReports/send',
  incomegenera: apiUrl + '/StatisticalReports/sendType',
  incomedetail: apiUrl + '/StatisticalReports/SendDtails',
  courier: apiUrl + '/StatisticalReports/courier',
  courierdetail: apiUrl + '/StatisticalReports/courierdetails',
  courierexpress: apiUrl + '/StatisticalReports/in2',
  courierorderdetail: apiUrl + '/StatisticalReports/OrderSndetail',
  brand: apiUrl + '/StatisticalReports/allBrand',
  dispatch: apiUrl + '/StatisticalReports/delivery',
  dispatchDetail: apiUrl + '/StatisticalReports/CourierDetails',
  export: apiUrl + '/StatisticalReports/Email'
}

export default ApiStore
