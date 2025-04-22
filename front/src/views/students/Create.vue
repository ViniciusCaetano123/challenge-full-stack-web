<template>
  <StudentForm
    title="Cadastro de Aluno"
    submitText="Cadastrar"
    cancelText="Limpar"
    :loading="fetchCreateStudent?.loading"
    :onSubmit="createStudent"
    :onCancel="resetForm"
    ref="studentForm"
  />
</template>

<script setup>
import { ref } from 'vue'
import StudentForm from './Form.vue'
import { useFetch } from '@/composables/useFetch'

const loading = ref(false)
const studentForm = ref(null)
const fetchCreateStudent = ref(null)
const createStudent = async (studentData) => {
 
    loading.value = true
    fetchCreateStudent.value =  useFetch('/students', {
      method: 'POST',
      data: studentData
    })
    await fetchCreateStudent.value?.fetch()
    if (!fetchCreateStudent.value?.error) {
      resetForm()
    }
 
}

const resetForm = () => {
  studentForm.value?.reset()
}
</script>