import axios from 'axios'
import { toast } from '@/composables/useToast'
import { removeItem,getItem } from './localStorage'
const service = axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,     
    timeout: 5000 
})
service.interceptors.request.use(
    config => {       
        const userStore = getItem('user')
        const token = userStore?.token
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {   
        return Promise.reject(error)
    }
)

service.interceptors.response.use( 
    response => {
        const res = response.data
        if (res.message) {
            toast.value.message = res.message
            toast.value.color = 'success'
            toast.value.show = true
        }
        return res      
    },
    error => {      
        
        const { response } = error
        const status = response?.status
        
        const message = response.data.message || 'Erro desconhecido'
        
        toast.value.color = 'error'
        toast.value.show = true

        if (status === 401 || status === 403) {
            toast.value.message = message
            removeItem('user') // Authentication and Unauthorized        
        } else if (status === 500) {
            toast.value.message = 'Erro interno do servidor'
        } else if (status === 503) {
            toast.value.message = 'Serviço indisponível'
        } else if (status === 504) {
            toast.value.message = 'Tempo limite de conexão esgotado'
        } else {
            toast.value.message = message
        }
      return Promise.reject(error)
    }
)
export default service