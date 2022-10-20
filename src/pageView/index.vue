<template>
  <div>
    <sunCreateCom
      :allSunCount="allSunCount"
      :sunData="sunData"
      @handleReceiveSun="handleReceiveSun"
    />
  </div>
</template>
<script>
import sunCreateCom from './ceshi.vue'
export default {
  components: {
    sunCreateCom
  },
  data() {
    return {
      //太阳的图片地址
      imgUrl: '',
      //太阳的样式 基础设计稿为w:375px
      sunImgStyle: {
        width: '60px',
        height: '60px'
      },
      //是否显示倒计时
      isShowCountDown: true,
      allSunCount: 6, //太阳总个数
      sunCountMax: 6, //太阳能显示的最大个数
      sunData: [], //太阳附带的数据
      yBase: 0, //Y轴基线坐标 单位：px
      ySpace: 0, //Y轴太阳与太阳之间间隔 单位：px
      xSpace: 10, //X轴太阳与太阳之间间隔 单位：px
      xMoveEnd: document.body.clientWidth / 2, //太阳动效到达的x轴位置  单位：px
      yMoveEnd: 400 //太阳动效到达的y轴位置  单位：px
    }
  },
  methods: {
    /**
     * 领取太阳
     * @param {object} data 领取的太阳的数据
     * @param {object} data.item 领取的太阳附带的数据
     * @param {number} data.index 领取的太阳的下标
     */
    handleReceiveSun(data) {
      //TODO:例如发请求等
      console.log(data, '=>data')
    }
  }
}
</script>
<style lang="less" scoped></style>
