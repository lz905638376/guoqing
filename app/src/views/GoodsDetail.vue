<template>
  <div class="detail" v-if="isshow">
      <header class="header">
        <span class="iconfont  iconfanhui2" @click="goBack"></span>
      </header>
      <div class="image">
          <img :src="imgUrl" alt="">
      </div>
      <div class="title">
          <h1><img :src="iconUrl" alt="">【春夏折扣】{{goodsdetail.goodsname}}</h1>
          <h2> <span>价格： </span> ￥{{goodsdetail.goodsprice}}</h2>
          <h3><span>销量： </span>{{goodsdetail.goodsnum}}件</h3>
      </div>
      <div class="btn">
          <button class="buy"> <span class="iconfont iconshangpin"></span> 立即购买</button>
          <button class="add" @click="addShopCart"> <span class="iconfont iconjiarugouwuche"></span> 加入购物车</button>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            isshow: false,
            iconUrl:'https://img.alicdn.com/tfs/TB1APkObOIRMeJjy0FbXXbnqXXa-56-32.png',
            imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3822518865,2997315897&fm=26&gp=0.jpg'
        }
    },
    computed: {
        ...mapState({
            goodsdetail: state => state.goodsdetail,
            appuser: state => state.appuser,
        })
    },
    watch: {
        goodsdetail(){
            this.isshow = true;
        }
    },
    methods: {
        addShopCart(){
            this.$store.dispatch('requsetAppuser');

            this.$store.dispatch('requestOrder',{goodsdetail:this.goodsdetail,appueserId:this.appuser})
        },
        goBack(){
            this.$router.back();
        }
    },
    created() {
        this.$store.dispatch('requestGoodsDetail',this.$route.params.id);
    },
}
</script>

<style scoped lang='scss'>
.header{
    width: 100%;
    display: flex;
    align-items: center;
    height: 49px;
    span{
        font-size: 25px;
    }
}
.detail{
    width: 100%;
    position: absolute;
    top: -50px;
    bottom: -49px;
    z-index: 10;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 10px;
    .image{
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1PX solid #ccc;
        img{
            width: 200px;
            height: 200px;
        }
    }
    .title{
        width: 100%;
        margin-top: 10px;
        h1{
            font-size: 25px;
            margin-left: 20px;
            img{
                margin-right: 10px;
                width: 40px;
            }
        }
        h2{
            margin-top: 20px;
            margin-left: 20px;
            font-size: 20px;
            font-weight: 700;
            color: #e54847;
            span{
                font-weight: normal;
                color: #000;
            }
        }
        h3{
            margin-top: 20px;
            margin-left: 20px;
            font-size: 20px;
            font-weight: 700;
            color: #35b1ff;
            span{
                font-weight: normal;
                color: #000;
            }
        }
    }
    .btn{
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-around;
        bottom: 20px;
        left: 0;
        button{
            width: 140px;
            height: 40px;
            font-size: 16px;
        }
        .buy{
            background-color: #e54847;
            border: none;
            border-radius: 10px;
            color: #fff;
        }
        .add{
            background-color: #fff;
            border: 1PX solid #e54847;
            border-radius: 10px;
            color: #e54847;
        }
    }
}
</style>