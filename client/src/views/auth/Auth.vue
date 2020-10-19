<template>
  <div id="auth">
    <nav>
      <router-link to="/auth/login">登录</router-link>
      <router-link to="/auth/register">注册</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created(){
    
  }

}
</script>

<style>

</style>