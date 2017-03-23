<template>
     <div class="income">
        <div class="income-total">
            总计: {{total}} 元
        </div>
        <div class="income-tab">
          <div class="income-tab-switch">
            <div @click="tabSwitch('cash')">
              <span v-bind:class="{ 'tab-active': CisActive}">现金支付</span>
            </div>
            <div @click="tabSwitch('online')">
                <span v-bind:class="{ 'tab-active': OisActive}">网上支付</span>
            </div>
          </div>
          <div v-for="item in tabData" @click="linkPayDetail(item)" class="income-tab-content">
            <div class="income-tab-content__intro" >
              <span>{{item.date}}</span><span class="minute">{{item.minute}}</span>
              <span class="type">{{item.type}}</span>
            </div>
            <div class="income-tab-content__detail">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="order-id">
                <p>{{item.order_id}}</p>
                <p>{{item.phonenum}} <span class="weight">{{'重量:' + item.weight + 'kg'}}</span></p>
              </div>
              <div class="pay">
                {{'+ ' + item.pay}}
              </div>
            </div>
          </div >
        </div>
     </div>
</template>
<script>
// import { Toast } from 'mint-ui'
import shunfengPng from '../assets/shunfeng.png'

export default {
  name: 'incomegenera',
  created () {
    const query = this.$route.query
    const title = query.type || ''
    this.$store.commit('setTitle', title)
    this.tabData = this.cash
  },
  data () {
    return {
      total: 1500,
      tab: 'cash',
      CisActive: true,
      OisActive: false,
      tabData: [],
      cash: [{
        brand: '申通',
        img: shunfengPng,
        type: '普通件',
        pay: '5.00',
        phonenum: '130025212552',
        order_id: '154578524654564564',
        weight: '4',
        date: '2016-09-20',
        minute: '14:32'
      }, {
        brand: '顺丰',
        type: '普通件',
        img: shunfengPng,
        pay: '5.00',
        phonenum: '130025212552',
        order_id: '15457852',
        weight: '100',
        date: '2016-10-20',
        minute: '14:01'
      }],
      online: [{
        brand: '顺丰',
        img: shunfengPng,
        type: '普通件',
        pay: '15.00',
        phonenum: '130025212552',
        order_id: '15457852',
        weight: '10',
        date: '2016-09-20',
        minute: '14:32'
      }, {
        brand: '申通',
        type: '普通件',
        img: shunfengPng,
        pay: '55.00',
        phonenum: '130025212552',
        order_id: '15457852',
        weight: '400',
        date: '2016-09-20',
        minute: '14:32'
      }]
    }
  },
  methods: {
    tabSwitch (val) {
      if (val === 'cash') {
        this.CisActive = true
        this.OisActive = false
      } else {
        this.CisActive = false
        this.OisActive = true
      }
      this.tabData = this[val]
    },
    linkPayDetail (item) {
      this.$router.push({'path': 'detail'})
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
    &-total {
      border-top: 1px solid rgb(0, 51, 102);
      background-color: rgb(11, 85, 122);
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
      padding: .6rem 0;
    }
    
    &-tab {
      &-switch {
        display: flex;
        border-bottom: 1px solid #ccc;
        span {
          padding: .6rem 1.6rem;
        }
        .tab-active {
          border-bottom: 3px solid #0b557a;
        }
        div {
          text-align: center;
          flex: 1;
          padding: .6rem 0rem;
          font-size: 1.3rem;
        }
      }

      &-content {
        margin-top: .8rem;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        &__intro {
          font-size: 1.3rem;
          color: #999;
          text-align: left;
          padding: .4rem 0;
          padding-left: .8rem;
          border-bottom: 1px solid #f1f1f1;
          .minute {
            padding-left: 1rem;
          }
          .type {
            color: #ff6600;
            float: right;
            padding-right: 1rem;
          }
        }
        &__detail {
          padding: 1rem 1rem;
          display: flex;
          div {
            font-size: 1.3rem;
            color: #666;
            img {
              width: 4rem;
            }
          }
          .img {
            flex: 1 
          }
          .order-id {
            flex: 4;
            line-height: 2rem;
            padding-top: .4rem;
            padding-left: .7rem;
            .weight {
              white-space: nowrap;
              padding: .4rem .6rem;
              color: white;
              background-color: #f18716;
            }
            p {
              text-align: left;
            }
          }
          .pay {
            flex: 1;
            line-height: 60px;
          }
        }
      }

    }
  }

</style>
