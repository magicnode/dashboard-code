<template>
     <div class="income">
        <div class="income-total">
            总计: {{total}} 元
        </div>
        <div class="income-tab">
          <div class="income-tab-switch">
            <div @click="tabSwitch('money')">
              <span v-bind:class="{ 'tab-active': CisActive}">现金支付</span>
            </div>
            <div @click="tabSwitch('paynet')">
                <span v-bind:class="{ 'tab-active': OisActive}">网上支付</span>
            </div>
          </div>
          <div v-for="item in tabData" @click="linkPayDetail(item.order_id)" class="income-tab-content">
            <div class="income-tab-content__intro" >
              <span>{{item.pay_time | datetimestamp}}</span>
              <span class="type">{{item.expressType | expresstype}}</span>
            </div>
            <div class="income-tab-content__detail">
              <div class="img">
                <img :src="item.brandId | brandimg" :alt="item.brandId | brand">
              </div>
              <div class="order-id">
                <p>{{item.order_id}}</p>
                <p>{{item.phonenum}} <span class="weight">{{'重量:' + item.weight + 'kg'}}</span></p>
              </div>
              <div class="pay">
                {{'+ ' + item.fee  }}
              </div>
            </div>
          </div >

        </div>
     </div>
</template>
<script>
import { Toast } from 'mint-ui'
import {feedtype} from 'helpers'
import ApiStore from 'ApiStore'
import {dateFormateStamp as datetimestamp, getExpresstype as expresstype} from '../filters'
import axios from 'axios'

export default {
  name: 'incomegenera',
  created () {
    const query = this.$route.query
    let title = query.feetype || ''
    title = feedtype(title)
    this.$store.commit('SET_TITLE', {title})
    axios.get(ApiStore.incomegenera, {
      params: query
    })
    .then(rs => {
      // console.log('rs', rs.data)
      if (rs.status === 200) {
        const data = rs.data
        this.paynet = data.paynet
        this.money = data.money
        this.tabData = this.money
        for (let i = 0, len = this.money.length; i < len; i++) {
          this.total += Number(this.money[i].fee)
        }
        for (let i = 0, len = this.paynet.length; i < len; i++) {
          this.total += Number(this.paynet[i].fee)
        }
        return
      }
      Toast({
        message: '数据加载失败'
      })
    })
    .catch(err => {
      console.error(err)
    })
  },
  data () {
    return {
      total: 0,
      tab: 'cash',
      CisActive: true,
      OisActive: false,
      paynet: [],
      money: [],
      tabData: []
    }
  },
  filters: {
    datetimestamp,
    expresstype
  },
  methods: {
    tabSwitch (val) {
      if (val === 'money') {
        this.CisActive = true
        this.OisActive = false
      } else {
        this.CisActive = false
        this.OisActive = true
      }
      this.tabData = this[val]
    },
    linkPayDetail (orderId) {
      const query = {
        orderId: orderId
      }
      this.$router.push({'path': 'detail', query})
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
