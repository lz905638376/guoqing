<template>
  <a-layout-header class="header">
    <a-menu
      theme="light"
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px'}"
      class="nav"
    >
      <a-menu-item key="2"> {{username}} 你好~</a-menu-item>
      <a-menu-item key="3" @click="delUserAction"> 退出登录 </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { Layout, Menu } from 'ant-design-vue'
import axios from 'axios'
export default {
  data() {
    return {
      username:'',
      userId:''
    }
  },
  components: {
    [Layout.Header.name]: Layout.Header,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
  },
  methods: {
    delUserAction(){
      console.log(this.userId);
      axios.get('/api/user/logout')
      .then(({data}) => {
        alert(data.message);
        this.$router.push('/auth/login')
      })
    }
  },
  created() {
    axios.get('/api/user/user_info')
    .then(({data: {data}}) => {
      this.username = data.username;
      this.userId = data._id
    })
  },
};
</script>

<style scoped lang='scss'>
.header{
  display: flex;
  justify-content: flex-end;
  background-color: lightblue !important;
  .nav{
  background-color: lightblue !important;
  }
}
</style>