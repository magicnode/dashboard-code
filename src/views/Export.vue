<template>
     <div class="export">
       <h1>请输入您的邮箱并点击确定按钮</h1>
       <div class="export-box">
         <div>
           <input type="text" name="邮箱" value="" v-model="email">
         </div>
         <div>
           <mt-button plain type="default" @click="goExport">确定</mt-button>
         </div>
       </div>
     </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { GetDateFormate } from 'helpers'
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
      'userId': 'getUserId',
      'query': 'getDispatchQuery'
    })
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    goExport () {
      function isEmail (str) {
        const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        return reg.test(str)
      }
      const email = this.email
      if (!email) {
        Toast({
          message: 'email不能为空'
        })
        return
      }
      if (!isEmail(email)) {
        Toast({
          message: 'email格式不对, 请检查'
        })
        return
      }
      let month = this.query.month
      month = GetDateFormate(month)
      let url = ApiStore.export + '?userId=' + this.userId + '&email=' + this.email + '&month=' + month
      console.log('url', url)
      axios.post(url)
        .then(rs => {
          if (rs.status === 200) {
            Toast({
              message: '发送成功, 请查看邮箱'
            })
            return
          }
          Toast({
            message: '发送失败'
          })
        })
        .catch(err => {
          console.error(err)
          Toast({
            message: '发送失败, 请重试'
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
    padding-top: 1rem;
    display: flex;
    align-items: center;
    div {
      flex: 1;
      padding: 1rem;
      &:first-child {
        flex: 3;
        input {
          font-size: 1.2rem;
          border: 1px solid #999;
          padding: 1rem;
          width: 60%;
        }
      }
      button {
        width: 100%;
      }
    }
  }
}

</style>
