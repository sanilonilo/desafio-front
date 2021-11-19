<template>
  <div @click="toInfoStudent" class="student-single q-mb-md q-mr-xs q-ml-xs col-xs-12 col-sm-5 col-md-3">
    <q-avatar size="130px">
      <img v-if="!avatar" :src="PlaceholderStudent()" alt="img">
      <img v-else :src="getAvatarStorage" alt="img">
    </q-avatar>
    <p class="text-h6 q-mt-md q-mb-xs text-center">{{name}}</p>
    <span class="text-subtitle2 text-weight-medium">{{getAge}} anos</span>
  </div>
</template>

<script>


export default {
  props:{
    name:String,
    birthday:String,
    avatar:String,
    id:Number
  },
  data(){
    return{
      avatarStorage:'',
      PlaceholderStudent:() => require('../assets/images/placeholder-student.png')
    }
  },

  methods:{
    toInfoStudent(){
      this.$router.push({path:`/student/${this.id}`})
    },

  },

  computed:{
    getAvatarStorage(){
      const baseUrl = 'http://localhost:3333/storage/'
      return `${baseUrl}${this.avatar}`
    },

    getAge(){
      const yearBirthStudent = parseInt(this.birthday.split('/').pop())
      const yearA = new Date()
      yearA.setYear(yearBirthStudent)
      const yearB = new Date()
      return Math.floor(Math.ceil(Math.abs(yearA.getTime() - yearB.getTime()) / (1000 * 3600 * 24)) / 365.25);
    }

  },
}

</script>

<style>
  .student-single{
    display:flex;
    flex-direction:column;
    align-items: center;
    cursor:pointer;
    box-sizing: border-box;
    padding:15px;
    border-radius:22px;
    background: rgb(249,249,249);
  }

  .student-single:hover{
    background: #51407e;
    color:#fff
  }

  .student-single img{
    border:6px solid #ffffff
  }

</style>
