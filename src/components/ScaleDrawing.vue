<template>
    <div>
      <div class="scaledrawing">
        <span>{{name}}</span>
        <div class="scaledrawing__line">
          <i :style="'width:' +  count/10 + '%'" class="scaledrawing__line--i"></i>
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
