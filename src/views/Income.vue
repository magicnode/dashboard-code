<template>
     <div class="income">
        <div class="income-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="income-date">
          <div class="income-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="format_date_left">
            </div>
            <div>              
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="format_date_right">
            </div>
          </div>
          <div class="income-date-cover" style="z-index: 2000;" @click="changeModal">
          </div>
        </div>
        <div class="income-total">
          <div class="select-back" @click="changesheetVisible">
            {{brandname}}
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
            共计: {{incomeData.total}}
          </div>
        </div>
        <div class="income-time">
          <span>{{incomeData.startTime}}</span>
          <span>--</span>
          <span>{{incomeData.endTime}}</span>
        </div>
        <div class="income-express">
          <div class="income-express-list" v-for="item in incomes" @click="goDetail(incomeData[item].name)">
              <div class="income-express-list-img">
                <img :src="incomeData[item].imgsrc" :alt="incomeData[item].name">
              </div>
              <div class="income-express-list-time">
                <p>{{incomeData[item].name}}</p>
              </div>
              <div class="income-express-list-total">
                + {{incomeData[item].total}}
              </div>          
          </div>
        </div>
        <mt-datetime-picker ref="pickerLeft" type="date" v-model="dateLeft" @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker ref="pickerRight" type="date" v-model="dateRight" @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'income',
  created () {
    this.$store.commit('setTitle', '收入统计')
    const that = this
    this.actions = this.brand.map(function (item) {
      let arr = {}
      arr.name = item.brand
      arr.method = () => {
        that.changeBrand(item.id, item.brand)
      }
      return arr
    })
    this.getIncome()
    this.format_date_left = this.incomeData.startTime
    this.format_date_right = this.incomeData.endTime
  },
  data () {
    return {
      nowday: null,
      dateLeft: null,
      dateRight: null,
      format_date_left: null,
      format_date_right: null,
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      brandname: '全部品牌',
      paytype: '支付宝支付',
      actions: [],
      payactions: [{
        name: '支付宝支付',
        method: () => {
          this.changePayType(1, '支付宝支付')
        }
      }, {
        name: '微信支付',
        method: () => {
          this.changePayType(2, '微信支付')
        }
      }, {
        name: '余额支付',
        method: () => {
          this.changePayType(3, '余额支付')
        }
      }, {
        name: '现金支付',
        method: () => {
          this.changePayType(4, '现金支付')
        }
      }],
      incomes: ['sendpay', 'promise', 'proxmoney', 'destinationpay', 'dispatchpay'],
      time: {
        year: 2017,
        month: 3,
        date: 10
      }
    }
  },
  computed: {
    ...mapState(['brand', 'incomeData'])
  },
  methods: {
    ...mapActions({
      getIncome: 'GET_INCOME',
      setIncomeQuery: 'SET_INCOME_QUERY'
    }),
    openPicker (picker) {
      this.$refs[picker].open()
    },
    changeBrand (val, name) {
      this.brandname = name
      this.setIncomeQuery({brandId: val})
      this.getIncome()
    },
    changePayType (val, name) {
      this.paytype = name
      this.setIncomeQuery({type: val})
      this.getIncome()
    },
    getTime (val) {
      let time = new Date(val)
      let month = time.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      time = time.getFullYear() + '-' + month + '-' + time.getDate()
      return time
    },
    handleChangeLeft (value) {
      this.format_date_left = this.getTime(value)
    },
    handleChange (value) {
      this.format_date_right = this.getTime(value)
      if (new Date(this.format_date_left).getTime() <= new Date(this.format_date_right).getTime()) {
        this.setIncomeQuery({startTime: this.format_date_left, endTime: this.format_date_right})
        this.getIncome()
        Toast({
          message: '时间已经选择完毕'
        })
      } else {
        Toast({
          message: '时间选择出错, 截止时间不能大于开始时间'
        })
      }
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
