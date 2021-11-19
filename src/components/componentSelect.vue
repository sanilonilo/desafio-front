<template>
  <q-select table-colspan="6" rounded color="deep-purple-4" outlined  :options="options" />
</template>

<script>
export default {
  props:{
    options:Array
  }
}
</script>
