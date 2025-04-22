import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {  
  state: () => ({
    drawer: true,
    rail: true,    
  }),    
  getters: {
    isDrawerOpen: (state) => state.drawer,
    isRailMode: (state) => state.rail,
  }, 
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },    
    toggleRail() {
      this.rail = !this.rail
    },        
    setDrawer(value) {
      this.drawer = value
    },    
    setRail(value) {
      this.rail = value
    },    
    
  }
})