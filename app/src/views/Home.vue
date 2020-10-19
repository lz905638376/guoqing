<template>
  <div class="home">
    <header class="header">
      <span>电子商城</span>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="bottom">
      <router-link to="/goods" class="nav_list">
        <span class="iconfont iconshangpin"></span>
        <span>商品</span>
      </router-link>
      <router-link to="/category" class="nav_list">
        <span class="iconfont icondilanxianxingiconyihuifu_huabanfuben"></span>
        <span>分类</span>
      </router-link>
      <router-link to="/shopcart" class="nav_list">
        <span class="iconfont icongouwuchekong"></span>
        <span>购物车</span>
      </router-link>
      <router-link to="/my" class="nav_list">
        <span class="iconfont iconwode"></span>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {

}
</script>
<style lang="scss" scoped>
.header{
  height: 49px;
  width: 100%;
  background-color: #e54847;
  text-align: center;
  line-height: 49px;
  position: absolute;
  span{
    font-size: 20px;
    color: #fff;
  }
}
.bottom{
  background-color: #fff;
  border-top: 1PX solid #999;
  height: 49px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .nav_list{
    display: flex;
    flex-direction: column;
    align-items: center;
    &.router-link-active{
      color: #e54847;
    }
    span{
      &:nth-of-type(1){
        margin-bottom: 4px;
        font-size: 25px;
      }
      &:nth-of-type(2){
        font-size: 12px;
      }
    }
  }
}
</style>
