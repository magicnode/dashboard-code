let apiUrl = 'http://192.168.0.201:8890'
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://192.168.0.201:8890'
}

const ApiStore = {
  income: apiUrl + '/StatisticalReports/send',
  courier: apiUrl + '/StatisticalReports/courier',
  courierdetail: apiUrl + '/StatisticalReports/courierdetails',
  brand: apiUrl + '/StatisticalReports/allBrand'
}

export default ApiStore
