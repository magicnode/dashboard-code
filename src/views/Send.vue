<template>
     <div class="send">
        <div class="send-changedate" @click="modalVisi = !modalVisi"></div>
        <div v-if="modalVisi" class="send-date">
          <div class="send-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="sendquery.startTime | datestr">
            </div>
            <div>              
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="sendquery.endTime | datestr">
            </div>
          </div>
          <div class="send-date-cover" style="z-index: 2000;" @click="modalVisi = !modalVisi">
          </div>
        </div>
        <div class="send-time">
          <span>{{sendquery.startTime | datestr}}</span>
          <span>--</span>
          <span>{{sendquery.endTime | datestr}}</span>
        </div>

        <div class="send-firstchart send-chart">
          <div id="chart1" style="width: 100%;height:40vh;">
          </div>          
        </div>
        <div class="send-cylinder send-chart">
          <div v-for="(item, key) in send.mapNum">
            <scale-drawing :name="key" :count="item" unit="单"></scale-drawing>
          </div>
        </div>
        <div class="send-second send-chart">
          <div id="chart2" style="width: 100%;min-height:45vh;">
          </div>
        </div>
        <div class="send-third send-chart">
          <table width="100%">
            <thead>
              <tr>
                <th>品牌</th>
                <th>运单号</th>
                <th>收费</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in send['array']">
                <td>{{item.brandId | brandtype}}</td>
                <td>{{item.orderSn}}</td>
                <td>{{'￥' + item.fee}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 过场动画 -->
        <div class="page-spinner" v-show="loading">
          <mt-spinner type="double-bounce" color="#26a2ff" :size="80"></mt-spinner>
        </div>
        <!-- 时间弹窗 -->
        <mt-datetime-picker ref="pickerLeft" type="date" v-model="sendquery.startTime" @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker ref="pickerRight" type="date" v-model="sendquery.endTime" @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapGetters } from 'vuex'
import { getIncomeImg as incomeimg, paytype, getBrandType as brandtype } from '../filters'
import { GetDateStr, GetMonthStart } from 'helpers'
import Highcharts from 'highcharts'
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/no-data-to-display')(Highcharts)
// lang 语言设置
Highcharts.setOptions({
  lang: {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    shortWeekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    noData: '暂无数据'
  }
})

export default {
  name: 'send',
  created () {
    const _this = this
    setTimeout(function () {
      _this.loading = false
    }, 1500)
    this.$store.commit('SET_TITLE', {title: '寄件统计'})
    this.initSend()
  },
  data () {
    return {
      loading: true,
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      actions: [],
      areachart: {},
      piechart: {}
    }
  },
  mounted () {
    const that = this
    // chart1
    let areaChartData = this.send.number || []
    // let areaChartXlength = areaChartData ? this.numToFloor(areaChartData.length) : 5
    let pointStart = this.sendquery.startTime
    pointStart = this.getDateUTCVal(pointStart)
    function setAreaChart () {
      that.areachart = new Highcharts.Chart('chart1', {
        chart: {
          type: 'area',
          zoomType: 'x'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '月份报表',
          style: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%Y-%m-%d'
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }],
          gridLineColor: '#dedede',
          gridLineWidth: 1,
          labels: {
            style: {
              fontSize: '13',
              color: '#333'
            }
          },
          tickLength: 0,
          tickPixelInterval: 40
        },
        tooltip: {
          pointFormat: '{series.name} 收 <b>{point.y:,.0f}</b>件'
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: ' ',
          data: areaChartData,
          pointStart: Date.UTC(pointStart.year, pointStart.month, pointStart.day), // 开始值
          pointInterval: 24 * 3600 * 1000 // 间隔一天
        }],
        noData: {
          style: {
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#303030'
          }
        }
      })
    }
    // chart2
    let pieChatData = this.send.payType || []
    function getpayType (val) {
      let str = ''
      switch (Number(val)) {
        case 1:
          str = '支付宝'
          break
        case 2:
          str = '微信'
          break
        case 3:
          str = '线下支付'
          break
        case 4:
          str = '余额'
          break
        default:
          str = '未知'
          break
      }
      return str
    }
    for (let i = 0, len = pieChatData.length; i < len; i++) {
      pieChatData[i][0] = getpayType(pieChatData[i][0])
    }
    function setPieChart () {
      that.piechart = new Highcharts.Chart('chart2', {
        chart: {
          height: 300,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacing: [100, 0, 40, 0]
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            },
            point: {
              events: {
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: '金额占比',
          data: pieChatData
        }]
      })
    }
    setTimeout(function () {
      setAreaChart()
      setPieChart()
    }, 2000)
  },
  filters: {
    incomeimg,
    paytype,
    brandtype
  },
  computed: {
    ...mapGetters({
      'userId': 'getUserId',
      'brands': 'getBrands',
      'send': 'getSendData',
      'sendquery': 'getSendQuery',
      'refresh': 'getSendRefresh'
    })
  },
  methods: {
    ...mapActions([
      'setSendQuery',
      'changeSend'
    ]),
    getDateUTCVal (val) {
      if (!val) {
        return {
          year: 1990,
          month: 0,
          day: 10
        }
      }
      val = new Date(val)
      let utcVal = {
        year: Number(val.getFullYear()),
        month: Number(val.getMonth()),
        day: Number(val.getDay())
      }
      return utcVal
    },
    numToFloor (val) {
      val = Number(val)
      if (!val) return 0
      let len = val.toString().length || 1
      let valBo = Number(val.toString().substr(0, len - 1))
      val = Math.floor(val / valBo)
      return val
    },
    initSend () {
      if (this.refresh) {
        return
      }
      const startTime = GetMonthStart()
      const endTime = GetDateStr(0)
      this.setSendQuery({startTime, endTime})
    },
    openPicker (picker) {
      this.$refs[picker].open()
    },
    changeAreaChart () {
      const _this = this
      let areaChartData = this.send.number || []
      let pointStart = _this.sendquery.startTime
      let areaChartXlength = areaChartData ? _this.numToFloor(areaChartData.length) : 5
      _this.areachart.series[0].update({
        data: _this.send.number,
        pointStart: new Date(pointStart).getTime()
      })
      _this.areachart.xAxis[0].update({
        tickInterval: areaChartXlength
      })
    },
    changePieChart () {
      const _this = this
      let pieChatData = this.send.payType
      function getpayType (val) {
        let str = ''
        switch (Number(val)) {
          case 1:
            str = '支付宝'
            break
          case 2:
            str = '微信'
            break
          case 3:
            str = '线下支付'
            break
          case 4:
            str = '余额'
            break
          default:
            str = '未知'
            break
        }
        return str
      }
      for (let i = 0, len = pieChatData.length; i < len; i++) {
        pieChatData[i][0] = getpayType(pieChatData[i][0])
      }
      console.log('pire', pieChatData)
      _this.piechart.series[0].update({
        data: pieChatData
      })
    },
    handleChangeLeft (val) {
      this.setSendQuery({startTime: val})
      const _this = this
      setTimeout(function () {
        _this.changeAreaChart()
        _this.changePieChart()
      }, 1800)
    },
    handleChange (val) {
      this.setSendQuery({endTime: val})
      const _this = this
      setTimeout(function () {
        _this.changeAreaChart()
        _this.changePieChart()
      }, 1800)
    }
  }
}
</script>
 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.page-spinner {
 position: absolute;
 top: 30%;
 left: 40%;
 z-index: 2000;
}
.flex {
  display: flex;
}
.send {
  background-color: #efeff4;
  padding-bottom: 5rem;
  &-changedate {
    z-index:2001;
    position: absolute;
    top: 0;
    right:0;
    width: 50px;
    height:40px;
    background-image: url('../assets/calendar.png');
    background-repeat: no-repeat;
    background-size: 1.6rem 1.7rem;
    background-position: 1.4rem .8rem;
  }
  
  &-time {
    background: white;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    color: #666;
    border-bottom: 1px solid #999;
  }

  &-chart {
    margin-bottom: 1rem;
    background: white;
    &:last-child {
      margin-bottom: 0rem;
    }
  }

  &-cylinder {
    padding: 1rem .5rem;
  }

  &-date {
    z-index: 1;
    position: absolute;
    &-choose {
      overflow: hidden;
      background: #fff;
      padding: 1.7rem 0.1rem;
      display: flex;
      input {
        background-image: url('../assets/sta_ico_cal.png');
        background-repeat: no-repeat;
        background-position: 8rem .6rem;
        background-size: 1.6rem 1.7rem;
        padding: .7rem .6rem;
        font-size: 1.4rem;
        width: 77%;
        border: 1px solid rgb(221,221,221);
      }
      span {
        line-height: 2.7rem;
      }

    }

    &-cover {
      overflow: hidden;
      background-color: rgb(0, 0, 0);
      opacity: 0.7;
      position: fixed;
      left: 0px;
      right: 0px;
      top: 111.84px;
      bottom: 0px;
      display: block;
    }
  }

  &-third {
    margin-bottom: 0!important;
  }
}

table {
  border: 1px solid #ccc;
  border-left-width: 0;
  border-right-width: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
}
table tr {
  border: 1px solid #ddd;
  border-left-width: 0;
  border-right-width: 0;
  padding: 5px;
}
table th,
table td {
  padding: 10px;
  text-align: center;
}
table th {
  color: #666;
  border-left-width: 0;
  border-right-width: 0;
  background: #e9ebf9;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}
table td {
  font-size: 1.2rem;
  color: #999;
}
</style>
