<template>
     <div class="courier">
        <div class="courier-changedate" @click="changeModal"></div>
        <div v-if="modalVisi" class="courier-date">
          <div class="courier-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="courierdetailquery[id].startTime | datestr">
            </div>
            <div>
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="courierdetailquery[id].endTime | datestr">
            </div>
          </div>
          <div class="courier-date-cover" style="z-index: 2000;" @click="changeModal">
          </div>
        </div>
        <div class="courier-total">
          <div class="select-back" @click="changesheetVisible">
            {{courierdetailquery[id].brandId | brand}}
          </div>
          <div class="courier-total-time">
            <span>{{courierdetailquery[id].startTime | datestr}}</span>
            <span>--</span>
            <span>{{courierdetailquery[id].endTime | datestr}}</span>
          </div>
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
          </mt-actionsheet>
        </div>
        <div class="courier-detail">
          <img :src="img | courierimg" alt="">
          <p>{{ name }}</p>
        </div>
        <div class="courier-express">
          <div class="courier-express-list" @click="openIN2(0)">
              <div class="courier-express-list-img">
                <img src="../assets/sta_ico_dis.png" alt="">
              </div>
              <div class="courier-express-list-time">
                <p>正在派件</p>
              </div>
              <div class="courier-express-list-total">
                <p v-if="courierdetail[id]" class="sign">{{courierdetail[id].send}}</p>
                <p v-else class="sign">0</p>
              </div>          
          </div>
          <div class="courier-express-list" @click="openIN2(301)">
              <div class="courier-express-list-img">
                <img src="../assets/sta_ico_sig.png" alt="">
              </div>
              <div class="courier-express-list-time">
                <p>签收</p>
              </div>
              <div class="courier-express-list-total">
                <p v-if="courierdetail[id]" class="sign">{{courierdetail[id].sign}}</p>
                <p v-else class="sign">0</p>
              </div>          
          </div>
          <div class="courier-express-list" @click="openIN2(302)">
              <div class="courier-express-list-img">
                <img src="../assets/sta_ico_ret.png" alt="">
              </div>
              <div class="courier-express-list-time">
                <p>退回</p>
              </div>
              <div class="courier-express-list-total">
                <p v-if="courierdetail[id]" class="sign">{{courierdetail[id].back}}</p>
                <p v-else class="sign">0</p>
              </div>
          </div>
        </div>
        <mt-datetime-picker 
          ref="pickerLeft"
          type="date"
          v-model="courierdetailquery[id].startTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日" 
          @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker 
          ref="pickerRight"
          type="date"
          v-model="courierdetailquery[id].endTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleChange">
        </mt-datetime-picker>
     </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { Toast, Indicator } from 'mint-ui'
import { GetDateFormate } from 'helpers'

export default {
  name: 'courierdetail',
  created () {
    this.$store.commit('SET_TITLE', {title: '快递员'})
    const query = this.$route.query
    if (!query.id) {
      Toast({
        message: '缺失信息, 无法查询'
      })
      return
    }
    this.name = query.name
    this.img = query.img
    this.id = query.id
    this.initCourierDetail()
    this.initBrand()
    const that = this
    setTimeout(function () {
      that.$forceUpdate()
    }, 1500)
  },
  computed: {
    ...mapGetters({
      brands: 'getBrands',
      userId: 'getUserId'
    }),
    ...mapState({
      courierdetail: modules => modules.courier.courierdetail,
      courierdetailquery: modules => modules.courier.courierdetailquery
    })
  },
  data () {
    return {
      id: '0',
      name: '',
      img: '',
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      actions: []
    }
  },
  methods: {
    ...mapActions([
      'setCourierDetailQuery'
    ]),
    openPicker (picker) {
      this.$refs[picker].open()
    },
    initBrand () {
      const brands = this.brands
      this.actions = []
      for (let i = 0, len = brands.length; i < len; i++) {
        let name = brands[i].brand
        let item = {
          name: name,
          method: () => {
            this.changeBrand(brands[i].id)
          }
        }
        this.actions.push(item)
      }
    },
    changeBrand (val) {
      Indicator.open()
      this.setCourierDetailQuery({id: this.id, brandId: val})
          .then(rs => {
            setTimeout(function () {
              Indicator.close()
            }, 1500)
            this.$nextTick(function () {
            })
            const that = this
            setTimeout(function () {
              that.$forceUpdate()
            }, 2000)
          })
          .catch(err => {
            console.error(err)
            Indicator.close()
          })
    },
    initCourierDetail () {
      const query = this.$route.query
      this.setCourierDetailQuery({id: this.id, startTime: GetDateFormate(query.startTime), endTime: GetDateFormate(query.endTime), brandId: query.brandId})
    },
    handleChangeLeft (value) {
      this.setCourierDetailQuery({id: this.id, startTime: GetDateFormate(value)})
    },
    handleChange (value) {
      this.setCourierDetailQuery({id: this.id, endTime: GetDateFormate(value)})
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
    openIN2 (val) {
      const query = {
        id: this.id,
        userId: this.userId,
        startTime: GetDateFormate(this.courierdetailquery[this.id].startTime),
        endTime: GetDateFormate(this.courierdetailquery[this.id].endTime),
        state: val,
        brandId: this.courierdetailquery[this.id].brandId
      }
      this.$router.push({'path': 'express', query})
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
      font-size: 1.5rem;
      padding: .8rem 1rem;
      display: flex;
      &-time {
        color: #999;
      }
      .border-both {
        border-left: 1px solid #003366;
        border-right: 1px solid #003366;
      }
      .select-back {
        color: white;
        text-align: left;
        background: url('../assets/min_ico_2r.png') no-repeat scroll right center transparent;
        background-size: 10% 40%;
        background-position: 50% 6px;
      }
      div {
        flex:1;
        font-size:1.3rem;
      }
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
          line-height: 3.9rem;
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
