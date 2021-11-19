<template>
  <q-page >
    <TitlePage title="Estudantes"/>
    <q-select table-colspan="6" rounded color="deep-purple-4" outlined v-model="selected" :options="options" />
    
    <div class="row flex q-pt-xl q-pb-xl justify-around">
      <StudentSingle 
        v-for="student in students" 
        :key="student.id" 
        :name="student.name"
        :id="student.id"
        :avatar="student.avatar"
        :birthday="student.birth_date"
        
      />
      <AddStudent @click="toCreateStudent"/>
    </div>

  </q-page>
</template>

<script>

import TitlePage from '../components/titlePage'
import StudentSingle from '../components/studentSingle'
import AddStudent from '../components/addStudent'

import {Loading} from 'quasar'

export default {
  components:{
    TitlePage,
    StudentSingle,
    AddStudent
  },

  data(){
    return{
      selected:{label:'Todos',value:'Todos'},
      students:[],
      options:[
        {label:'Estudantes ativos',value:1},
        {label:'Estudantes inativos',value:0},
        {label:'Todos',value:'Todos'}
      ]
    }
  },

  methods:{
    getStudents(){
      const isFilter = this.selected?.value !== 'Todos' ? true : false
      const url = isFilter ? `/student?status=${this.selected.value}` : '/student'

      Loading.show()
      this.$api.get(url)
                .then(res => {
                  
                  this.students = res.data
                  Loading.hide()
                })
                .catch(e => {
                  console.log(e)
                })
    },

    toCreateStudent(){
      this.$router.push({path:'/student'})
    }
    
  },

  watch:{
    selected(val){
      this.getStudents()
    }
  },

  mounted(){
    this.getStudents()
  }
}
</script>
