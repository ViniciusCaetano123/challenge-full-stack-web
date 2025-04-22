<template>
    <div>
      <div class="d-flex justify-space-between align-center mb-4">
        <h1 class="text-h4">Consulta de alunos</h1>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          aria-label="Cadastrar Aluno"
          @click="$router.push({ name: 'students-create' })"
        >
          Cadastrar Alunos
        </v-btn>
      </div>          
      <v-card class="mb-6">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="queryString.ra"
                label="Pesquise por E-mail"
                prepend-inner-icon="mdi-magnify"
                clearable
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="applyFilters"
                aria-label="Buscar estudantes"
              ></v-text-field>
            </v-col><v-col cols="12" md="3">
              <v-text-field
                v-model="queryString.email"
                label="Pesquise por RA"
                prepend-inner-icon="mdi-magnify"
                clearable
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="applyFilters"
                aria-label="Buscar estudantes"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                color="primary"
               
                aria-label="Pesquisar Aluno">
                Pesquisar
              </v-btn>            
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> 
      
      <v-sheet border rounded>
        <v-data-table
    :headers="headers"
    :items="fetchStudents?.data?.itens"
    
    
    :loading="fetchStudents?.loading"
  >
    <template v-slot:item.actions="{ item }">
      <v-card-actions >
        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon>
        <v-icon color="medium-emphasis" icon="mdi-delete" size="small" ></v-icon>      
      </v-card-actions>
    </template>
  </v-data-table>
  </v-sheet>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useFetch } from '@/composables/useFetch'

const queryString = reactive({
  pagina: 1,
  limite: 10,
  ra: '',
  email:''
})
  const fetchStudents = ref(null)
  
  const search = async () => {
    await fetchStudents.value.fetch()    
  }
  onMounted(async () => {
     fetchStudents.value = useFetch('/students',
   {
    method: 'get',
    
  })
    search()
  })
  const headers = [
    { title: 'RA', key: 'ra', sortable: true },
    { title: 'Nome', key: 'nome', sortable: true },
    { title: 'E-mail', key: 'email', sortable: true },
    { title: 'CPF', key: 'cpf', sortable: true },
    { title: 'Data Registro', key: 'created_at', sortable: true },
    { title: 'Data Atualizada', key: 'updated_at', sortable: true },
    { title: 'Ações', key: 'actions', sortable: false }
  ]
  
  
  </script>
  