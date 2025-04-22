<template>
  <StudentForm
    title="Editar Aluno"
    submitText="Atualizar"
    
    :loading="fetchUpdateStudent?.loading"
    :onSubmit="updateStudent"
    :initialData="fetchStudent?.data"
    :onCancel="resetForm"
    :disable="{ ra: true, cpf: true }"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import StudentForm from "./Form.vue";
import { useFetch } from "@/composables/useFetch";
import { useRoute } from "vue-router";
const route = useRoute();
const loading = ref(false);
const studentForm = ref(null);
const fetchUpdateStudent = ref(null);
const fetchStudent = ref(null);

const updateStudent = async (studentData) => {
  console.log("studentData", studentData);
  fetchUpdateStudent.value = useFetch(`students/${route.params.id}`, {
    method: "PUT",
    data: studentData,
  });
  await fetchUpdateStudent.value?.fetch();
  if (!fetchUpdateStudent.value?.error) {
    resetForm();
  }
};
const getStudent = async (id) => {
  fetchStudent.value = useFetch(`students/${id}`, {
    method: "GET",
  });
  await fetchStudent.value?.fetch();
};
onMounted(async () => {
  const { id } = route.params;
  await getStudent(id);
});

const resetForm = () => {
  studentForm.value?.reset();
};
</script>
