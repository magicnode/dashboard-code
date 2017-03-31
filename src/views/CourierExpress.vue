<template>
     <div class="courier">
        <div class="courier-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="courier-date">
          <div class="courier-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="courierexpress.query.startTime | datestr">
            </div>
            <div>
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="courierexpress.query.endTime | datestr">
            </div>
          </div>
          <div class="courier-date-cover" style="z-index: 2000;" @click="changeModal">
          </div>
        </div>
        <div class="courier-total">
          <p>总计: {{courierexpress.num}}</p>
        </div>
        <div class="courier-express">
          <div class="courier-express-list" v-for="item in courierexpress.message" @click="openDetail(item)">
              <div class="courier-express-list__img">
                <img :src="item.img" alt="">
              </div>
              <div class="courier-express-list__detail">
                <p>单号: {{item.order_sn}}</p>
                <p>手机号: {{item.mobile}}</p>
              </div>      
          </div>
        </div>
        <mt-datetime-picker 
          ref="pickerLeft"
          type="date"
          v-model="courierexpress.query.startTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日" 
          @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker 
          ref="pickerRight"
          type="date"
          v-model="courierexpress.query.endTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { GetDateFormate } from 'helpers'

export default {
  name: 'courierdetail',
  created () {
    this.$store.commit('SET_TITLE', {title: '全部快递'})
    const query = this.$route.query
    if (!query.id) {
      Toast({
        message: '缺失信息, 无法查询'
      })
      return
    }
    this.id = query.id
    this.initCourierExpress(query)
  },
  computed: {
    ...mapGetters({
      brands: 'getBrands',
      userId: 'getUserId'
    }),
    ...mapState({
      courierexpress: modules => modules.courier.courierexpress
    })
  },
  data () {
    return {
      id: '0',
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      actions: []
    }
  },
  methods: {
    ...mapActions([
      'setCourierExpressQuery'
    ]),
    openPicker (picker) {
      this.$refs[picker].open()
    },
    initCourierExpress (query) {
      console.log('query', query)
      this.setCourierExpressQuery({id: query.id, expressstate: query.state, startTime: GetDateFormate(query.startTime), endTime: GetDateFormate(query.endTime), brandId: query.brandId})
    },
    handleChangeLeft (value) {
      console.log('1', value)
      this.setCourierExpressQuery({startTime: GetDateFormate(value)})
    },
    handleChange (value) {
      this.setCourierExpressQuery({endTime: GetDateFormate(value)})
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
    openDetail (item) {
      const query = {
        userId: this.userId,
        callee: item.mobile,
        expresstype: item.expresstype,
        brandId: item.brandId,
        code: item.code,
        orderSn: item.order_sn
      }
      this.$router.push({'path': 'orderdetail', query})
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
      background: #0b557a;
      text-align: center;
      display: block;
      color: rgb(255, 255, 255);
      font-size: 1.3rem;
      padding: .5rem 1rem;
      border-top: 1px solid white;
    }

    &-detail {
      background: #0b557a;
      padding: 1rem;
      img {
        width: 30%;
        border-radius: 50%;
      }
      p {
        padding-top: 1.1rem;
        color: white;
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
        justify-content: center;
        align-items: center;
        padding: 0 .4rem;
        border-bottom: 1px solid #f1f1f1;
        &__img {
          flex: 1;
          img {
            width: 4.1rem;
            vertical-align: baseline;
          }
        }
        &__detail {
          text-align: left;
          flex: 3;
          line-height: 2.4rem;
          padding: .4rem .3rem;
          p {
            font-size: 1.2rem;
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
