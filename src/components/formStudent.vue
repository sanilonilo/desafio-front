<template>
  <div class="flex row wrap">
    <div class="flex justify-center q-mb-md col-12">
      <div class="flex justify-center">
        <input  @change="onFile" v-show="false" type="file" id="form-student-file"/>
        
        <label v-if="!avatar" for="form-student-file" class="flex column items-center form-student-avatar">
          <q-avatar size="130px">
            <img :src="PlaceholderStudent()" alt="img">
          </q-avatar>
          <p class="text-deep-purple-4 text-weight-bold q-mt-md">Selecione uma imagem</p>
        </label>

        <label v-if="avatar" for="form-student-file" class="flex column items-center form-student-avatar">
          <q-avatar size="130px">
            <img :src="getAvatarStorage" alt="img">
          </q-avatar>
        </label>
      </div>
    </div>

    <div class="flex column col-12 q-mb-md">
      <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Nome</p>
      <q-input 
        v-model="student.name"
        color="deep-purple-4" 
        :rules="[
            val => !!val || 'Campo obrigatório',
            
          ]" lazy-rules placeholder="Nome do estudante" rounded outlined />
      
    </div>

    <div class="flex row justify-between col-12 q-mb-md">
      <div class="flex column col-5 col-xs-12">
        <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Data de nascimento</p>    
        <q-input
        v-model="student.birth_date"
        rounded outlined 
        color="deep-purple-4"
        :rules="[
            val => !!val || 'Campo obrigatório',
            
          ]"
        lazy-rules
        mask="##/##/####"
        fill-mask
      
      />
      </div>
      <div class="flex column col-5 col-xs-12">
        <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Ano escolar</p>    
        <q-input
        v-model="student.school_year"
        rounded outlined 
        color="deep-purple-4"
        placeholder="Ex: 1º do ensino básico"
      />
      </div>
    </div>

    <div class="flex row justify-between col-12 q-mb-md">
      <div class="flex column col-xs-12  col-md-4 ">
        <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Sexo</p>    
        <q-select 
        v-model="student.sex"
          :rules="[
              val => !!val || 'Campo obrigatório',
              
            ]"
            color="deep-purple-4"
          lazy-rules
          rounded
          outlined
          :options="sexOptions" 
          />
      </div>
      <div class="flex column col-xs-12  col-md-4">
        <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Parentesco</p>    
        <q-select v-model="student.kinship" color="deep-purple-4" rounded outlined :options="kinshipsOptions"/>
      </div>
    </div>

    <div class="flex column col-12 q-mb-md">
      <p class="text-subtitle2 text-deep-purple-4 text-weight-bold q-mb-xs">Adicionar mais critérios</p>
      <q-input 
      v-model="student.plus_criterion"
        color="deep-purple-4" 
        rounded outlined />
      
    </div>

    <div class="flex justify-around col-12 q-mt-md">
      <q-btn @click="goBack" class="q-mb-md q-pt-md q-pb-md q-pl-lg q-pr-lg text-weight-bold" color="deep-purple-5" rounded size="15px"  label="Voltar" />
      <q-btn  v-if="!isCreate" @click="deleteStudant" class="q-mb-md q-pt-md q-pb-md q-pl-lg q-pr-lg text-weight-bold" color="red-6" rounded size="15px"  label="Deletar" />
      <q-btn  @click="saveStudent" v-if="!isCreate" class="q-mb-md q-pt-md q-pb-md q-pl-lg q-pr-lg text-weight-bold" color="cyan-6" rounded size="15px"  label="Atualizar" />
      <q-btn @click="saveStudent" v-if="isCreate" class="q-mb-md q-pt-md q-pb-md q-pl-lg q-pr-lg text-weight-bold" color="cyan-6" rounded size="15px"  label="Cadastrar" />
    </div>

    
  </div>
</template>

<script>

import {Loading} from 'quasar'

export default {
  props:{
    mode:String
  },
  data(){
    return{
      student:{
        name:'',
        birth_date:'',
        school_year:'',
        sex:'',
        kinship:'',
        plus_criterion:''
      },
      avatar:null,
      file:null,
      sexOptions:[
        {label:'Masculino',value:'Masculino'},
        {label:'Feminino',value:'Feminino'}
      ],
      kinshipsOptions:[
        {label:'Pai',value:'Pai'},
        {label:'Mãe',value:'Mãe'},
        {label:'Avô',value:'Avô'},
        {label:'Avó',value:'Avó'},
        {label:'Tio',value:'Tio'},
        {label:'Tia',value:'Tia'},
        {label:'Tutor',value:'Tutor'},
        {label:'Tutora',value:'Tutora'},
        {label:'Responsável legal',value:'Responsável legal'}
      ],
      PlaceholderStudent:() => require('../assets/images/placeholder-student.png')
    }
  },

  methods:{
    onFile(e){
      this.file = e.target.files[0]
    },
    saveStudent(){
      const student = {
        ...this.student,
        sex:this.student.sex.value,
        kinship:this.student.kinship.value
      }

      const id = this.$route.params.id || null
      const url = id ? `/student/${id}` : '/student'
      const method = id ? 'put' : 'post'

      Loading.show()

      this.$api[method](url,student)
                .then(user => {
                   if(this.file){

                    let fileData = new FormData();
                    fileData.append('file', this.file)

                     this.$api.post(`/upload/${user.data.id}`,fileData,{
                                headers: {
                                  'Content-Type': 'multipart/form-data'
                                }
                             })
                              .then(() => {
                                Loading.hide()
                                alert('Estudante Salvo')
                                this.goBack()
                              })
                              .catch(e => console.log)
                   }
                   else{
                     Loading.hide()
                     alert('Estudante Salvo')
                     this.goBack()
                   }
                })
                .catch(e => console.log)
    },
    
    getStudent(id){
      Loading.show()
      this.$api.get(`/student/${id}`)
                .then(user => {
                  this.student = {...user.data}
                  this.avatar = user.data.avatar || null
                  Loading.hide()
                })
                .catch(e => console.log)
    },

    deleteStudant(){
      Loading.show()
      const id = this.$route.params.id
      this.$api.delete(`/student/${id}`)
                .then(() => {
                  Loading.hide()
                  alert('Estudante deletado')
                  this.goBack()
                })
                .catch(e => console.log)
    },

    goBack(){
      this.$router.go(-1)
    }


  },
  computed:{
    isCreate(){
      return this.mode === 'create' ? true : false
    },
    getAvatarStorage(){
      const baseUrl = 'http://localhost:3333/storage/'
      return `${baseUrl}${this.avatar}`
    }
  },

  mounted(){
    if(this.$route?.params.id){
      const id = this.$route?.params.id
      this.getStudent(id)
    }
  }

}
</script>

<style>
  .form-student-avatar img{
    border:6px solid #9575cd
  }
</style>
