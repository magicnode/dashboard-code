<template>
      <div class="ds-container">
        <mt-header :title = "title">
          <mt-button class="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
        <div class="ds-container-content">
          <router-view></router-view>
        </div>
      </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'index',
  created () {
    this.$store.commit('SET_TITLE', {title: '统计报表'})
  },
  data () {
    return {
      date: null,
      modalVisi: false
    }
  },
  methods: {
    goBack () {
      this.$router.go('-1')
    }
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
 .ds-container {
    header.mint-header {
      .back {
        width: 41px;
        background: url('../assets/back.png') no-repeat;
        background-size: 21px 21px;
        background-position: 0px 9px;
      }
      background-color: #0b557a;
      padding: 0.8rem 1.4rem;
      h1{
        font-size: 1.7rem;
      }
    }
 }
</style>
