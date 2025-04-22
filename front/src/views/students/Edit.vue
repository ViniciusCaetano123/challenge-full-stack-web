<!-- views/EditStudent.vue -->
<template>
  <StudentForm
    title="Editar Aluno"
    submitText="Atualizar"
    cancelText="Cancelar"
    :loading="fetchUpdateStudent?.loading"
    :onSubmit="updateStudent"
    :initialData="studentData"
    :disable="{ ra: true, cpf: true }"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import StudentForm from "./Form.vue";
import { useFetch } from "@/composables/useFetch";

const loading = ref(false);
const studentForm = ref(null);
const fetchUpdateStudent = ref(null);
const fetchStudent = ref(null);
const updateStudent = async (studentData) => {
  loading.value = true;
  fetchUpdateStudent.value = useFetch("/students", {
    method: "POST",
    data: studentData,
  });
  await fetchUpdateStudent.value?.fetch();
  if (!fetchUpdateStudent.value?.error) {
    resetForm();
  }
};
const getStudent = async (id) => {
  loading.value = true;
  fetchStudent.value = useFetch("/students", {
    method: "GET",
  });
  await fetchStudent.value?.fetch();
};

const resetForm = () => {
  studentForm.value?.reset();
};
</script>
