<template>
     <div class="dispatch">
        <div class="dispatch-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="dispatch-date">
          <div class="dispatch-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="dateLeft | datestr">
            </div>
            <div>              
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="dateRight | datestr">
            </div>
          </div>
          <div class="dispatch-date-cover" style="z-index: 2000;" @click="modalVisi = !modalVisi">
          </div>
        </div>
        <div class="dispatch-express">
          <h1 v-if="expressinfo.length === 0" style="padding-top: 1rem;font-size:1.6rem;">数据为空</h1>
          <div class="dispatch-express-list" v-for="item in expressinfo" @click.stop="goOrderDetail(item)">
              <div class="dispatch-express-list-img">
                <img :src="item.brandId | brandimg" :alt="item.brandId | brand">
              </div>
              <div class="dispatch-express-list-time">
                <p>{{item.order_sn}}</p>
                <span>{{item.create_time}}</span>
              </div>
              <div class="dispatch-express-list-total">
                {{item.state | expressoperation}}
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
import { mapGetters } from 'vuex'
import axios from 'axios'
import ApiStore from 'ApiStore'
import { GetDateStr, GetDateFormate } from 'helpers'
import window from 'window'

export default {
  name: 'dispatchdetail',
  created () {
    this.$store.commit('SET_TITLE', {title: '详情'})
    let nowdate = new Date()
    nowdate = nowdate.getFullYear() + '-' + (nowdate.getMonth() + 1) + '-' + nowdate.getDate()
    this.nowday = nowdate
    this.dateLeft = window.localStorage.getItem('dispatchDetailDateLeft') || nowdate
    this.dateRight = window.localStorage.getItem('dispatchDetailDateRight') || nowdate
    const query = this.$route.query
    const params = {
      state: query.state || 0,
      time: query.time || GetDateStr(0),
      brandId: query.brandId || 0,
      startTime: '',
      endTime: ''
    }
    this.getDetail(params)
  },
  computed: {
    ...mapGetters({
      userId: 'getUserId'
    })
  },
  data () {
    return {
      total: 1500,
      nowday: null,
      dateLeft: null,
      dateRight: null,
      modalVisi: false,
      state: 0,
      brandId: 0,
      expressinfo: [],
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
      const params = {
        state: this.state,
        time: '',
        brandId: this.brandId || 0,
        startTime: GetDateFormate(this.dateLeft),
        endTime: GetDateFormate(this.dateRight)
      }
      this.getDetail(params)
    },
    changeModal () {
      this.modalVisi ? (this.modalVisi = false) : (this.modalVisi = true)
    },
    getDetail (params) {
      params.userId = this.userId
      axios.get(ApiStore.dispatchDetail, {
        params
      }).then(rs => {
        console.log('rs', rs)
        if (rs.status === 200) {
          this.expressinfo = rs.data
        } else {
          Toast({
            message: '获取失败'
          })
        }
      })
    },
    goOrderDetail (item) {
      const query = {
        brandId: item.brandId,
        userId: this.userId,
        orderSn: item.order_sn,
        code: item.code,
        expresstype: item.expresstype
      }
      window.localStorage.setItem('dispatchDetailDateLeft', GetDateFormate(this.dateLeft))
      window.localStorage.setItem('dispatchDetailDateRight', GetDateFormate(this.dateRight))
      this.$router.push({path: '/courier/orderdetail', query})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .flex {
    display: flex;
  }
  .dispatch {
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
      padding: .6rem 0;
    }

    &-express {
      &-list {
        .flex;      
        align-items: center;
        padding: 1rem .4rem;
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
