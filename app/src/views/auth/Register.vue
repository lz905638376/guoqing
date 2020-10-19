<template>
  <div id="register">
    <div>
      <router-link to="/auth/login">登录</router-link> | 
      <router-link to="/auth/register">注册</router-link>
    </div>
    <h1>注册</h1>
    <input type="text" placeholder="账号" v-model="username" />
    <input type="text" placeholder="确认密码" v-model="password" />
    <br/>
    <button @click="confirmAction">注册</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods: {
    confirmAction(){
      axios.post('/api/appuser/register',
      {
        username:this.username,
        password:this.password
      })
      .then(data => {
        alert(data.data.message)
        this.username='';
        this.password='';
        this.$router.push('/my/login')
      })
    }
  },
}
</script>

<style lang='scss'>
#register{
  width: 100%;
    position: absolute;
    font-size: 16px;
    z-index: 10;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 10px;
    input{
      width: 240px;
      height: 30px;
      margin: 10px 0;
      font-size: 14px;
    }
    h1{
      margin-top: 20px;
    }
    button{
      width: 100px;
      height: 30px;
      margin-top: 10px;
      font-size: 16px;
    }
}
</style>