<template>
  <div>
    <div class="header">
      <span>
        分类
        <select name="" id="">
          <option value="全部">-- 全部 --</option>
        </select>
      </span>
      <span>
        发布状态
        <select name="" id="">
          <option value="全部">-- 全部 --</option>
        </select>
      </span>
      <span>
        推荐状态
        <select name="" id="">
          <option value="全部">-- 全部 --</option>
        </select>
      </span>
      <span>
        价格
        <input type="text">
        ——
        <input type="text">

      </span>
      <span>
        发布时间
        <input type="text" placeholder="时间控件">
      </span>
    </div>
    <div class="search">
      <span>
        <select name="" id="">
          <option value="全部">-- 商品名称 --</option>
        </select>
      </span>
      <span>
        <input type="text">
      </span>
      <span>
        <button>搜索</button>
      </span>
      <span>
        <button class="clear">清空</button>
      </span>
    </div>
    <div class="btn">
      <span>
        <button>上架</button>
      </span>
      <span>
        <button>下架</button>
      </span>
      <span>
        <button>推荐</button>
      </span>
      <span>
        <button class="del">删除</button>
      </span>
      <span>
        <button @click="AddGoods"> + 添加</button>
      </span>
    </div>
    <div class="list">
      <tr class="title">
        <td></td>
        <td>商品编号</td>
        <td>封面图</td>
        <td>商品名称</td>
        <td>商品类别</td>
        <td>价格</td>
        <td>销量</td>
        <td>操作</td>
      </tr>
      <tr class="goodsList" v-for="item in goodsListOne" :key="item._id">
        <td><input type="checkbox"></td>
        <td>{{item.id}}</td>
        <td><img :src="imgUrl" alt=""></td>
        <td>{{item.goodsname}}</td>
        <td>{{item.goodstype}}</td>
        <td>{{item.goodsprice}}元</td>
        <td>{{item.goodsnum}}</td>
        <td><button @click="delgoods(item._id)">删除</button></td>
        
      </tr>
    </div>
    <div class="page">
        <ul>
          <!-- <li @click="prev">&lt;</li> -->
          <li v-for="(item,index) in pages" :key="index" @click="changeIndex(index)">{{index+1}}</li>
          <!-- <li @click="next">&gt;</li> -->
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      goodsList:[],
      goodsListOne:[],
      pageIndex:0,
      imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3822518865,2997315897&fm=26&gp=0.jpg'
    }
  },
  methods: {
    AddGoods(){
      this.$router.push('add-goods')
    },
    changeIndex(index){
      this.pageIndex = index;
    },
    delgoods(id){
      console.log(id);
      axios.post(
        '/api/goods/goods_del',
        {
          id: id
        }
      )
      .then(data => {
        console.log(data);
      })
    }
  },
  watch: {
    pageIndex(newVal){
      axios.post(
      '/api/goods/goods_info',
      {
        index:newVal
      }
    )
      .then(data => {
        this.goodsList = data.data.data
        this.goodsListOne = data.data.dataOne
      })
    }
  },
  computed: {
    pages(){
      return Math.ceil(this.goodsList.length/4)
    }
  },
  created() {
      axios.post(
      '/api/goods/goods_info',
      {
        index: this.pageIndex
      }
    )
    .then(data => {
      console.log(data);
      this.goodsList = data.data.data
      this.goodsListOne = data.data.dataOne
    })
  }
}
</script>

<style scoped lang='scss'>
.header{
  width: 100%;
  background-color: lightskyblue;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 20px;
  input{
    width: 100px;
  }
}
.search,.btn{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 5px 20px;
  span{
    margin: 0 20px;
    button{
      background-color: #1890ff;
      border: none;
      border-radius: 6px;
      width: 70px;
      height: 25px;
      color: #fff;
      text-align: center;
    }
  }
}
.search .clear{
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
}
.btn .del{
  background-color: red;
}

.list{
  width: 100%;
  background-color: lightgray;
}
.list .title{
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center ;
  td{
    display: flex;
    align-items: center ;
    justify-content: center;
    height: 30px;
    &:nth-child(1){
      width: 5%;
    }
    &:nth-child(2){
      width: 10%;
    }
    &:nth-child(3){
      width: 10%;
    }
    &:nth-child(4){
      width: 20%;
    }
    &:nth-child(5){
      width: 10%;
    }
    &:nth-child(6){
      width: 15%;
    }
    &:nth-child(7){
      width: 15%;
    }
    &:nth-child(8){
      width: 10%;
    }
  }
  
}
.list .goodsList{
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center ;
  img{
    width: 40px;
    height: 40px;
  }
  td{
    display: flex;
    align-items: center ;
    justify-content: center;
    height: 30px;
    &:nth-child(1){
      width: 5%;
    }
    &:nth-child(2){
      width: 10%;
    }
    &:nth-child(3){
      width: 10%;
    }
    &:nth-child(4){
      width: 20%;
    }
    &:nth-child(5){
      width: 10%;
    }
    &:nth-child(6){
      width: 15%;
    }
    &:nth-child(7){
      width: 15%;
    }
    &:nth-child(8){
      width: 10%;
    }
  }
}

.page{
  ul{
    display: flex;
    width: 300px;
    justify-content: space-around;
    margin-bottom: 0;
    margin-top: 5px;
    li{
      width: 20px;
      text-align: center;
      list-style: none;
      margin: 0 2px;
      background-color: #1890ff;
      color: #fff;
    }
  }
}
</style>