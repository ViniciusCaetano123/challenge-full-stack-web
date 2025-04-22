<template>
    <div>
      <div class="d-flex justify-space-between align-center mb-4">
        <h1 class="text-h4">Cadastro de Aluno</h1>
        <v-btn
          color="secondary"
          prepend-icon="mdi-arrow-left"
          @click="$router.push({ name: 'students' })"
          aria-label="Voltar para lista de alunos"
        >
          Voltar
        </v-btn>
      </div>   
      <StudentForm />
    </div>
  </template>
  
  <script setup>
  import StudentForm from './Form.vue';
  </script>