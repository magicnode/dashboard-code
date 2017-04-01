<template>
    <div class="">
      <div class="incomedetail" v-for="item in detail">
          <div class="incomedetail-cell">
              <div class="incomedetail-cell-box pay-state">
                  交易状态{{item.status}}
              </div>
              <div class="incomedetail-cell-box pay-count">
                  + {{item.fee}}
              </div>
              <div class="incomedetail-cell-box pay-type">
                  <img src="../assets/cos_ico_sen.png" height="35" width="35" alt="现金">
                  <span>{{item.pay_type | paytype}}</span>
              </div>
          </div>
          <div class="incomedetail-cell bt">
              <div class="incomedetail-cell-box detail-data">
                  <label>品&nbsp;&nbsp;&nbsp;牌&nbsp;&nbsp;:</label><span>{{item.brandId | brand}}</span>
              </div>
              <div class="incomedetail-cell-box detail-data">
                  <label>运单号&nbsp;&nbsp;:</label><span>{{item.orderSn}}</span>
              </div>
              <div class="incomedetail-cell-box detail-data">
                  <label>手机号&nbsp;&nbsp;:</label><span>{{item.mobile}}</span>
              </div>
              <div class="incomedetail-cell-box detail-data">
                  <label>类&nbsp;&nbsp;&nbsp;型&nbsp;&nbsp;:</label><span>{{item.expresstype | expresstype}}</span>
              </div>
              <div class="incomedetail-cell-box detail-data">
                  <label>重&nbsp;&nbsp;&nbsp;量&nbsp;&nbsp;:</label><span>{{item.weight + 'kg'}}</span>
              </div>
              <div class="incomedetail-cell-box detail-data">
                  <label>时&nbsp;&nbsp;&nbsp;间&nbsp;&nbsp;:</label><span>{{item.pay_time | datetimestamp}}</span>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import axios from 'axios'
import ApiStore from 'ApiStore'
import {dateFormateStamp as datetimestamp, getExpresstype as expresstype, paytype} from '../filters'

export default {
  name: 'incomedetail',
  created () {
    const query = this.$route.query
    this.$store.commit('SET_TITLE', {title: '订单详细'})
    axios.get(ApiStore.incomedetail, {
      params: query
    })
    .then(rs => {
      console.log('rs', rs.data)
      console.log('rs', rs.request.responseURL)
      if (rs.status === 200) {
        const data = rs.data
        this.detail = data
        return
      }
      Toast({
        message: '数据加载失败'
      })
    })
    .catch(err => {
      console.error(err)
      Toast({
        message: '数据加载失败'
      })
    })
  },
  data () {
    return {
      total: 1500,
      isActive: true,
      detail: {}
    }
  },
  filters: {
    datetimestamp,
    expresstype,
    paytype
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bt {
  border-top: 1px solid #f1f1f1;
}

.incomedetail {
    &-cell {
        text-align: left;
        disply: flex;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 1rem;
        &-box {
            padding: 0.5rem 0.8rem;
            border-bottom: 1px solid #f1f1f1;
        }
        .pay-state {
            font-size: 1.4rem;
            color: #ff6d40;
        }
        .pay-count {
            text-align: center;
            font-size: 3rem;
        }
        .pay-type {
            padding-left: 0.6rem;
            font-size: 1.4rem;
        }
        .detail-data {
          font-size: 1.4rem;
          span {
            color: #0661a2;
            letter-spacing: .5rem;
            padding-left: 1rem;
          }
        }
    }
}
</style>
