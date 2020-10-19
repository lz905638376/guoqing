<template>
  <div class="page" v-if="isshow">
    <nav class="nav">
      <span
       v-for="(item, index) in nav" :key="index" @click="changeGoods(item,index)"
       :class="{active: showIndex == index}"
       >
        {{item}}
      </span>
    </nav>
    <div class="scrollWrap">
    <app-scroll class="Wrap">
      <div class="listWrap">
        <div class="list" v-for="(items) in categorygoods" :key="items._id" @click="goDetail(items._id)">
            <img :src="imgUrl" alt="">
            <h1> <img :src="iconUrl" alt="">{{items.goodsname}}</h1>
            <p><span class="price"> ￥{{items.goodsprice}}</span><span class="num"> 销量 {{items.goodsnum}}</span></p>
        </div>
        </div>
      </app-scroll>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppScroll from '../components/common/app-scroll'
export default {
  components: {
    AppScroll
  },
  data() {
    return {
      isshow:false,
      nav:['家居生活','生活电器','休闲娱乐'],
      showIndex: 0,
      iconUrl:'https://img.alicdn.com/tfs/TB1APkObOIRMeJjy0FbXXbnqXXa-56-32.png',
      imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3822518865,2997315897&fm=26&gp=0.jpg'
    }
  },
  computed: {
    ...mapState({
      categorygoods: state => state.categorygoods
    })
  },
  watch: {
    categorygoods(){
      this.isshow = true;
    }
  },
  methods: {
    changeGoods(item,index){
      this.$store.dispatch('requestCategoryGoods',item);
      this.showIndex = index;
    },
    goDetail(id){
      this.$router.push({name:'goods-detail',params:{id:id}});
      this.$store.dispatch('requestGoodsDetail',id);
    }
  },
  created() {
    this.$store.dispatch('requestCategoryGoods','家居生活')
  },
}
</script>

<style scoped lang='scss'>
.nav{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
}
.active{
  color: #e54847;
}
.scrollWrap{
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 50px;
  left: 0;
}
.Wrap{
  width: 100%;
  height: 100%;
}
.listWrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
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
</style>