<template>
  <div class="page">
    <router-view></router-view>
    <app-scroll class="Wrap">
      <div class="listBox">
        <div class="list" v-for="(item) in goods" :key="item._id" @click="goDetail(item._id)">
          <img :src="imgUrl" alt="">
          <h1> <img :src="iconUrl" alt="">{{item.goodsname}}</h1>
          <p><span class="price"> ￥{{item.goodsprice}}</span><span class="num"> 销量 {{item.goodsnum}}</span></p>
        </div>
      </div>
    </app-scroll>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppScroll from '../components/common/app-scroll'
export default {
  data() {
    return {
      iconUrl:'https://img.alicdn.com/tfs/TB1APkObOIRMeJjy0FbXXbnqXXa-56-32.png',
      imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3822518865,2997315897&fm=26&gp=0.jpg'
    }
  },
  components: {
    AppScroll
  },
  computed: {
    ...mapState({
      goods: state => state.goods
    })
  },
  methods: {
    goDetail(id){
      this.$router.push({name:'goods-detail',params:{id:id}});
    }
  },
  created() {
    this.$store.dispatch('requestGoods');
  },
}
</script>

<style scoped lang='scss'>
.Wrap{
  width: 100%;
  height: 100%;
}
.listBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 5px 10px;
  justify-content: space-around;
  .list{
    height: 200px;
    width: 160px;
    display: flex;
    box-sizing: border-box;
    padding: 5px;
    margin-top: 5px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #ccc;
    img{
      width: 120px;
      height: 120px;
    }
    h1{
      font-size: 20px;
      color: #000;
      font-weight: 700px;
      img{
        width: 20px;
        height: 20px;
      }
    }
    p{
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .price{
      color: #e54847;
      font-size: 18px;
      font-weight: 700px;
    }
    .num{
      color: #35b1ff;
      font-size: 14px;
    }
  }
}
</style>