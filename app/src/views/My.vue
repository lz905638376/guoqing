<template>
  <div class="page my" v-show="isShow">
    <h1 class="username">{{username}}</h1>
    <button class="btn" v-if="isLogin === true" @click="delLogin">退出登录</button>
    <button class="btn" v-else @click="goLogin">登录/注册</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username:'请您先登录',
      isLogin: false,
      isShow: true
    }
  },
  methods: {
    goLogin(){
      this.$router.push('/auth/login')
    },
    delLogin(){
      localStorage.setItem("token",'')
      this.$router.push('/goods')
      this.username = '请您先登录'
      this.isLogin = false
    }
  },
  watch: {
    username(){
      this.isShow = true
    }
  },
  created() {

    this.$store.dispatch('requsetAppuser');
    // const token = localStorage.getItem('token');
    // console.log(token);
    axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');
    axios.get('/api/appuser/info')
    .then(data => {
      console.log(123);
      this.username = data.data.data.username + ' 你好~';
      let token = localStorage.getItem("token");
      if(token !== ''){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
      // console.log(data);
    })
  },
}
</script>

<style scoped lang='scss'>
.my{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
 .username{
   font-size: 25px;
   font-weight: 700;
   width: 100%;
   text-align: center;
  }
  .btn{
    width: 100px;
    height: 30px;
    font-size: 16px;
  }
}
</style>