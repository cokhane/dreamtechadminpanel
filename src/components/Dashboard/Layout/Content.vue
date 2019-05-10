<template>
  <div class="content">
  <div>
    <vue-headful :title="contentTitle"  description="Admin Panel"/> 
  </div>
    <div class="container-fluid">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        contentTitle:'',
      }
    },
    mounted(){
      this.contentTitle = process.env.TITLE
    }
  };
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .15s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }
</style>
