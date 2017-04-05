<template>
     <div class="export">
       <h1>请输入您的邮箱并点击确定按钮</h1>
       <div class="export-box">
         <div>
           <input type="text" name="邮箱" value="" v-model="email">
         </div>
         <div>
           <mt-button type="default" @click="goExport">确定</mt-button>
         </div>
       </div>
     </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import axios from 'axios'
import ApiStore from 'ApiStore'
// import window from 'window'

export default {
  name: 'export',
  created () {
    this.$store.commit('SET_TITLE', {title: '导出'})
  },
  computed: {
    ...mapGetters({
      'userId': 'getUserId'
    })
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    goExport () {
      let url = ApiStore.export + '?userId=' + this.userId + '&email=' + this.email
      axios.post(url)
        .then(rs => {
          if (rs.status === 200) {
            Toast({
              message: '成功'
            })
            return
          }
          Toast({
            message: '失败'
          })
        })
        .catch(err => {
          console.error(err)
          Toast({
            message: '失败'
          })
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.export {
  padding-top: 5rem;
  h1 {
    font-size: 1.8rem;
  }
  &-box {
    display: flex;
    align-items: center;
    div {
      flex: 1;
      padding: 1rem;
      &:first-child {
        flex: 3;
        input {
          padding: 1rem;
        }
      }
    }
  }
}

</style>
