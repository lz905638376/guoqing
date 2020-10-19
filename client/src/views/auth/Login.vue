<template>
  <div id="login">
    <h1>登录</h1>
    <input type="text" placeholder="用户名" v-model="username"/>
    <input type="password" placeholder="密码" v-model="password"/>
    <button @click="loginAction">登录</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 登录
    loginAction(){
      axios.post(
        '/api/user/login',
        {
          username: this.username,
          password: this.password
        }
      )
      .then(data=>{
        console.log(data);
        if(data.data.code === 0){
          //登录成功
          this.$store.dispatch('user/changeLoginAction', true);
          this.$router.push({name: 'home'});
          // 查询用户信息
          this.$store.dispatch('user/requestUserInfo');
        }else{
          // 登录失败
          alert(data.data.message);
        }
      })
      .catch(error=>{
        console.log(error);
        alert('登录失败');
      })
    }
  }
}
</script>

<style>

</style>