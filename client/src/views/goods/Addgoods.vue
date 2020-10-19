<template>
  <div class="addgoods">
      <h1>添加商品</h1>
      <p><span>* 商品的id </span> <input type="text" v-model="dataID"></p>
      <p><span>* 商品名称</span> <input type="text" v-model="dataName"></p>
      <p><span>* 商品类别</span> <input type="text" v-model="datatype"><span>（家居生活，生活电器，休闲娱乐）</span></p>
      <p><span>* 销售价格</span> <input type="text" v-model="dataPrice">元 <span>商品当前销售的价格</span></p>
      <p><span>* 商品总数</span> <input type="text" v-model="dataNum"></p>
      <button @click="addGoods">注册</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dataID,
      dataName,
      dataPrice,
      dataNum,
      datatype
    }
  },
  methods: {
    addGoods(){
      axios.post(
        '/api/goods/add',
        {
          id: this.dataID,
          goodsname: this.dataName,
          goodsprice: this.dataPrice,
          goodsnum: this.dataNum,
          goodstype:this.datatype
        }
      )
      .then(data => {
        console.log(data);
        if(data.data.code === 0){
          this.$router.push('/goods-manage')
        }else{
          alert(data.data.message)
        }
      })
    }
  },
}
</script>

<style scoped lang='scss'>
.addgoods{
    width: 100%;
    height: 100%;
}
</style>