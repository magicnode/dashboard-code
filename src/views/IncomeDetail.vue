<template>
    <div class="incomedetail">
        <div class="incomedetail-cell">
            <div class="incomedetail-cell-box pay-state">
                交易成功
            </div>
            <div class="incomedetail-cell-box pay-count">
                + 5.00
            </div>
            <div class="incomedetail-cell-box pay-type">
                <img src="../assets/cos_ico_sen.png" height="35" width="35" alt="现金">
                <span>现金支付</span>
            </div>
        </div>
        <div class="incomedetail-cell bt">
            <div class="incomedetail-cell-box detail-data">
                <label>品&nbsp;&nbsp;&nbsp;牌&nbsp;&nbsp;:</label><span>申通快递</span>
            </div>
            <div class="incomedetail-cell-box detail-data">
                <label>运单号&nbsp;&nbsp;:</label><span>申通快递</span>
            </div>
            <div class="incomedetail-cell-box detail-data">
                <label>手机号&nbsp;&nbsp;:</label><span>1300250154212</span>
            </div>
            <div class="incomedetail-cell-box detail-data">
                <label>类&nbsp;&nbsp;&nbsp;型&nbsp;&nbsp;:</label><span>普通件</span>
            </div>
            <div class="incomedetail-cell-box detail-data">
                <label>重&nbsp;&nbsp;&nbsp;量&nbsp;&nbsp;:</label><span>4kg</span>
            </div>
            <div class="incomedetail-cell-box detail-data">
                <label>时&nbsp;&nbsp;&nbsp;间&nbsp;&nbsp;:</label><span>2016-09-20 14:30</span>
            </div>
        </div>
    </div>
</template>
<script>
// import { Toast } from 'mint-ui'
import shunfengPng from '../assets/shunfeng.png'

export default {
  name: 'incomedetail',
  created () {},
  data () {
    return {
      total: 1500,
      tab: 'cash',
      isActive: true,
      detail: {
        brand: '申通',
        img: shunfengPng,
        type: '普通件',
        pay: '5.00',
        phonenum: '130025212552',
        order_id: '154578524654564564',
        weight: '4',
        date: '2016-09-20',
        minute: '14:32'
      }
    }
  },
  methods: {
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
