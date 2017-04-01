<template>
     <div class="courier">
        <div class="courier-changedate" @click="modalVisi = !modalVisi"></div>
        <div v-if="modalVisi" class="courier-date">
          <div class="courier-date-choose">
            <div style="text-align: right;padding-right:.3rem;" @click="openPicker('pickerLeft')">
              <input type="text" name="" readonly :value="courierquery.startTime | datestr">
            </div>
            <div>
              <span>—</span>
            </div>
            <div style="text-align: left;padding-left: .3rem;" @click="openPicker('pickerRight')">
              <input type="text" name="" readonly :value="courierquery.endTime | datestr">
            </div>
          </div>
          <div class="courier-date-cover" style="z-index: 2000;" @click="modalVisi = !modalVisi">
          </div>
        </div>
        <div class="courier-total">
          <div class="select-back" @click="sheetVisible = !sheetVisible">
            {{ courierquery.brandId | brand }}
          </div>
          <div class="courier-total-time">
            <span>{{courierquery.startTime | datestr}}</span>
            <span>--</span>
            <span>{{courierquery.endTime | datestr}}</span>
          </div>
        </div>
        <div class="courier-express">
          <div class="courier-express-list" v-for="item in courier" @click="goDetail(item)">
              <div class="courier-express-list-img">
                <img :src="item.img | courierimg" alt="">
              </div>
              <div class="courier-express-list-time">
                <p>{{item.name}}</p>
              </div>
              <div class="courier-express-list-total">
                <p>派件：{{item.deliveryNum}}</p>
                <p class="sign">签收：{{item.signNum}}</p>
              </div>          
          </div>
        </div>
        <mt-datetime-picker 
          ref="pickerLeft"
          type="date"
          v-model="courierquery.startTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日" 
          @confirm="handleChangeLeft">
        </mt-datetime-picker>
        <mt-datetime-picker 
          ref="pickerRight"
          type="date"
          v-model="courierquery.endTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleChange">
        </mt-datetime-picker>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
     </div>

</template>
<script>
// import { Toast } from 'mint-ui'
import { mapActions, mapState, mapGetters } from 'vuex'
import { GetDateStr, GetDateFormate } from 'helpers'

export default {
  name: 'courier',
  created () {
    this.$store.commit('SET_TITLE', {title: '快递员'})
    this.initCourierData()
    this.initBrand()
  },
  data () {
    return {
      total: 1500,
      modalVisi: false,
      sheetVisible: false,
      paysheetVisible: false,
      actions: []
    }
  },
  computed: {
    ...mapState({
      courier: modules => modules.courier.courier,
      courierquery: modules => modules.courier.courierquery
    }),
    ...mapGetters({
      brands: 'getBrands',
      userId: 'getUserId'
    })
  },
  methods: {
    ...mapActions([
      'setCourierQuery'
    ]),
    openPicker (picker) {
      this.$refs[picker].open()
    },
    initCourierData () {
      if (this.courier) {
        return
      }
      const startTime = GetDateStr(-30)
      const endTime = GetDateStr(0)
      this.setCourierQuery({startTime, endTime, brandId: 0})
    },
    initBrand () {
      const brands = this.brands
      this.actions = []
      for (let i = 0, len = this.brands.length; i < len; i++) {
        let name = brands[i].brand
        let item = {
          name: name,
          method: () => {
            this.changeBrand(brands[i].id, name)
          }
        }
        this.actions.push(item)
      }
    },
    changeBrand (val) {
      this.setCourierQuery({brandId: val})
    },
    handleChangeLeft (value) {
      this.setCourierQuery({startTime: GetDateFormate(value)})
    },
    handleChange (value) {
      this.setCourierQuery({endTime: GetDateFormate(value)})
    },
    goDetail (item) {
      let query = {id: item.id, img: item.img, name: item.name}
      query = Object.assign(query, this.courierquery)
      this.$router.push({'path': 'courier/detail', query})
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
      text-align: center;
      display: block;
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
      padding: .8rem 1rem;
      display: flex;
      border-bottom: 1px solid #999;
      &-time {
        color: #666;
      }
      .border-both {
        border-left: 1px solid #003366;
        border-right: 1px solid #003366;
      }
      .select-back {
        text-align: left;
        color: black;
        background: url('../assets/min_ico_2r.png') no-repeat scroll right center transparent;
        background-size: 10% 40%;
        background-position: 50% 6px;
      }
      div {
        flex:1;
        font-size:1.3rem;
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
          line-height: 1.9rem;
          font-size: 1.4rem;
          .sign {
            color: #0661a2;
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
