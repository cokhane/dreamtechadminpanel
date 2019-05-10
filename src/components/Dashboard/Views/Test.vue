<template>
  <div class="test container">
    <div class="row">
    </div>
    <div class="row">
      <div class="col-md-6">   
       <test-two ></test-two>
    </div>
      <div class="col-md-6">  
      <test-three></test-three>
     </div>
    </div>

  </div>
</template>
<script>

import Test2 from './Test2'

  export default {
    components:{
      'test-two' : Test2,
    },
    methods:{
      changeProducts(){
        console.log("yeah")
      }
    },
    data () {
      return {
       
      }
    },


  }
</script>
<style>
</style>
