import {ref} from "vue"
import request from "@/utils/request"


export const useFetch = (url,config={})=>{   
    const data = ref(null)
    const response = ref(null)
    const error = ref(null)
    const loading = ref(false)
  
    const fetch = async ()=>{
        loading.value = true
        try{           
            const result = await request({url,...config})
            response.value = result
            data.value = result
        }catch(ex){
            error.value = ex
        }finally{            
            loading.value = false            
        }
    }   
    return { response, error,data,loading,fetch}
}