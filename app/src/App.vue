<template>
    <router-view/>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('requsetAppuser');
  },
}
</script>
<style lang="scss">
html,body{
  // background-color: #ccc;
  color: #777;
}
.page{
  width: 100%;
  position: absolute;
  top: 49px;
  left: 0;
  bottom: 49px;
  &.subpage{
    bottom: 0;
  }
}

</style>
