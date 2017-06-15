<template>
    <div>
      <div class="scaledrawing">
        <span>{{name | brand}}</span>
        <div class="scaledrawing__line">
          <i :style="'width:' +  iwidth + '%'" class="scaledrawing__line--i"></i>
        </div>
        <span>{{count + unit}}</span>
      </div>
    </div>
</template>
<script>

export default {
  name: 'scaledrawing',
  props: {
    name: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      iwidth: 0
    }
  },
  created () {
    const cot = this.count
    this.iwidth = this.numToPer(cot)
  },
  methods: {
    numToPer (val) {
      val = Number(val)
      if (!val) return 0
      let per = 1
      let len = val.toString().length
      per = (len - 2) > 0 ? Math.pow(10, (len - 2)) : 1
      val = val / per
      return val
    }
  }
}
</script>
<style lang="less" scoped>
.scaledrawing {
  padding: .5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    font-size: 1.2rem;
    flex: 1;
  }
  &__line {
    flex: 4;
    height: 1rem;
    background: #dfe9ec;
    i {
      display: block;
      width: 0;
      height: 100%;
      background: #ff7835;
      transition: all 1s;
    }
  }
}
</style>
