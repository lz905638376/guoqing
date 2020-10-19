<template>
<div class="scroll-view" ref="scroll">
  <div class="scroll-wrap">
      <div class="pull-down" :style="{height: height + 'px'}">
          <span 
          class="icon loding" 
          v-if="isPullDown" 
          
          >
              <i></i>
              <i></i>
              <i></i>
              <i></i>
          </span>
          <span
           class="iconfont icon-fanhui"
           v-else
           :class="{turn: canPullDown}"
            ></span>
          <span>{{pullDownText}}</span>
      </div>
    <slot/>
      <div class="pull-up" :style="{height: height + 'px'}">
          <span 
          class="icon loding" 
          v-if="isPullUp" 
          
          >
              <i></i>
              <i></i>
              <i></i>
              <i></i>
          </span>
          <span
           class="iconfont icon-fanhui"
           v-else
           :class="{turn: canPullUp}"
            ></span>
          <span>{{pullUpText}}</span>
      </div>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isPullDown: false,
            canPullDown: false,
            isPullUp: false,
            canPullUp: false,
            pullDownText: '下拉可以刷新......',
            pullUpText: '上拉加载更多....',
            height: window.devicePixelRatio * 40

        }
    },
    methods: {
        endPullDown(){
            this.scroll.scrollTo(0,-this.height,300);
            this.isPullDown = false;
            
        },
        scrollToTop(){
            this.scroll.scrollTo(0,-this.height,0);
        },
        endPullUp(){
            this.isPullUp = false;
        }
    },
    mounted() {
        const scroll = this.scroll = new IScroll(this.$refs.scroll, {
            tap: true,
            click: true,
            probeType: 3
        });
        scroll.on('beforeScrollStart', ()=>{
        scroll.refresh();
        });
        scroll.scrollTo(0,-this.height,0);


        scroll.on('scroll',()=>{
            if(this.isPullDown){
                return;
            }
            if(scroll.y >= 0){
                this.pullDownText = '释放立即刷新.....';
                this.canPullDown = true;
            }else if(scroll.y <0 && scroll.y > -this.height){
                this.pullDownText = '下拉可以刷新......';
                this.canPullDown = false;
            }
        });
        scroll.on('scrollEnd',()=>{
            if(this.isPullDown){
                return;
            }
            if(scroll.y>=0){
                this.isPullDown = true;
                this.pullDownText = '拼命加载中......';
                this.$emit('pull-down');
            }else if(scroll.y <0 && scroll.y > -this.height){
                scroll.scrollTo(0,-this.height,300);
            }
        })

        //上拉加载
        scroll.on('scroll',()=>{
            if(this.isPullUp){
                return;
            }
            const minY = scroll.maxScrollY + this.height;
            const maxY = scroll.maxScrollY;
            if(scroll.y >= minY){

            }else if(scroll.y < minY && scroll.y> maxY){
                this.pullUpText = '上拉加载更多....'
                this.canPullUp = false;

            }else{
                this.canPullUp = true;
                this.pullUpText = '释放立即加载更多....'
            }
        })

        scroll.on('scrollEnd',()=>{
            if(this.isPullUp){
                return;
            }
            const minY = scroll.maxScrollY + this.height;
            const maxY = scroll.maxScrollY;
            if(scroll.y >= minY){
                
            }else if(scroll.y< minY &&scroll.y > maxY){
                scroll.scrollTo(0,minY,300);
            }else{
                this.isPullUp = true;
                this.pullUpText = '正在拼命加载....';
                this.$emit('pull-up');
            }
        })



    },
    



    
}
</script>

<style scoped lang='scss'>
@import "../../assets/global-style.scss";
.scroll-view{
  overflow: hidden;
}
.pull-down{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-color-desc;
    .iconfont{
    transform: rotate(-90deg);
    transition: 300ms;
    &.turn{
    transform: rotate(90deg);
    }
}
}

@keyframes ani-scale{
    0%,100%{
        height: 4px;
    }
    50%{
        height: 16px;
    }
}
.icon{
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: flex-end;
    margin: 0 6px;
    i{
        background-color: $theme-color;
        width: 2px;
        height: 16px;
        animation: ani-scale 1s infinite ease-in;
        margin: 0 2px;
        &:nth-of-type(1){
            animation-delay: -0.25s;
        }
        &:nth-of-type(2){
            animation-delay: -0.5s;
        }
        &:nth-of-type(3){
            animation-delay: -0.75s;
        }
    }
}

.pull-up{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $font-color-desc;
    background-color: yellow;
    .iconfont{
    transform: rotate(90deg);
    transition: 300ms;
    &.turn{
    transform: rotate(-90deg);
    }
    }
}
</style>