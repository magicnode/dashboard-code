<template>
     <div class="list">
        <ul>
            <li v-for="item in lists" @click="handleChange(item.value)">
              <img :src="item.src" alt="">
              <span></span>
            </li >
        </ul>
     </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import dispatchPng from '../assets/sta_btn_dis.png'
import sendPng from '../assets/sta_btn_sen.png'
import incomePng from '../assets/sta_btn_inc.png'
import courierPng from '../assets/sta_btn_peo.png'

export default {
  name: 'list',
  created () {
    this.$store.commit('SET_TITLE', {title: '统计报表'})
    const query = this.$route.query
    const userId = query.userId
    // 2367
    if (userId === undefined && !this.userId) {
      Toast({
        message: '未定义用户id, 无法正常查询数据'
      })
      return false
    } else if (userId) {
      console.log('use action')
      this.setUserId({userId})
    }
    console.log('user', this.userId)
    this.setBrands()
  },
  computed: {
    ...mapGetters({
      userId: 'getUserId'
    })
    // ...mapState({
    //   userId: modules => modules.user.userId
    // })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '统计报表',
      lists: [{
        value: 'dispatch',
        src: dispatchPng
      }, {
        value: 'send',
        src: sendPng
      }, {
        value: 'income',
        src: incomePng
      }, {
        value: 'courier',
        src: courierPng
      }]
    }
  },
  methods: {
    ...mapActions({
      setBrands: 'setBrands',
      setUserId: 'setUserId'
    }),
    handleChange (val) {
      if (val === 'send') {
        Toast({
          message: '暂未开放, 敬请期待'
        })
        return
      }
      this.$router.push({path: val})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .list {
    ul {
      li {
        text-align: center;
        padding-top: 1.4rem;
        img {
          width: 92%;
        }
      }
    }
  }
</style>
