<template>
<div id="app">

  <router-view/>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      isLogin: state=>state.user.isLogin
    })
  },
  watch: {
    isLogin: {
      handler(newVal){
        if(!newVal){
          // 登录状态过期了，需要重新登录
          this.$router.replace('/auth');
        }
      },
      immediate: true
    }
  },
  created(){
    // 检查登录了么，是否过期了
    if(this.isLogin){
      this.$store.dispatch('user/checkLogin');
    }
    
  }
}
</script>
<style>
.ant-layout-sider{
  background-color:  lightblue !important;
}
.ant-layout-sider-trigger{
  background-color: lightskyblue !important;
}
</style>
