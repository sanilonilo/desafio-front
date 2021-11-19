
const routes = [
  {
    path: '/',
    redirect:'/students',
    component: () => import('layouts/applicationLayout.vue'),
    children: [
      { path: 'students', component: () => import('pages/pageStudents.vue') },
      { path: 'student', component: () => import('pages/pageStudentCreate.vue') },
      { path: 'student/:id', component: () => import('pages/pageStudentEdit.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
