<template>
   <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(item) in showdata" :key="item.id">
            <img :src="changePath(item.img)" alt="">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'

export default {
    props: {
        showdata: Array
    },
    data() {
      return {
        showId: 0
      }
    },
    watch: {
      showId(newVal){
        this.$emit('postId',this.showdata[newVal]);
        console.log(newVal);
      }
    },
    methods: {
        changePath(path){
          return path.replace('w.h','148.220')
        }
    },
    mounted() {
      this.$emit('postId',this.showdata[this.showId]);
      let _this = this;
        var mySwiper = new Swiper ('.swiper-container', {
              effect : 'coverflow',
                slidesPerView: 4,
                centeredSlides: true,
                on: {
                    slideChangeTransitionEnd: function(){
                    _this.showId = this.activeIndex;
                    }
                },
                // autoplay: {
                //     delay: 3000,
                //     stopOnLastSlide: false,
                //     disableOnInteraction: true,
                // }
            }) 
            
          }
}
</script>

<style scoped lang='scss'>
.banner{
  width: 100%;
  height: 112px;
}
.swiper-container{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.swiper-slide{
    width: 110px;
    height: 112px;
}
</style>