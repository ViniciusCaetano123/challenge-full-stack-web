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
    <List></List>
  </div>
</template>
<script setup>
import List from "./List.vue";
</script>
