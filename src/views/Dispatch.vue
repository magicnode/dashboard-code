<template>
     <div class="dispatch">
        <div class="dispatch-header-exp">
          <div class="dispatch-header-exp__switch" @click="spanClassChange">
            <span v-bind:class="{activeClass: RisActive}">日期</span>
            <span v-bind:class="{activeClass: YisActive}">月份</span>
          </div>
          <div class="dispatch-header-exp__export">
            <a href="#/dispatch" title="">导出</a>
          </div>
        </div>
        <div v-if="RisActive">
          <div class="dispatch-total">
            <div  @click="sheetVisible=true" class="dispatch-total-action">
              全部快递
            </div>
            <div class="dispatch-total-time" @click="openPicker('pickerLeft')">
              2017-03-11
            </div>
          </div>
          <div v-for="(val, key, index) in dispatchData" class="dispatch-content">
            <div class="dispatch-content-title">
              {{ key | getDispatchType}} {{ dataCount[key]}}
            </div>
            <div v-for="item in val" class="dispatch-content-detail">
              <div class="dispatch-content-detail__img">
                <img :src="item.img" alt="">
              </div>
              <div class="dispatch-content-detail__txt">
                <p>{{ item.name}}</p>
                <span>{{item.time}}</span>
              </div>
              <div class="dispatch-content-detail__count">
                {{item.count}}
              </div>
            </div>
          </div>
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
        <mt-datetime-picker ref="pickerLeft" type="date" v-model="modalVisi" @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { getDispatchType } from '../filters'

import comePng from '../assets/sta_ico_sin.png'
import selfPng from '../assets/sta_ico_sto.png'
import assignPng from '../assets/sta_ico_dis.png'
import signPng from '../assets/sta_ico_sig.png'
import backPng from '../assets/sta_ico_ret.png'
import donePng from '../assets/sta_ico_pro.png'

export default {
  name: 'dispatch',
  created () {
    this.$store.commit('setTitle', '')
    let nowdate = new Date()
    nowdate = nowdate.getFullYear() + '-' + (nowdate.getMonth() + 1) + '-' + nowdate.getDate()
    this.dateRight = this.dateLeft = nowdate
    this.nowday = nowdate
  },
  filters: {
    getDispatchType
  },
  data () {
    return {
      total: 1500,
      nowday: null,
      dateLeft: null,
      modalVisi: false,
      RisActive: true,
      YisActive: false,
      sheetVisible: false,
      actions: [{
        name: '顺丰快递',
        method () {

        }
      }, {
        name: '申通快递',
        method () {

        }
      }],
      dataCount: {
        enter: 10,
        out: 20,
        in: 20,
        question: 60
      },
      dispatchData: {
        enter: [
          {
            name: '到件',
            img: comePng,
            time: '2017-3-11',
            count: 0
          },
          {
            name: '自提件',
            img: selfPng,
            time: '2017-3-18',
            count: 0
          },
          {
            name: '分派件',
            img: assignPng,
            time: '2017-3-20',
            count: 0
          }
        ],
        out: [
          {
            name: '签收',
            img: signPng,
            time: '2017-3-11',
            count: 0
          },
          {
            name: '退回',
            img: backPng,
            time: '2017-3-18',
            count: 0
          }
        ],
        in: [
          {
            name: '到件',
            img: comePng,
            time: '2017-2-11',
            count: 0
          },
          {
            name: '自提件',
            img: selfPng,
            time: '2017-3-18',
            count: 0
          },
          {
            name: '分派件',
            img: assignPng,
            time: '2017-3-18',
            count: 0
          }
        ],
        question: [
          {
            name: '已解决',
            img: donePng,
            time: '2017-3-11',
            count: 0
          },
          {
            name: '未解决',
            img: donePng,
            time: '2017-3-18',
            count: 0
          }
        ]
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
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .flex {
    display: flex;
  }
  .activeClass {
    color: #0b557a!important;
    background-color: white;
  }
  .dispatch {
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
        padding-right: 3rem;
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
  }

</style>
