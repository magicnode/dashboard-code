<template>
     <div class="income">
        <div class="income-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="income-date">
          <div class="income-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="nowday">
            </div>
            <div>              
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="nowday">
            </div>
          </div>
          <div class="income-date-cover" style="z-index: 2000;" @click="changeModal">
          </div>
        </div>
        <div class="income-total">
          <div class="select-back" @click="changesheetVisible">
            {{brand}}
          </div>
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
          <div class="border-both select-back" @click="changepaysheetVisible">
               {{paytype}}
          </div>
          <mt-actionsheet
            :actions="payactions"
            v-model="paysheetVisible">
          </mt-actionsheet>
          <div>
            共计: {{total}}
          </div>
        </div>
        <div class="income-time">
          <span>{{format_date_left}}</span>
          <span>--</span>
          <span>{{format_date_right}}</span>
        </div>
        <div class="income-express">
          <div class="income-express-list" v-for="item in incomes" @click="goDetail(incomeinfo[item].name)">
              <div class="income-express-list-img">
                <img :src="incomeinfo[item].imgsrc" alt="">
              </div>
              <div class="income-express-list-time">
                <p>{{incomeinfo[item].name}}</p>
              </div>
              <div class="income-express-list-total">
                + {{incomeinfo[item].total}}
              </div>          
          </div>
        </div>
        <mt-datetime-picker ref="pickerLeft" type="date" v-model="dateLeft" @confirm="handleChange">
        </mt-datetime-picker>
        <mt-datetime-picker ref="pickerRight" type="date" v-model="dateRight" @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { Toast } from 'mint-ui'
// import { apiUrl } from '../../config/index'
import sendpayPng from '../assets/inc_ico_sen.png'
import promisePng from '../assets/inc_ico_pro.png'
import proxPng from '../assets/inc_ico_col.png'
import destinationPng from '../assets/inc_ico_to.png'
import dispatchPng from '../assets/inc_ico_dis.png'

export default {
  name: 'income',
  created () {
    // get info by useid
    // const query = this.$route.query
    // const userId = query.userId || 2367
    this.$http.get('http://192.168.0.201:8890/StatisticalReports/send?userId=2367&startTime=&endTime=&brandId=0&type=0').then(response => {
      // success callback
      console.log('response', response)
    }, response => {

    })

    this.$store.commit('setTitle', '收入统计')
    let nowdate = new Date()
    nowdate = nowdate.getFullYear() + '-' + (nowdate.getMonth() + 1) + '-' + nowdate.getDate()
    this.dateRight = this.dateLeft = nowdate
    this.nowday = nowdate
    this.format_date_left = nowdate
    this.format_date_right = nowdate
  },
  data () {
    return {
      total: 1500,
      nowday: null,
      dateLeft: null,
      format_date_left: null,
      dateRight: null,
      format_date_right: null,
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      brand: '全部品牌',
      paytype: '支付宝支付',
      actions: [{
        name: '全部品牌',
        method: ''
      }],
      payactions: [{
        name: '支付宝支付',
        method: () => {
          this.paytype = '支付宝支付'
        }
      }, {
        name: '微信支付',
        method: () => {
          this.paytype = '微信支付'
        }
      }, {
        name: '余额支付',
        method: () => {
          this.paytype = '余额支付'
        }
      }, {
        name: '现金支付',
        method: () => {
          this.paytype = '现金支付'
        }
      }],
      incomes: ['sendpay', 'promise', 'proxmoney', 'destinationpay', 'dispatchpay'],
      incomeinfo: {
        sendpay: {
          imgsrc: sendpayPng,
          name: '寄件费',
          total: 1000
        },
        promise: {
          imgsrc: promisePng,
          name: '保价',
          total: 1000
        },
        proxmoney: {
          imgsrc: proxPng,
          name: '代收货款',
          total: 1000
        },
        destinationpay: {
          imgsrc: destinationPng,
          name: '到付费',
          total: 1000
        },
        dispatchpay: {
          imgsrc: dispatchPng,
          name: '派件费',
          total: 1000
        }
      },
      time: {
        year: 2017,
        month: 3,
        date: 10
      }
    }
  },
  methods: {
    openPicker (picker) {
      this.$refs[picker].open()
    },
    handleChange (value) {
      Toast({
        message: '已选择 ' + value.toString(),
        position: 'bottom'
      })
    },
    changesheetVisible () {
      this.sheetVisible ? this.sheetVisible = false : this.sheetVisible = true
    },
    changepaysheetVisible () {
      this.paysheetVisible ? this.paysheetVisible = false : this.paysheetVisible = true
    },
    changeModal () {
      this.modalVisi ? (this.modalVisi = false) : (this.modalVisi = true)
    },
    goDetail (name) {
      this.$router.push({'path': 'income/genera?type=' + name})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .flex {
    display: flex;
  }
  .income {
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
    &-total {
      border-top: 1px solid rgb(0, 51, 102);
      background-color: rgb(11, 85, 122);
      text-align: center;
      display: block;
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
      padding: .8rem 0;
      display: flex;
      .border-both {
        border-left: 1px solid #003366;
        border-right: 1px solid #003366;
      }
      .select-back {
        background: url('../assets/min_ico_3r.png') no-repeat scroll right center transparent;
        background-size: 14% 41%;
        background-position: 95% 6px;
      }
      div {
        flex:1;
        font-size:1.3rem;
      }
    }
    
    &-time {
      padding: 0.5rem 0;
      font-size: 1.2rem;
      color: #666;
      border-bottom: 1px solid #999;
    }
    
    &-express {
      &-list {
        .flex;      
        padding: .3rem .4rem;
        border-bottom: 1px solid #f1f1f1;
        &-img {
          flex: 1;
          img {
            width: 3.4rem;
            vertical-align: baseline;
          }
        }

        &-time {
          text-align: left;
          flex: 3;
          line-height: 3rem;
          padding: .4rem .3rem;
          p {
            font-size: 1.4rem;
          }
          span {
            color: gray;
            padding-top: 0.15rem;
          }
        }

        &-total {
          flex: 2;
          text-align: right;
          padding-right: 0.6rem;
          line-height: 3.6rem;
          font-size: 1.6rem;
          font-weight: 600;
        }
      }

    }

    &-date {
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
  }

</style>
