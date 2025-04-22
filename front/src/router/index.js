import { createRouter, createWebHistory } from 'vue-router'
import layout from '../layout/index.vue'

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: layout,
    children: [
      {
        path: 'students', 
        name: 'students', 
        component: () => import('../views/students/index.vue'),
        meta: { 
          title: 'Alunos',
          icon: 'mdi-account-school',          
          roles: ['admin'] 
        }
      },
      {
        path: 'students/create', 
        name: 'students-create', 
        component: () => import('../views/students/Create.vue'),
        meta: { 
          hidden: true,
          title: 'Cadastrar Aluno',
          icon: 'mdi-account-school',          
          roles: ['admin'] 
        }
      },
      {
        path: 'enrolments', 
        name: 'enrolments', 
        component: () => import('../views/enrolments/index.vue'),
        meta: { 
          title: 'Matrículas',
          icon: 'mdi-badge-account-outline ',          
          roles: ['admin'] 
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: 'Login',      
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/error-page/401.vue'),
    meta: {
      title: 'Sem Permissão',     
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/error-page/404.vue'),
    meta: {
      title: 'Página não Encontrada',      
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router