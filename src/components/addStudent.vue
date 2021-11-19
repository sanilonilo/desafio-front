<template>
  <div class="flex justify-center items-center column q-mt-md q-mb-md q-mr-xs q-ml-xs col-xs-12 col-sm-6 col-md-3">
    <div class="box-icon-plus q-mb-md flex  justify-center items-center">
      <q-icon :name="matAdd" class="text-deep-purple-4" style="font-size:5em"/>
    </div>
    <p class="text-h5 text-weight-bolder text-deep-purple-4">Novo estudante</p>
  </div>
</template>

<script>

import { matPlusOne,matAdd } from '@quasar/extras/material-icons'

export default {
  data(){
    return{
      matAdd,
      matPlusOne
    }
  }
}
</script>

<style>
  .box-icon-plus{
    width:125px;
    height:125px;
    border-radius:63px;
    background:rgb(245,245,245);
    cursor:pointer
  }
</style>
