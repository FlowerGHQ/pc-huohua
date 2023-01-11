<template>
  <!-- 合并单元格合并行 -->
  <div class="contain">
    <div class="left">
      <img src="@/assets/goods.jpg" alt="" />
    </div>
    <div class="right">
      <div class="inner">
        包邮小橘子好吃可口美味包邮小橘子好吃可口美味包邮小橘子好吃可口美味包邮小橘子好吃可口美味包邮小橘子好吃可口美味
      </div>
      <div class="bottom-all" :style="{ display: 'flex', justifyContent: 'space-between' }">
        <div class="left-bottom">
          <div class="middle red">9.4<span>|</span>热销71箱</div>
          <div class="bottom-one" style="color: red; font-size: 12px">
            <span class="number" style="color: red; font-size: 20px; font-weight: 700">26.5</span>
            <span class="yuan" style="color: #f1361d"> 元</span>
            <span style="color: #999; margin-left: 10px; text-decoration: line-through">27.9</span>
          </div>
        </div>
        <div class="right-bottom">
          <button style="width: 100px; background: #f1361d; color: #fff">立即购</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const oneArray = new Map()
export default {
  name: 'Table',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.contain
  display: flex
  align-items:center;
  padding: 30px;
  .left
    img
     width: 140px;
     height: 130px;
  .right
    width: 70%
    margin-left 10px
   .inner
    color #333
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
   .bottom-all
     display flex
     align-item center
     .red
      font-size 12px
      color #f1361d
      margin 0 10px
      .bottom-one
        font-size 12px !important
        margin-left 10px
</style>
