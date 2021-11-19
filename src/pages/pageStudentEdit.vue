<template>
  <q-page padding>
    <TitlePage title="Editar estudante"/>
    <FormStudent mode="edit"/>
  </q-page>
</template>

<script>

import FormStudent from '../components/formStudent'
import TitlePage from '../components/titlePage'

export default {
  components:{
    FormStudent,
    TitlePage
  }
}
</script>
