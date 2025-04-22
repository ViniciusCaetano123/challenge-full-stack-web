
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    nome: '',
    email: '',
    perfil: null,
    token: null
  }),
  
  getters: {    
    roles: (state) => {
      return state.perfil ? state.perfil : []
    }
  },
  
  actions: {    
    
    setUser(user) {
      this.id = user.id
      this.nome = user.nome
      this.email = user.email
      this.perfil = user.perfil  
      this.token = user.token
    },    
       
    
    logout() {    
      this.id = null
      this.nome = ''
      this.email = ''
      this.perfil = null
      this.token = null   
    },   
   
  }
})