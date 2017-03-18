<template>
     <div class="dispatch">
        <div class="dispatch-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="dispatch-date">
          <div class="dispatch-date-choose">
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
          <div class="dispatch-date-cover" style="z-index: 2000;">
          </div>
        </div>
        <div class="dispatch-total">
          总计: {{total}}
        </div>
        <div class="dispatch-express">
          <div class="dispatch-express-list" v-for="item in expressname">
              <div class="dispatch-express-list-img">
                <img :src="expressinfo[item].imgsrc" alt="">
              </div>
              <div class="dispatch-express-list-time">
                <p>{{expressinfo[item].name}}</p>
                <span>{{expressinfo[item].time}}</span>
              </div>
              <div class="dispatch-express-list-total">
                {{expressinfo[item].total}}
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

import shentongPng from '../assets/shentong.png'
import shunfengPng from '../assets/shunfeng.png'
import yuantongPng from '../assets/yuantong.png'

export default {
  name: 'dispatchdetail',
  created () {
    this.$store.commit('setTitle', '详情')
    let nowdate = new Date()
    nowdate = nowdate.getFullYear() + '-' + (nowdate.getMonth() + 1) + '-' + nowdate.getDate()
    this.dateRight = this.dateLeft = nowdate
    this.nowday = nowdate
  },
  data () {
    return {
      total: 1500,
      nowday: null,
      dateLeft: null,
      dateRight: null,
      modalVisi: false,
      expressname: ['shentong', 'shunfeng', 'yuantong'],
      expressinfo: {
        shentong: {
          imgsrc: shentongPng,
          name: '申通快递',
          time: '2017-3-11',
          total: 1000
        },
        shunfeng: {
          imgsrc: shunfengPng,
          name: '顺风快递',
          time: '2017-3-11',
          total: 1000
        },
        yuantong: {
          imgsrc: yuantongPng,
          name: '圆通快递',
          time: '2017-3-11',
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
    changeModal () {
      this.modalVisi ? (this.modalVisi = false) : (this.modalVisi = true)
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
