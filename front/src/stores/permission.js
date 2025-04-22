
import { defineStore } from 'pinia'


export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: []
  }),
  
  getters: {    
    sidebarRoutes: (state) => {
      return state.routes.filter(route => !route.meta?.hidden)
    }
  },  
 
})