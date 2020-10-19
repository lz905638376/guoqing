<template>
  <div id="register">
    <h1>注册</h1>
    <input type="text" placeholder="用户名" v-model="username"/>
    <input type="text" placeholder="密码" v-model="password"/>
    <button @click="registerAction">注册</button>
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
    // 注册
    registerAction(){
      axios.post(
        '/api/user/register',
        {
          username: this.username,
          password: this.password,
          nickname: this.password,
          phonenumber: this.password,
          job: this.password,
          auth: []
        }
      )
      .then(data=>{
        console.log(data);
        if(data.data.code === 0){
          //注册成功
          this.$router.push('/login');
        }else{
          //注册失败
          alert(data.data.message);
        }
      })
      .catch(error=>{
        console.log(error);
        alert('注册失败');
      })
    }
  }
}
</script>

<style>

</style>