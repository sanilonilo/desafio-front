<template>
  <div class="title-page text-deep-purple-4">
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  props:{
    title:String
  }
  
}
</script>

<style>
  .title-page{
    
  }

  .title-page h3{
    font-weight:bold;
    font-size:26px;
    font-weight:900
  }
</style>
