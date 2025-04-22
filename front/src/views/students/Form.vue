<template>
  <div class="d-flex justify-center ">
    <div class="mx-auto w-100" >       
      <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">{{ title }}</h1>
      <v-btn
        color="blue-grey-darken-3"
        prepend-icon="mdi-arrow-left"
        aria-label="Cadastrar Aluno"
        @click="$router.push({ name: 'students' })"
      >
        Voltar
      </v-btn>
    </div>
        <v-form @submit.prevent="handleSubmit" class="mt-7 " max-width="600" ref="form">
          <div class="mb-6">
            <v-label>RA (Registro Acadêmico) <span class="text-red">*</span></v-label>
            <v-text-field 
              aria-label="registro acadêmico" 
              v-model="formData.ra" 
              class="mt-2" 
              required 
              hide-details="auto"
              variant="outlined" 
              color="primary"              
              placeholder="Digite o RA do aluno"
            ></v-text-field>
          </div>
          
          <div class="mb-6">
            <v-label>Nome Completo <span class="text-red">*</span></v-label>
            <v-text-field 
              aria-label="nome completo" 
              v-model="formData.nome" 
              class="mt-2" 
              required 
              hide-details="auto"
              variant="outlined" 
              color="primary"
              placeholder="Digite o nome completo"
            ></v-text-field>
          </div>
          
          <div class="mb-6">
            <v-label>CPF <span class="text-red">*</span></v-label>
            <v-text-field 
              aria-label="CPF" 
              v-model="formData.cpf" 
              class="mt-2" 
              required 
              hide-details="auto"
              variant="outlined" 
              color="primary"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
            ></v-text-field>
          </div>
          
          <div class="mb-6">
            <v-label>E-mail <span class="text-red">*</span></v-label>
            <v-text-field 
              aria-label="email address" 
              v-model="formData.email" 
              class="mt-2" 
              required 
              hide-details="auto"
              variant="outlined" 
              color="primary"
              placeholder="exemplo@email.com"
            ></v-text-field>
          </div>   
          <div class="d-flex gap-4" >
            <v-btn  v-if="route?.name != 'students-edit'"
              color="error" 
              variant="text"
              class="pa-1" 
              size="large" 
              @click="reset"
            >
              {{ cancelText }}
            </v-btn>
            <v-btn 
            style="width: 150px;"
              :loading="loading" 
              :readonly="loading" 
              color="primary" 
              class="pa-1" 
              size="large" 
              :text="submitText"
              type="submit"
            ></v-btn>
          </div>
        </v-form>      
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  initialData: Object,
  title: String,
  submitText: String,
  cancelText: String,
  loading: Boolean,
  onSubmit: Function,
  onCancel: Function,
  disable:Object,
})

const form = ref(null)
const formData = reactive({
  ra: '',
  nome: '',
  cpf: '',
  email: ''
})

watch(() => props.initialData, (newValue) => {
  if (newValue) {
    Object.assign(formData, newValue)
  }
}, { deep: true })

onMounted(() => {
  Object.assign(formData, props.initialData)
})
const handleSubmit = () => {
  props.onSubmit(formData)
}
const reset = () => {
  
  Object.keys(formData).forEach(key => formData[key] = '')
  form.value?.reset()
}
defineExpose({ 
  reset
})
</script>