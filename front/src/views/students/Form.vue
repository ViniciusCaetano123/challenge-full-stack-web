<template>
  <div class="d-flex align-center justify-center h-screen">
    <v-card class="mx-auto w-100" max-width="600">
      <v-container class="pa-10">
        <div class="d-flex justify-space-between align-center">
          <h1 class="text-h5 font-weight-bold">Cadastro de Aluno</h1>
        </div>
        <v-form @submit.prevent="submit" class="mt-7" ref="form">
          <div class="mb-6">
            <v-label>RA (Registro Acadêmico) <span class="text-red">*</span></v-label>
            <v-text-field 
              aria-label="registro acadêmico" 
              v-model="student.ra" 
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
              v-model="student.nome" 
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
              v-model="student.cpf" 
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
              v-model="student.email" 
              class="mt-2" 
              required 
              hide-details="auto"
              variant="outlined" 
              color="primary"
              placeholder="exemplo@email.com"
            ></v-text-field>
          </div>
          
          <div class="mb-6">
            <v-label>Data de Nascimento</v-label>
            <v-text-field 
              aria-label="data de nascimento" 
              v-model="student.data_nascimento" 
              class="mt-2" 
              hide-details="auto"
              variant="outlined" 
              color="primary"
              type="date"
            ></v-text-field>
          </div>
          
          <v-alert 
            density="compact" 
            size="x-small" 
            v-if="validationError" 
            :title="validationError" 
            type="error" 
            class="mb-3"
          ></v-alert>
          
          <div class="d-flex gap-4">
            <v-btn 
              color="error" 
              variant="text"
              class="pa-1" 
              size="large" 
              @click="resetForm"
            >
              Limpar
            </v-btn>
            <v-btn 
              :loading="loading" 
              :readonly="loading" 
              color="primary" 
              class="w-100 pa-1" 
              size="large" 
              text="Cadastrar"
              type="submit"
            ></v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
    
    <!-- Toast para mostrar mensagens de sucesso/erro -->
    <v-snackbar
      v-model="toast.show"
      :color="toast.color"
      :timeout="3000"
      location="top"
    >
      {{ toast.message }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="toast.show = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import Student from '@/models/Student'
import { ref, reactive } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'
// Importar APIs quando estiverem disponíveis
// import { createStudent } from '@/api/students'

const router = useRouter()
const { toast, showToast } = useToast()
const form = ref(null)
const loading = ref(false)
const validationError = ref('')

// Dados do aluno
const student = reactive(new Student())

const submit = async () => {
  validationError.value = '';
  
  // Validação usando o modelo Student
  const validation = student.validate();

  if (!validation.success) {
    validationError.value = validation.errors[0].message;
    return;
  }
  
  loading.value = true;
  
  try {
    // Implementação para quando a API estiver disponível
    // const { url, config } = createStudent(student.toJSON());
    // const fetchStudent = useFetch(url, config);
    // await fetchStudent.fetch();
    
    // Simulando uma requisição
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showToast('Aluno cadastrado com sucesso!', 'success');
    resetForm();
    
    // Redirecionar para a lista de alunos
    router.push({ name: 'students-list' });
  } catch (error) {
    showToast(`Erro ao cadastrar aluno: ${error.message}`, 'error');
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  if (form.value) {
    form.value.reset();
  }
  
  // Resetar os dados do aluno
  Object.assign(student, new Student());
};
</script>

<style scoped>
.text-red {
  color: #ff5252;
}
</style>