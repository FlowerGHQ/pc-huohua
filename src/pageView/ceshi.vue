<template>
  <div class="sun-container">
    <ul>
      <li
        v-for="(item, index) in actualSunData"
        :key="index"
        :style="sunStyle(item)"
        :class="isNoMore ? 'transition' : 'opacity'"
        @click="handleReceiveSun(item, index)"
      >
        <img :src="imgUrl" class="sun-img" :style="sunImg" ref="sunImg" />
        <p
          v-if="isShowCountDown && sunCountDownData[index]"
          class="surplus-time"
        >
          {{ sunCountDownData[index] }}<br />消失
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import sunImgUrl from '@/assets/super-1.jpg'
export default {
  props: {
    //太阳的图片地址
    imgUrl: {
      type: String,
      default: sunImgUrl
    },
    //太阳的样式
    sunImgStyle: {
      type: Object,
      default: function () {
        return {
          width: '60px',
          height: '60px'
        }
      }
    },
    //太阳总个数
    allSunCount: {
      type: Number,
      default: 0
    },
    //太阳能显示的最大个数
    sunCountMax: {
      type: Number,
      default: 6
    },
    //太阳附带的数据
    sunData: {
      type: Array,
      default: function () {
        return []
      }
    },
    //是否显示倒计时
    isShowCountDown: {
      type: Boolean,
      default: true
    },
    //Y轴基线坐标
    yBase: {
      type: Number,
      default: 0
    },
    //Y轴太阳与太阳之间间隔
    ySpace: {
      type: Number,
      default: 0
    },
    //X轴太阳与太阳之间间隔
    xSpace: {
      type: Number,
      default: 5
    },
    //太阳动效到达X轴位置
    xMoveEnd: {
      type: Number,
      default: document.body.clientWidth / 2
    },
    //太阳动效到达的Y轴位置
    yMoveEnd: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      //实际能显示的太阳个数
      sunCount: 0,
      //X轴基线坐标
      xBase: 0,
      //X轴太阳与太阳之间间隔
      xSpaceNum: 0,
      //Y轴太阳与太阳之间间隔
      ySpaceNum: 0,
      //记录被领取的太阳的X轴坐标
      oldX: 0,
      //记录被领取的太阳的Y轴坐标
      oldY: 0,
      //太阳动效到达X轴位置
      xMove: 0,
      //太阳动效到达Y轴位置
      yMove: 0,
      //当前页面body 默认字体大小，用于px转换rem
      fontSize: 0,
      //屏幕倍数
      clientMultiple: document.body.clientWidth / 375,
      //是否存在备用太阳数据
      isNoMore: true,
      //渲染的太阳数据
      actualSunData: [],
      //未渲染的太阳数据即备用数据
      moreSunData: [],
      //太阳图片实际样式
      sunImg: {},
      //太阳的半径
      sunR: 30,
      //倒计时
      countDownTimer: null,
      //倒计时数据
      sunCountDownData: []
    }
  },
  created() {
    this.init()
  },
  watch: {
    sunData(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.handleCountDownInterval()
    }
  },
  methods: {
    //初始化
    init() {
      this.initData()
      this.calcXBase()
      this.calcMoveCoordinate()
      this.calcSunImgStyle()
      this.initSun()
    },
    /**
     * 赋值
     */
    initData() {
      this.xSpaceNum = this.xSpace
      this.ySpaceNum = this.ySpace
    },
    /**
     * 领取太阳
     * @param {object} item 领取的太阳附带的数据
     * @param {number} index 领取的太阳的下标
     * 逻辑：
     * 1、领取的太阳运动至隐藏位置
     * 2、判断备用太阳数组是否存在数据
     * 3、暴露出领取太阳的操作
     */
    handleReceiveSun(item, index) {
      this.sunMove(item, index)
      setTimeout(() => {
        this.handleSupply(item, index)
      }, 2000)
      const data = {
        item,
        index
      }
      this.$emit('handleReceiveSun', data)
    },
    /**
     * 初始化太阳
     * */
    initSun() {
      this.caleSunCount()
    },
    /**
     * 计算实际显示的太阳个数
     * */
    caleSunCount() {
      if (this.allSunCount > this.sunCountMax) {
        this.sunCount = this.sunCountMax
      } else {
        this.sunCount = this.allSunCount
      }
      this.createSun(this.sunCount)
    },
    /**
     * 创建太阳
     * @param {number} count 需要初始化的太阳个数
     * 将需要显示的太阳的数据存于actualSunData数组
     * 将备用的太阳数据存于moreSunData数组，以备领取太阳后进行补充
     */
    createSun(count) {
      let index = 0
      while (index < count) {
        index++
        let y = this.calcY(index)
        let x = this.calcX(index)
        this.actualSunData.push({
          ...this.sunData[index - 1],
          index,
          x,
          y: y / this.fontSize,
          opacity: 1
        })
      }

      if (this.allSunCount > this.sunCountMax) {
        let otherIndex = 0
        while (otherIndex < this.allSunCount - this.sunCountMax) {
          otherIndex++
          this.moreSunData.push({
            ...this.sunData[this.allSunCount - otherIndex],
            opacity: 1
          })
        }
      }
    },
    /*
      计算领取太阳时运动到的坐标
      */
    calcMoveCoordinate() {
      this.xMove = (this.xMoveEnd * this.clientMultiple) / this.fontSize
      this.yMove = (this.yMoveEnd * this.clientMultiple) / this.fontSize
    },
    /*
      计算X轴基线坐标
      */
    calcXBase() {
      const htmlFontSize =
        document.getElementsByTagName('html')[0].style.fontSize
      this.fontSize = Number(htmlFontSize.replace('px', ''))
      this.xBase = document.body.clientWidth / 2
    },
    /*
      计算不同屏幕宽度下，相同px值时根据倍数进行适配
      */
    calcMultiple() {
      this.sunR = this.sunR * this.clientMultiple
      this.ySpaceNum = this.ySpaceNum * this.clientMultiple
      this.xSpaceNum = this.xSpaceNum * this.clientMultiple
    },
    /**
     * 计算传进来的太阳样式，将px转成rem
     * */
    calcSunImgStyle() {
      const sunStyle = {}
      for (var k in this.sunImgStyle) {
        if (this.sunImgStyle[k].indexOf('px') != -1) {
          sunStyle[k] = this.calcPxToRem(this.sunImgStyle[k])
        } else {
          sunStyle[k] = this.sunImgStyle[k]
        }
        if (k == 'width') {
          this.sunR = Number(this.sunImgStyle[k].replace('px', '')) / 2
          this.sunR = this.sunR * this.clientMultiple
        }
      }
      this.sunImg = sunStyle
    },
    /**
      px转rem
      * @param {string} str 带px的字符串
      * @return {string} px转成rem后的结果
      */
    calcPxToRem(str) {
      return (
        (Number(str.replace('px', '')) * this.clientMultiple) / this.fontSize +
        'rem'
      )
    },
    /**
      判断实际显示太阳为奇数/偶数
       * @param {number} num 太阳总数
       * @return {string} 奇数/偶数
      */
    oddOrEven(num) {
      return num % 2 === 0 ? 'even' : 'odd'
    },
    /**
      *计算哪几个下标的太阳在中间位置
      *@return {array} 在中间位置的太阳下标
      *公式：
      *总数为奇数时:Math.floor(总数/2)+(总数%2)
      *总数为偶数时:Math.floor(总数/2)
                  Math.floor(总数/2)+1
      */
    calcCenterSun() {
      if (this.oddOrEven(this.sunCount) == 'odd') {
        //奇数
        return [(this.sunCount % 2) + Math.floor(this.sunCount / 2)]
      } else {
        //偶数
        return [
          Math.floor(this.sunCount / 2),
          Math.floor(this.sunCount / 2) + 1
        ]
      }
    },
    /**
     * 计算X轴间隔
     * @return {number} X轴间隔
     *逻辑:
      1、获取当前设备的宽度
      2、计算去除当前所有太阳个数的宽度总和之后还剩余的空余宽度
      3、计算剩余的宽度计算每个太阳之间的间隔大小
      4、当间隔会出现负数或小于传进来的间隔大小时的情况时，使用传进来的间隔大小
      5、其他情况时，使用计算出来的间隔大小
     */
    calcXSpace() {
      const clientWidth = document.body.clientWidth
      const surplusWidth = (
        clientWidth -
        this.sunCount * (this.sunR * 2)
      ).toFixed(0)
      const space =
        Math.ceil(surplusWidth / (this.sunCount - 1)) + this.xSpaceNum / 2
      if (space < this.xSpaceNum) return this.xSpaceNum
      return space
    },
    /**
     * 计算太阳的Y轴坐标
     * @param {number} idx 太阳的下标
     * @return {number} 太阳的Y轴坐标(单位rem)
     * 公式
     *总数为奇数时:
     1、中间太阳的左边：Y轴基线 + (中间太阳的下标 - 当前太阳的下标) * (2*太阳半径 + Y轴太阳与太阳之间的间隔)
     2、中间太阳的右边：Y轴基线 + (当前太阳的下标 - 中间太阳的下标) * (2*太阳半径 + Y轴太阳与太阳之间的间隔)
     *总数为偶数时:
     1、左边中间太阳的左边：Y轴基线 + (左边中间太阳的下标 - 当前太阳的下标) * (2*太阳半径 + Y轴太阳与太阳之间的间隔)
     2、右边中间太阳的右边：Y轴基线 + (当前太阳的下标 - 右边中间太阳的下标) * (2*太阳半径 + Y轴太阳与太阳之间的间隔)

     公式中为2*太阳半径，代码中太阳半径未*2的原因：
     若是*2，则太阳排版呈锐角三角型、趋向于直角梯形的样式，故而减少太阳与太阳之间Y轴的间隔大小
     */
    calcY(idx) {
      const centerSunArr = this.calcCenterSun()
      let multiple = 0
      if (centerSunArr.includes(idx)) {
        return this.yBase
      }
      if (this.oddOrEven(this.sunCount) == 'odd') {
        //奇数
        if (idx < centerSunArr[0]) {
          //中间的太阳的左边
          multiple = centerSunArr[0] - idx
        } else {
          //中间的太阳的右边
          multiple = idx - centerSunArr[0]
        }
      } else {
        //偶数
        if (idx < centerSunArr[0]) {
          //中间的太阳的左边
          multiple = centerSunArr[0] - idx
        }
        if (idx > centerSunArr[1]) {
          //中间的太阳的右边
          multiple = idx - centerSunArr[1]
        }
      }
      return this.yBase + multiple * (this.sunR + this.ySpaceNum)
    },
    /**
     * 计算太阳的X轴坐标
     * @param {number} idx 太阳的下标
     * @return {number} 太阳的X轴坐标(单位rem)
     * 公式
      *总数为奇数时:
     1、中间太阳：X轴基线 - 太阳的半径
     2、中间太阳的左边：中间太阳的坐标 - ((中间太阳的下标 - 当前太阳的下标) * (2*太阳半径 + X轴太阳与太阳之间的间隔)）
     3、中间太阳的右边：中间太阳的坐标 + ((当前太阳的下标 - 中间太阳的下标) * (2*太阳半径 + X轴太阳与太阳之间的间隔))
     *总数为偶数时:
     1、左边中间太阳：X轴基线 - 太阳的半径*2 - X轴太阳与太阳之间的间隔/2
        右边中间太阳：X轴基线 + 太阳的半径*2
     2、左边中间太阳的左边：左边中间太阳 - ((中间太阳的下标 - 当前太阳的下标) * (2*太阳半径 + X轴太阳与太阳之间的间隔)）
     3、右边中间太阳的右边：右边中间太阳 + (当前太阳的下标 - 右边中间太阳的下标) * (2*太阳半径 + Y轴太阳与太阳之间的间隔)

     总数为偶数时左边中间太阳的左边需要减去：2*太阳的半径+X轴间隔的原因：
     总数为偶数时，位于中间的太阳有两个，两个太阳会重合，需要将奇数下标的太阳移除至X轴基线的左部
     */
    calcX(idx) {
      const centerSunArr = this.calcCenterSun()
      const xSpaceNum = this.calcXSpace()
      let xCoordinate = 0
      if (this.oddOrEven(this.sunCount) == 'odd') {
        const cenSunX = this.xBase - this.sunR
        //奇数
        if (centerSunArr.includes(idx)) {
          //如果为中间的太阳
          xCoordinate = cenSunX
        }
        if (idx < centerSunArr[0]) {
          //中间的太阳的左边
          xCoordinate =
            cenSunX - (2 * this.sunR + xSpaceNum) * (centerSunArr[0] - idx)
        }
        if (idx > centerSunArr[0]) {
          //中间的太阳的右边
          xCoordinate =
            cenSunX + (2 * this.sunR + xSpaceNum) * (idx - centerSunArr[0])
        }
      } else {
        //偶数
        if (centerSunArr.includes(idx)) {
          if (idx == centerSunArr[0]) {
            xCoordinate = this.xBase - 2 * this.sunR - xSpaceNum / 2
          }
          if (idx == centerSunArr[1]) {
            xCoordinate = this.xBase + xSpaceNum / 2
          }
        }
        if (idx < centerSunArr[0]) {
          //中间的太阳的左边
          xCoordinate =
            this.xBase -
            2 * this.sunR -
            xSpaceNum / 2 -
            (centerSunArr[0] - idx) * (2 * this.sunR + xSpaceNum)
        }
        if (idx > centerSunArr[1]) {
          //中间的太阳的右边
          xCoordinate =
            this.xBase +
            xSpaceNum / 2 +
            (idx - centerSunArr[1]) * (2 * this.sunR + xSpaceNum)
        }
      }
      return xCoordinate / this.fontSize
    },
    /**
     * 太阳倒计时定时器
     */
    handleCountDownInterval() {
      setCountTimeData.call(this)
      clearInterval(this.countDownTimer)
      this.countDownTimer = setInterval(() => {
        setCountTimeData.call(this)
      }, 1000 * 60)
      /** 设置时间数据 */
      function setCountTimeData() {
        this.sunCountDownData = this.sunData.map(
          (item) => this.handleCountDown(item.deadline) || ''
        )
        this.countDownTimerFinish()
      }
    },
    /**
     * 太阳倒计时
     * @param {number} deadline 领取截止时间 毫秒制
     * @return {string} hh:mm
     * 逻辑：
     * 1、与当前时间相对比，计算出时间差
     * 2、如果该时间差不大于24小时，则显示倒计时，否则不显示
     */
    handleCountDown(deadline) {
      const nowTime = new Date().getTime() / 1000
      let receiveS = Math.ceil(nowTime)
      let deadlineS = Math.ceil(deadline)
      // 领取时间差-单位秒
      let time = deadlineS - receiveS //秒
      // 一天的秒数
      const showTime = 24 * 60 * 60
      // 剩余小时数
      const restHour = time / 3600
      var h =
        Math.floor(restHour) < 10
          ? '0' + Math.floor(restHour)
          : Math.floor(restHour)
      var m =
        Math.floor((time / 60) % 60) < 10
          ? '0' + Math.floor((time / 60) % 60)
          : Math.floor((time / 60) % 60)
      // 剩余时间不大于一天，才展示倒计时，否则只展示太阳
      if (time <= showTime) {
        return h + ':' + m
      } else {
        return false
      }
    },
    /**
     * 倒计时是否已经结束
     * 逻辑：
     * 若倒计时已结束，若存在备用数据则进行太阳补充，否则太阳消失
     */
    countDownTimerFinish() {
      this.sunCountDownData.map((item, index) => {
        if (item == '00:00') {
          //如果倒计时结束，该太阳消失，若还有多余的太阳数据，补充
          this.actualSunData[index].opacity = 0
          this.isNoMore = true
          if (this.moreSunData.length) {
            const sunItem = this.moreSunData.shift()
            sunItem.x = this.actualSunData[index].x
            sunItem.y = this.actualSunData[index].y
            sunItem.index = index
            setTimeout(() => {
              this.isNoMore = false
              this.$set(this.actualSunData, index, sunItem)
            }, 500)
          }
        }
      })
    },
    /**
     * 太阳的样式
     * @param {object} item 每个太阳的数据
     */
    sunStyle(item) {
      return {
        top: `${item.y}rem`,
        left: `${item.x}rem`,
        opacity: item.opacity
      }
    },
    /**
     * 领取太阳时的动效
     * @param {object} item 领取的太阳附带的数据
     * @param {number} index 领取的太阳的下标
     * 逻辑：
     * 1、点击太阳进行领取时，记录点击该太阳的X、Y轴坐标数据
     * 2、将该太阳的X、Y轴坐标数据设置为需运动到的位置的X、Y轴坐标
     * 3、设置该太阳的透明度，进行隐藏
     * 4、重新设置该太阳的数据
     * 5、执行CSS3样式
     */
    sunMove(item, index) {
      this.oldX = item.x
      this.oldY = item.y
      item.x = this.xMove
      item.y = this.yMove
      item.opacity = 0
      this.$set(this.actualSunData, index, item)
    },
    /**
     * 判断是否有备用太阳数据
     *  @param {object} item 领取的太阳附带的数据
     *  @param {number} index 领取的太阳的下标
     * 逻辑：
     * 1、判断是否有备用太阳数据
     * 2、如果存在备用太阳数据，则将备用太阳第一条数据的X、Y轴、下标设置为领取的太阳相对应数据
     * 3、将备用太阳第一条数据替换领取的太阳的数据，并删除备用太阳第一条数据
     * 4、否则则没有备用数据，太阳消失，不进行补充
     * 定时器作用：
     * 将isNoMore重新设置，以致达到修改样式的目的
     * 原因：若不重置，领取太阳后，若有补充的太阳，补充的太阳会从隐藏的位置出发，到达指定的排布的位置
     * 但我们要的是直接修改透明度而已，即直接在原位置显示
     */
    handleSupply(item, index) {
      if (this.moreSunData.length) {
        this.isNoMore = false
        this.moreSunData[0].x = this.oldX
        this.moreSunData[0].y = this.oldY
        this.moreSunData[0].index = item.index
        this.$set(this.actualSunData, index, this.moreSunData.shift())
      }
      setTimeout(() => {
        this.isNoMore = true
      }, 600)
    }
  }
}
</script>
<style lang="less" scoped>
.sun-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: red;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    li {
      position: absolute;
      animation: wave 2.5s infinite ease-in-out;
      img {
        width: 60px;
        height: 60px;
      }
      .surplus-time {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        text-align: center;
        font-size: 10px;
        font-weight: bold;
        color: #c12400;
      }
    }
    @keyframes wave {
      0% {
        transform: translateY(-4px);
      }
      50% {
        transform: translateY(4px);
      }
      100% {
        transform: translateY(-4px);
      }
    }
    .transition {
      transition: all 0.5s;
    }
    .opacity {
      transition: opacity 0.5s;
    }
  }
}
</style>
