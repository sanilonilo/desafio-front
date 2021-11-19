<template>
  <q-page>
    <TitlePage title="Novo estudante"/>
    <FormStudent mode="create"/>
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