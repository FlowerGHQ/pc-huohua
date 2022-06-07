<template>
  <div class="hello">
    <el-container class="container-all">
      <el-header height="80px">
        <div class="left">
          <img src="@/assets/YFDRDGSMC.png" alt="" />
        </div>
      </el-header>
      <el-main class="main-content">
        <div
          style="
            --swiper-navigation-color: #fff;
            --swiper-pagination-color: #fff;
          "
          class="swiper mySwiper"
        >
          <div class="swiper-wrapper">
            <div class="parallax-bg" data-swiper-parallax="-23%"></div>
            <div class="swiper-slide swiper-one">
              <div class="title" data-swiper-parallax="-300">Slide 1</div>
              <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
              <div class="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
              </div>
            </div>
            <div class="swiper-slide swiper-two">
              <div class="title" data-swiper-parallax="-300">Slide 2</div>
              <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
              <div class="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
              </div>
            </div>
            <div class="swiper-slide swiper-three">
              <div class="title" data-swiper-parallax="-300">Slide 3</div>
              <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
              <div class="text" data-swiper-parallax="-100">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam dictum mattis velit, sit amet faucibus felis iaculis
                  nec. Nulla laoreet justo vitae porttitor porttitor.
                  Suspendisse in sem justo. Integer laoreet magna nec elit
                  suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at
                  elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
                  nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean
                  feugiat non eros quis feugiat.
                </p>
              </div>
            </div>
          </div>
          <!-- 左右箭头 -->
          <!-- <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div> -->
          <div class="swiper-pagination"></div>
        </div>
      </el-main>
    </el-container>
    <div class="footer">电话联系： 李英 13588235630</div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper from 'swiper'
// import Swiper styles
import 'swiper/css/swiper.min.css'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      swiperInstance: null
      // relationDrag: nul
    }
  },
  components: {},
  methods: {
    move(e) {
      const odiv = document.getElementById('relation')
      // 算出鼠标相对元素的位置
      odiv.onmousedown = (e) => {
        document.onmousemove = (e) => {
          const disX = e.clientX - odiv.offsetLeft
          const disY = e.clientY - odiv.offsetTop
          odiv.style.left = disX + 'px'
          odiv.style.top = disY + 'px'
        }
      }

      document.onmouseup = (e) => {
        // 鼠标松开后不再移动
        document.onmousemove = null
      }
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.swiperInstance = new Swiper('.mySwiper', {
      speed: 600,
      parallax: true,
      loop: true,
      autoplay: true,
      // direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 2
      }
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@media screen and (max-width: 400px) {
    .el-header .left {
        position: relative;
        background-color: #f9d749 !important;

        img {
            position: absolute;
            left: 0;
            top: 0;
            transform: scale(0.5);
        }
    }
}

.el-header .left {
    background-color: #f9d749 !important;
}

.el-header {
    padding: 0 !important;
}

.el-main {
    height: calc(100% -80px);
    padding: 0 !important;
}

.swiper {
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hindden;
}

.swiper-slide {
    font-size: 18px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 0;
    overflow: hidden;
}

.parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    // width: 100%;
    // height: 50%;
    // -webkit-background-size: cover;
    // background-size: cover;
    // background-position: center;
}

.swiper-slide .title {
    font-size: 41px;
    font-weight: 300;
}

.swiper-slide .subtitle {
    font-size: 21px;
}

.swiper-slide .text {
    font-size: 14px;
    max-width: 400px;
    line-height: 1.3;
}

.main-content {
    position: relative;
}

.font-i {
    font-family: 'simple-font';
    font-weight: 700;
}

.hello {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #fce54f;
}

.phone {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10000;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
}

.swiper-one {
    background: url('~@/assets/super-1.jpg') no-repeat;
    background-size: cover;
}

.swiper-two {
    background: url('~@/assets/super-2.jpg') no-repeat;
    background-size: cover;
}

.swiper-three {
    background: url('~@/assets/super-3.jpg') no-repeat;
    background-size: cover;
}

.footer {
    width: 100%;
    height: 100px;
    line-height: 50px;
    text-align: left;
    box-sizing: border-box;
    padding-left: 20px;
    background-color: #fff;
}
</style>
