<template>
     <div class="list">
        <ul>
            <li v-for="item in lists" @click="handleChange(item.value)">
              <img :src="item.src" alt="">
            </li >
        </ul>
     </div>
</template>
<script>
import dispatchPng from '../assets/sta_btn_dis.png'
import sendPng from '../assets/sta_btn_sen.png'
import incomePng from '../assets/sta_btn_inc.png'
import courierPng from '../assets/sta_btn_peo.png'

export default {
  name: 'list',
  created () {
    this.$store.commit('setTitle', '统计报表')
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
    handleChange (val) {
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
