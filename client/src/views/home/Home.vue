<template>
  <div class="home">
    <h1>系统首页</h1>
    <div class="header">
      <div class="order">
        <h1>今日订单</h1>
      </div>
      <div class="price">
        <h1>今日销售额</h1>
      </div>
      <div class="uers">
        <h1>今日新增用户</h1>
      </div>
      <div class="view">
        <h1>今日浏览量</h1>
      </div>
    </div>
    <div class="middle">
      <h1>待办事项</h1>
      <div class="content">
        <div>
          <h1>100</h1>
          <h2>待付款</h2>
        </div>
        <div>
          <h1>100</h1>
          <h2>待发货</h2>
        </div>
        <div>
          <h1>100</h1>
          <h2>待收货</h2>
        </div>
        <div>
          <h1>100</h1>
          <h2>待评价</h2>
        </div>
        <div class="tuikuan">
          <h1>100</h1>
          <h2>退款/售后</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
.header{
  width: 100%;
  height: 150px;
  padding: 5px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  h1{
      color: white;
    }
  .order{
    width: 200px;
    height: 100%;
    background-color: lightgreen;
    padding: 5px;
  }
  .price{
    width: 200px;
    height: 100%;
    background-color: lightpink;
    padding: 5px;
  }
  .uers{
    width: 200px;
    height: 100%;
    background-color:skyblue;
    padding: 5px;
  }
  .view{
    width: 200px;
    height: 100%;
    background-color: lightcoral;
    padding: 5px;
  }
}
.middle{
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  height: 180px;
  border: 1px solid #ccc;
  margin-top: 20px;
  .content{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tuikuan{
      h1{
        font-size: 30px;
        color: rgb(204, 43, 32)
      }
    }
    div{
      border: 1px solid #999;
      width: 100px;
      height: 100px;
      text-align: center;
      h1{
        font-size: 30px;
        color: #1890ff;
      }
      h2{
        font-size: 10px;
        color: #999;
      }
    }
  }
}
</style>