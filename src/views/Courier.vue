<template>
     <div class="courier">
        <div class="courier-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="courier-date">
          <div class="courier-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="dateLeftFormate">
            </div>
            <div>
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="dateRightFormate">
            </div>
          </div>
          <div class="courier-date-cover" style="z-index: 2000;" @click="changeModal">
          </div>
        </div>
        <div class="courier-total">
          <div class="select-back" @click="changesheetVisible">
            {{ brand }}
          </div>
          <div class="courier-total-time">
            <span>{{startTime}}</span>
            <span>--</span>
            <span>{{endTime}}</span>
          </div>
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
        </div>
        <div class="courier-express">
          <div class="courier-express-list" v-for="item in couriers" @click="goDetail(item)">
              <div class="courier-express-list-img">
                <img :src="item.img" alt="">
              </div>
              <div class="courier-express-list-time">
                <p>{{item.name}}</p>
              </div>
              <div class="courier-express-list-total">
                <p>派件：{{item.deliveryNum}}</p>
                <p class="sign">签收：{{item.signNum}}</p>
              </div>          
          </div>
        </div>
        <mt-datetime-picker 
          ref="pickerLeft"
          type="date"
          v-model="dateLeft"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日" 
          @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker 
          ref="pickerRight"
          type="date"
          v-model="dateRight"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import { mapState } from 'vuex'
import axios from 'axios'
/* eslint-disable no-unused-vars */
import courierPng from '../assets/man_btn_peo.png'
import sendpayPng from '../assets/inc_ico_sen.png'
import promisePng from '../assets/inc_ico_pro.png'
import proxPng from '../assets/inc_ico_col.png'
import destinationPng from '../assets/inc_ico_to.png'
import dispatchPng from '../assets/inc_ico_dis.png'

export default {
  name: 'courier',
  created () {
    this.$store.commit('setTitle', '快递员')
    this.initCourierData()
  },
  data () {
    return {
      courierData: {},
      couriers: [],
      total: 1500,
      nowday: null,
      dateLeft: null,
      dateRight: null,
      startTime: null,
      endTime: null,
      brandId: 0,
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      brand: '全部品牌',
      actions: [{
        name: 0,
        method: () => {
          this.changeBrand(0)
        }
      }]
    }
  },
  computed: {
    ...mapState(['api', 'userId'])
  },
  methods: {
    openPicker (picker) {
      this.$refs[picker].open()
    },
    initCourierData () {
      const query = this.$route.query
      const userId = query.userId || 2367
      this.$store.commit('setUserId', userId)
      const startTime = query.startTime || '2017-01-15'
      const endTime = query.endTime || '2017-03-15'
      const brandId = query.brandId || '0'
      this.userId = userId
      this.startTime = this.dateLeftFormate = startTime
      this.endTime = this.dateRightFormate = endTime
      this.brandId = brandId
      this.setCourierData()
    },
    getUrl () {
      const url = this.api.courier + '?userId=' + this.userId + '&startTime=' + this.startTime + '&endTime=' + this.endTime + '&brandId=' + this.brandId
      return url
    },
    setCourierData () {
      let instance = axios.create({
        timeout: 2000
      })
      instance.get(this.getUrl())
        .then((res) => {
          if (res.status === 200) {
            const data = res.data
            this.courierData = data
            this.couriers = this.courierData.courier
            const brands = data.brand
            for (let i = 0, len = this.couriers.length; i < len; i++) {
              if (!this.couriers[i].img) {
                this.couriers[i].img = courierPng
              }
            }
            this.actions = [{
              name: '全部品牌',
              method: () => {
                this.changeBrand(0, '全部品牌')
              }
            }]
            for (let i = 0, len = brands.length; i < len; i++) {
              let name = brands[i].brand
              let item = {
                name: name,
                method: () => {
                  this.changeBrand(brands[i].id, name)
                }
              }
              this.actions.push(item)
            }
            Toast({
              message: '数据获取成功!',
              position: 'bottom'
            })
          } else {
            Toast({
              message: '数据获取失败!',
              position: 'bottom'
            })
          }
        })
        .catch(err => {
          console.error(err)
          MessageBox.confirm('超时, 点击确认刷新').then(action => {
            this.setCourierDate()
          })
        })
    },
    changeBrand (val, name) {
      this.brandId = val
      this.brand = name
      const that = this
      setTimeout(function () {
        that.setCourierData()
      }, 500)
    },
    handleChangeLeft (value) {
      this.dateLeftFormate = this.getTime(value)
    },
    handleChange (value) {
      this.dateRightFormate = this.getTime(value)
      this.startTime = this.dateLeftFormate
      this.endTime = this.dateRightFormate
      this.setCourierData()
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
    changesheetVisible () {
      this.sheetVisible ? this.sheetVisible = false : this.sheetVisible = true
    },
    changepaysheetVisible () {
      this.paysheetVisible ? this.paysheetVisible = false : this.paysheetVisible = true
    },
    changeModal () {
      this.modalVisi ? (this.modalVisi = false) : (this.modalVisi = true)
    },
    goDetail (item) {
      this.$router.push({'path': 'courier/detail?id=' + item.id + '&img=' + item.img + '&name=' + item.name})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .flex {
    display: flex;
  }
  .courier {
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
      text-align: center;
      display: block;
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
      padding: .8rem 1rem;
      display: flex;
      border-bottom: 1px solid #999;
      &-time {
        color: #666;
      }
      .border-both {
        border-left: 1px solid #003366;
        border-right: 1px solid #003366;
      }
      .select-back {
        text-align: left;
        color: black;
        background: url('../assets/min_ico_2r.png') no-repeat scroll right center transparent;
        background-size: 10% 40%;
        background-position: 50% 6px;
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
        padding: .4rem .4rem;
        border-bottom: 1px solid #f1f1f1;
        &-img {
          flex: 1;
          img {
            border-radius: 50%;
            width: 3.5rem;
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
          line-height: 1.9rem;
          font-size: 1.4rem;
          .sign {
            color: #0661a2;
          }
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
