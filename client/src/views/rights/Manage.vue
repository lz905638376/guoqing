<template>
  <div>
    <h1>权限管理</h1>
    <button @click="addAction">添加</button>
  </div>
</template>

<script>
export default {
  methods: {
    addAction(){
      this.$router.push({name: 'add-acount'});
    }
  }
}
</script>

<style>

</style>