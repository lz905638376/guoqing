<template>
  <div class="page listWrap">
    <scroll class="wrap">
      
      <div v-for="(item) in order" :key="item._id" class="list">
        <input type="checkbox"  :value="item" v-model="goods" @change="handle">
        <img :src="imgUrl" alt="">
        <div>
          <h1>{{item.ordername}}</h1>
          <h2>￥{{item.orderprice}}</h2>
        </div>
        <h3><span @click="prev(item)">-</span> {{item.ordernum}} <span @click="next(item)">+</span></h3>
      </div>
    </scroll>
    <div class="bottom">
      <button @click="checkPrice">结算</button>
      <span>￥ {{price}} </span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Scroll from '../components/common/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      goods: [],
      imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3822518865,2997315897&fm=26&gp=0.jpg'
    }
  },
  computed: {
    price(){
      var sum = 0;
      for(var i in this.goods){
        console.log(i);
        sum =  sum+ (this.goods[i].orderprice * this.goods[i].ordernum);
      }
      return sum;
    },
    ...mapState({
      order: state => state.order,
      appuser: state => state.appuser
    })
  },
  watch: {
    appuser(newOld){
       this.$store.dispatch('requestOrderList',newOld);
    }
  },
  methods: {
    prev(item){
      item.ordernum --;
      if(item.ordernum < 1){
        item.ordernum = 1
      }else{
        this.$store.dispatch('requsetOrderChange',{ordername:item.ordername,type:'prev'});
      }
      
    },
    next(item){
      this.$store.dispatch('requsetOrderChange',{ordername:item.ordername,type:'next'});
      item.ordernum +=1;
    },
    handle(){
    },
    checkPrice(){
    }
  },
  created() {
   
    console.log(this.appuser);
    
   
  },
}
</script>

<style scoped lang='scss'>
input{
  width: 15px;
  height: 15px;
}
.listWrap{
  width: 100%;
  
  .wrap{
    width: 100%;
    position: absolute;
    bottom:52px;
    top: 2px;
    box-sizing: border-box;
    padding-left: 20px;
    .list{
      width: 330px;
      height: 100px;
      border: 1PX solid #ccc;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 15px;
      img{
        width: 50px;
        height: 50px;
      }
      h1{
        font-size: 16px;
        color: #000;
      }
      h2{
        margin-top: 10px;
        color: #e54847;
      }
      h3{
        span{
          font-size: 20px;
        }
      }
    }
  }
}
.bottom{
  width: 100%;
  height: 49px;
  bottom: 0px;
  background-color: #e54847;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: 80px;
    height: 30px;
    font-size: 15px;
    background-color: #fff;
    border: none;
    color: #e54847;
  }
  span{
    font-size: 16px;
    color: #fff;
    font-weight: 700;
  }
}

</style>