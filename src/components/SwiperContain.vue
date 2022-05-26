<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <!-- 如果需要分页器 -->
    <div v-if="pagination" class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <template v-if="controlButton">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </template>

    <!-- 如果需要滚动条 -->
    <div v-if="scrollBar" class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
// import '@base/assets/css/swiper.css' swiper 使用^2.7.6版本引入的css

export default {
  name: 'SwiperContainer',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    pagination: {
      type: Boolean,
      default: true
    },
    controlButton: {
      type: Boolean,
      default: false
    },
    scrollBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiper: undefined,
      defaultOptions: {
        observer: true,
        observeSlideChildren: true
      }
    }
  },
  computed: {
    /**
     * @introduction 计算属性-swiper参数
     * @description swiper参数
     * @param 无参数
     * @return 无返回类型
     * @exception {违例类型} 违例类型说明
     */
    option() {
      return Object.assign({}, this.defaultOptions, this.options)
    }
  },
  /**
   * @introduction mounted生命钩子
   * @description 初始化swiper
   * @param 无参数
   * @return 无返回类型
   * @exception {违例类型} 违例类型说明
   */
  mounted() {
    this.swiper = new Swiper('.swiper-container', this.option)
  },
  /**
   * @introduction beforeDestroy生命钩子
   * @description 销毁swiper实例
   * @param 无参数
   * @return 无返回类型
   * @exception {违例类型} 违例类型说明
   */
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy(false)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
