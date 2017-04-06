<template>
     <div class="courier">
       <div class="courier-detail">
          <div class="">
             品&nbsp;&nbsp;&nbsp;牌: <span>{{data.brand}}</span>
             <img src="../assets/rec_btn_rec.png" alt="" @click="popupVisible = !popupVisible">
          </div>
          <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade">
            <img :src="data.url | failimg" alt="">
          </mt-popup>
          <div class="">
            运单号: <span>{{data.orderSn}}</span>
          </div>
          <div class="">
            货架号: <span>{{data.code}}</span>
          </div>
          <div class="">
            手机号: <span>{{data.callee}}</span>
          </div>
          <div class="">
            类&nbsp;&nbsp;&nbsp;型: <span>{{data.expresstype | expresstype}}</span>
          </div>
       </div>
       
       <div class="courier-info">
         <div class="courier-info__title">
           <p>操作记录</p>
           <p>路由信息</p>
         </div>
         <div class="courier-info__detail flex-box">
           <div class="flex-box-item">
             时间
           </div>
           <div class="flex-box-item">
             操作
           </div>
           <div class="flex-box-item">
             状态
           </div>
           <div class="flex-box-item">
             操作人
           </div>
         </div>
         <div class="courier-info__detail flex-box" v-for="item in data.details">
           <div class="flex-box-item">
             {{item.createTime}}
           </div>
           <div class="flex-box-item">
             {{item.operation | expressoperation}}
           </div>
           <div class="flex-box-item">
             {{item.state | expressstate}}
           </div>
           <div class="flex-box-item">
             {{item.name}}
           </div>
         </div>
       </div>
     </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui'
import axios from 'axios'
import ApiStore from 'ApiStore'

export default {
  name: 'courierdetail',
  created () {
    this.$store.commit('SET_TITLE', {title: '快递详情'})
    Indicator.open()
    const query = this.$route.query
    console.log('order detail query', query)
    axios.get(ApiStore.courierorderdetail, {
      params: query
    }).then(rs => {
      if (rs.status === 200) {
        this.data = rs.data
        console.log('data', this.data)
        Toast({
          message: '数据加载成功'
        })
      } else {
        Toast({
          message: '数据加载失败'
        })
      }
      Indicator.close()
    })
    .catch(err => {
      console.error(err)
      Indicator.close()
      Toast({
        message: '数据加载失败'
      })
    })
  },
  computed: {
  },
  data () {
    return {
      data: {},
      popupVisible: false
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@dsblue: #0b557a;
@lightgrey: #efeff4;
.flex {
  display: flex;
}
.flex-box {
  display: flex;
  .flex-box-item {
    flex: 1;
    padding: .5rem .5rem;
  }
}
.courier {
  &-detail {
    div {
      text-align: left;
      padding: 0.7rem 1rem;
      border-bottom: 1px solid #ececec;
      span {
        padding-left: 1rem;
        color: @dsblue;
      }
      img {
        width: 15%;
        float: right;
      }
    }
  }
  &-info {
    background-color: white;
    margin-top: 1rem;
    border-top: 1px solid #ececec;
    &__title {
      padding: .5rem 1rem;
      display: flex;
      border-bottom: 1px solid #ececec;
      p {
        flex: 1;
        &:last-child {
          color: @dsblue;
        }
      }
    }
  }
}

.mint-popup {
  img {
    width: 100%;
    max-width: 20rem;
  }
}
</style>
