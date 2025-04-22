import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css' 

//https://github.com/PanJiaChen/vue-element-admin/tree/master
//https://themeselection.com/item/materio-free-vuetify-vuejs-admin-template/
//https://codedthemes.com/item/berry-free-vuetify-vuejs-admin-template/?utm_source=vuetify_resources_themes&utm_medium=store
//https://codedthemes.com/item/mantis-free-vuetify-vuejs-admin-template/?utm_source=vuetify_resources_themes&utm_medium=store
//https://dash-ui-vuetify-js.netlify.app/
//https://colorlib.com/etc/404/colorlib-error-404-10/
//https://colorlib.com/wp/template/colorlib-error-404-10/
//https://medium.com/@gilmarcintra/tutorial-passo-a-passo-como-validar-um-formul%C3%A1rio-vue-js-com-vuetify-d4480d0f15cf
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@/styles/index.css'
import './permission'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  icons: {
    defaultSet: 'mdi',
  },  
})
const pinia = createPinia()
createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
