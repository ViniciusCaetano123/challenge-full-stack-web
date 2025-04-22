import router from './router'
import { useUserStore } from './stores/user'
import {getItem} from './utils/localStorage'

router.beforeEach((to, from, next) => {

  const title = 'Grupo A'
  document.title = to.meta?.title ? `${title} | ${to.meta?.title}` : title
  
  
  const requiresAuth = to.meta?.roles
  
 
  if (requiresAuth) {
    const userLocalStore = getItem('user')
    const hasTokern = userLocalStore?.token    
    const userStore = useUserStore()
    if (hasTokern) {     
      userStore.setUser(userLocalStore) 
      
      const userRoles = userStore.roles    

      const requiredRoles = to.meta?.roles   

      if (!userRoles?.some(role => requiredRoles.includes(role))) {    
        next({ name: '401' })
      } else {       
        next()
      }
    } else {    
      next({ name: 'login' })
    }
  } else {
   
    next()
  }
})