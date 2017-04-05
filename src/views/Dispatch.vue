<template>
     <div class="dispatch">
        <div class="dispatch-header-exp">
          <div class="dispatch-header-exp__switch" @click="spanClassChange">
            <span :class="{activeClass: RisActive}">日期</span>
            <span :class="{activeClass: !RisActive}">月份</span>
          </div>
          <div class="dispatch-header-exp__export">
            <a href="#/export" title="">导出</a>
          </div>
        </div>
        <div v-show="RisActive">
          <div class="dispatch-total">
            <div  @click="sheetVisible=true" class="dispatch-total-action">
              {{query.brandId | brand}}
            </div>
            <div class="dispatch-total-time" @click="openPicker('pickerLeft')">
              {{query.time | datestr}}
            </div>
          </div>
          <div class="dispatch-content">
            <div class="dispatch-content-title">
              入库 {{dispatch.enter}}
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_sin.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>到件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Arrive}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_sto.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>自提件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Invite}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_dis.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>分派件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Send}}
              </div>
            </div>
          </div>

          <div class="dispatch-content">
            <div class="dispatch-content-title">
              出库 {{dispatch.out}}
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_sig.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>签收</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Received}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_ret.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>退回</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Back}}
              </div>
            </div>
          </div>

          <div class="dispatch-content">
            <div class="dispatch-content-title">
              在库 {{dispatch.inside}}
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_sin.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>到件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.InArrive}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_sto.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>自提件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.InInvite}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_dis.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>分派件</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.InSend}}
              </div>
            </div>
          </div>

          <div class="dispatch-content">
            <div class="dispatch-content-title">
              问题件 {{dispatch.question}}
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_pro.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>已解决</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Questioned}}
              </div>
            </div>
            <div class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img src="../assets/sta_ico_pro.png" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>未解决</p>
                <span>{{query.time | datestr}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{dispatch.day.Questioning}}
              </div>
            </div>
          </div>
        </div>
        <div v-show="!RisActive" class="dispatch-chart">
          <button class="dispatch-select-month" type="" @click="openPicker('pickerMonth')">选择月份</button>
          <div id="chart" class="dispatch-chart-container">
          </div>

          <div class="dispatch-chart-detail" @click="changeContent('asd', $event)">
            <div class="dispatch-chart-detail__title dispatch-chart-detail__title--active">
              入库
            </div>
            <div class="dispatch-chart-detail__title">
              出库
            </div>
            <div class="dispatch-chart-detail__title">
              在库
            </div>
            <div class="dispatch-chart-detail__title">
              问题件
            </div>
          </div>

          <div class="dispatch-chart-content flex">
            <div class="dispatch-chart-content__line" >
              <img src="../assets/sta_ico_sin.png" alt="">
              <p>到件</p>
              <p>{{dispatch.month.MonthArrive}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_sto.png" alt="">
              <p>自提件</p>
              <p>{{dispatch.month.MonthInvite}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_dis.png" alt="">
              <p>分派件</p>
              <p>{{dispatch.month.MonthSend}}</p>
            </div>
          </div>

          <div class="dispatch-chart-content">
            <div class="dispatch-chart-content__line" >
              <img src="../assets/sta_ico_sig.png" alt="">
              <p>签收</p>
              <p>{{dispatch.month.MonthReceived}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_ret.png" alt="">
              <p>退回</p>
              <p>{{dispatch.month.MonthBack}}</p>
            </div>
          </div>

          <div class="dispatch-chart-content">
            <div class="dispatch-chart-content__line" >
              <img src="../assets/sta_ico_sin.png" alt="">
              <p>到件</p>
              <p>{{dispatch.month.MonthInArrive}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_sto.png" alt="">
              <p>自提件</p>
              <p>{{dispatch.month.MonthInInvite}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_dis.png" alt="">
              <p>分派件</p>
              <p>{{dispatch.month.MonthInSend}}</p>
            </div>
          </div>

          <div class="dispatch-chart-content">
            <div class="dispatch-chart-content__line" >
              <img src="../assets/sta_ico_pro.png" alt="">
              <p>已解决</p>
              <p>{{dispatch.month.MonthQuestioned}}</p>
            </div>
            <div class="dispatch-chart-content__line">
              <img src="../assets/sta_ico_pro.png" alt="">
              <p>未解决</p>
              <p>{{dispatch.month.MonthQuestioning}}</p>
            </div>
          </div>
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
        <mt-datetime-picker ref="pickerLeft" type="date" v-model="query.time" @confirm="handleChange">
        </mt-datetime-picker>
        <mt-datetime-picker 
        ref="pickerMonth" 
        type="date"
        v-model="query.month"
        @confirm="handleChangeMonth">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getDispatchType } from '../filters'
import { GetDateStr } from 'helpers'
// import window from 'window'
import Highcharts from 'highcharts'
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts)

export default {
  name: 'dispatch',
  created () {
    this.$store.commit('SET_TITLE', {title: ''})
    this.initDispatch()
    this.initBrand()
    const that = this
    setTimeout(function () {
      that.$forceUpdate()
    }, 2000)
  },
  filters: {
    getDispatchType
  },
  computed: {
    ...mapGetters({
      'userId': 'getUserId',
      'brands': 'getBrands',
      'dispatch': 'getDispatch',
      'query': 'getDispatchQuery'
    })
  },
  data () {
    return {
      selected: 'tab-container1',
      RisActive: false,
      YisActive: false,
      sheetVisible: false,
      actions: [],
      chart: {}
    }
  },
  mounted () {
    let xAxisData = []
    for (let i = 1; i <= 31; i++) {
      let xdata = i + '号'
      xAxisData.push(xdata)
    }
    const that = this
    function setChart () {
      that.chart = new Highcharts.Chart('chart', {
        chart: {
          backgroundColor: '#0b557a'
        },
        lang: {
          contextButtonTitle: '图表导出菜单',
          downloadJPEG: '下载JPEG图片',
          downloadPDF: '下载PDF文件',
          downloadPNG: '下载PNG文件',
          downloadSVG: '下载SVG文件',
          loading: '加载中',
          noData: '没有数据',
          printChart: '打印图表'
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
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: xAxisData,
          labels: {
            style: {
              fontSize: '13',
              color: '#fff'
            },
            staggerLines: 1
          },
          tickInterval: 4,
          tickLength: 0,
          lineWidth: 0,
          tickWidth: 0
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
          gridLineColor: '#1a78bd',
          gridLineWidth: 3,
          labels: {
            style: {
              fontSize: '13',
              color: '#fff'
            }
          },
          tickLength: 0,
          tickPixelInterval: 40
        },
        legend: {
          borderWidth: 0
        },
        series: [{
          name: that.dispatch.months,
          data: that.dispatch.number
        }]
      })
    }
    setTimeout(function () {
      setChart()
    }, 1500)
  },
  methods: {
    ...mapActions([
      'setDispatchQuery'
    ]),
    openPicker (picker) {
      this.$refs[picker].open()
    },
    handleChange (val) {
      this.setDispatchQuery({time: val})
    },
    handleChangeMonth (val) {
      let date = val
      console.log('va', val)
      console.log('va date', typeof date)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 10 ? month : '0' + month
      const monthdate = year + '-' + month
      this.setDispatchQuery({month: monthdate})
      const that = this
      function changeChart () {
        that.chart.series[0].update({
          name: that.dispatch.months,
          data: that.dispatch.number
        })
      }
      setTimeout(function () {
        changeChart()
      }, 2000)
    },
    initDispatch () {
      if (this.dispatch.refresh) {
        return
      }
      const time = GetDateStr(0)
      this.setDispatchQuery({time, brandId: 0, month: '2017-04'})
    },
    initBrand () {
      const brands = this.brands
      this.actions = []
      for (let i = 0, len = this.brands.length; i < len; i++) {
        let name = brands[i].brand
        let item = {
          name: name,
          method: () => {
            this.changeBrand(brands[i].id)
          }
        }
        this.actions.push(item)
      }
    },
    changeBrand (val) {
      this.setDispatchQuery({brandId: val})
    },
    spanClassChange (val) {
      const target = val.target
      const content = target.innerHTML
      if (content === '日期') {
        this.RisActive = true
        this.YisActive = false
      } else {
        this.RisActive = false
        this.YisActive = true
      }
    },
    hasClass (obj, cls) {
      if (!obj.className) {
        return false
      }
      return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    },
    addClass (obj, cls) {
      if (!this.hasClass(obj, cls)) obj.className += ' ' + cls
    },
    removeClass (obj, cls) {
      if (this.hasClass(obj, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
      }
    },
    toggleClass (obj, cls) {
      if (this.hasClass(obj, cls)) {
        this.removeClass(obj, cls)
      } else {
        this.addClass(obj, cls)
      }
    },
    changeContent (msg, event) {
      const target = event.target
      const titles = window.document.getElementsByClassName('dispatch-chart-detail__title')
      let count = 0
      for (let key in titles) {
        if (titles[key] === target) {
          count = key
        }
        this.removeClass(titles[key], 'dispatch-chart-detail__title--active')
      }
      this.addClass(target, 'dispatch-chart-detail__title--active')
      const contents = window.document.getElementsByClassName('dispatch-chart-content')
      for (let key in contents) {
        this.removeClass(contents[key], 'flex')
      }
      this.addClass(contents[count], 'flex')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .flex {
    display: flex!important;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .activeClass {
    color: #0b557a!important;
    background-color: white;
  }
  .dispatch {
    overflow: hidden;
    &-header-exp {
      display: flex;
      justify-content: center;
      width: 70%;
      position: absolute;
      top: 0;
      right: 0;
      padding-top: 11px;
      &__switch {
        flex: 2;
        span {
          border: 2px solid white;
          font-size: 1.4rem;
          color: white;
          padding: 0.2rem 1.2rem;
          &:first-child {
            border-radius: 15px 0 0 15px;
          }
          &:last-child {
            margin-left: -3px;
            border-radius: 0 15px 15px 0;
          }
        }
      }

      &__export {
        flex: 1;
        text-align: right;
        padding-right: 1rem;
        a {
          font-size: 1.4rem;
          color: white;
        }
      }
    }
    &-total {
      background-color: white;
      text-align: left;
      display: flex;
      font-size: 1.3rem;
      padding: .6rem 0;
      padding-left: 1rem;
      justify-content: space-between;
      &-action {
        color: rgb(0,0,0);
        padding-right: 2rem;
        background: url('../assets/min_ico_2r.png') no-repeat;
        background-size: 22% 50%;
        background-position: 92% 60%;
      }
      &-time {
        padding-right: 3.8rem;
        background-image: url('../assets/sta_ico_cal.png');
        background-repeat: no-repeat;
        background-size: 20% 100%;
        background-position: 85% 30%;
      }
    }
    &-content {
      &-title {
        padding: 0.5rem 1rem;
        text-align: left;
        background: #efeff4;
        font-size: 1.5rem;
      }

      &-detail {
        border-bottom: 1px solid #f1f1f1;
        padding: .4rem 0;
        display: flex;
        align-items: center;
       justify-content: center;
        div {
          flex: 1;
        }
        &__img {
          img {
            width: 50%;
          }
        }
        &__txt {
          text-align: left;
          font-size: 1.4rem;
          p {
            padding: .5rem 0;
          }
          span {
            color: #989898;
          }
        }
        &__count {
          line-height: 4rem;
          font-size: 1.6rem;
        }
      }
    }
    &-select-month {
      position: absolute;
      z-index: 200;
      right: 1rem;
      top: 4.4rem;
      background: white;
      border: none;
      padding: 0.5rem;
      border-radius: 10%;
    }
    &-chart {
      overflow-x: hidden;
      &-container {
        background-color: #0b557a;
        padding-top: .6rem;
        width: 100%;
        height: 50vh;
      }
      &-detail {
        border-bottom: 1px solid #cccccc;
        display: flex;
        align-items: center;
        &__title {
          flex: 1;
          padding: .6rem 0;
          font-size: 1.6rem;
          &--active {
            color: #0b557a;
          }
        }
      }

      &-content {
        display: none;
        // display: flex;
        flex-direction: column;
        &__line {
          flex: 1;
          display: flex;
          align-items: center;
          padding: .5rem;
          border-bottom: 1px solid #ececec;
          img {
            flex:1;
          }
          p {
            flex: 3;
            font-size: 1.5rem;
            text-align: left;
            padding-left: 1rem;
            &:last-child {
              flex: 1;
            }
          }
        }
      }
    }
  }

</style>
