<template>
  <div class="scroll-view" ref="scroll">
  <div class="scroll-wrap">
    <slot/>
  </div>
</div>
</template>

<script>
export default {
    mounted(){
        const scroll = new IScroll(this.$refs.scroll, {
        // tap: true,
        // click: true,
        probeType: 3
        });
        scroll.on('beforeScrollStart', ()=>{
        scroll.refresh();
        });
    }
}
</script>

<style scoped lang="scss">
.scroll-view{
  overflow: hidden;
}
.scroll-wrap {
}
</style>