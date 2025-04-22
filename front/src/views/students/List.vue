<template>
  <div>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="queryString.email"
              label="Pesquise por E-mail"
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="outlined"
              density="compact"
              hide-details
              aria-label="Buscar estudantes"
            ></v-text-field> </v-col
          ><v-col cols="12" md="3">
            <v-text-field
              v-model="queryString.ra"
              label="Pesquise por RA"
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="outlined"
              density="compact"
              hide-details
              aria-label="Buscar estudantes"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="primary" @click="search" aria-label="Pesquisar Aluno">
              Pesquisar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-sheet border rounded>
      <v-data-table-server
        :headers="headers"
        :items="fetchStudents?.data?.itens"
        :loading="fetchStudents?.loading"
        :items-length="fetchStudents?.data?.total  || 0"
        :items-per-page="queryString.limite"
        :page="queryString?.pagina"
        @update:options="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-card-actions>
            <v-icon @click="$router.push({ name: 'students-edit', params: { id: item.id } })"
              color="medium-emphasis"
              icon="mdi-pencil"
              size="small"
            ></v-icon>
            <v-icon @click="select(item)"
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
            ></v-icon>
          </v-card-actions>
        </template>
      </v-data-table-server>
    </v-sheet>
    <v-dialog v-model="dialog"
      max-width="400"
      >
    <v-card prepend-icon="mdi-delete" title="Tem certeza que deseja deletar?">
    <v-container>
      <p> <span class="font-weight-bold">RA:</span> {{ selectStudent?.ra }}</p>
      <p> <span class="font-weight-bold">Nome:</span> {{ selectStudent?.nome }}</p>
      <p> <span class="font-weight-bold">CPF:</span> {{ selectStudent?.cpf }}</p>
      <p> <span class="font-weight-bold">E-mail:</span> {{ selectStudent?.email }}</p>
    </v-container>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false"  color="grey darken-1" text>
            Cancelar
          </v-btn>
          <v-btn color="error" @click="deleteStudent(selectStudent.id)" :loading="fetchDeleteStudent?.loading">
            Deletar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef ,onMounted } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useRouter } from "vue-router";

const dialog = ref(false);
const selectStudent = ref(null);
const fetchStudents = ref(null);
const fetchDeleteStudent = ref(null);
const router = useRouter();
const queryString = reactive({
  pagina: 1,
  limite: 10,
  ra: "",
  email: "",
});
const select = (item)=>{
  dialog.value = true;
  selectStudent.value = item;
}
const search = async (obj) => { 
  if (obj) {
    queryString.pagina = parseInt(obj?.page) || 1;
    queryString.limite = parseInt(obj?.itemsPerPage) || 10;
  } 
  queryString.pagina = parseInt(obj?.page) || 1;
  queryString.limite = parseInt(obj?.itemsPerPage) || 10;
  
  
  if (queryString.ra === null) {
    queryString.ra = "";
  }
  if(queryString.email === null) {
    queryString.email = "";
  }
  const url = new URLSearchParams(queryString).toString();

  fetchStudents.value = useFetch(`students?${url}`, { method: "GET" });
  await fetchStudents.value.fetch();
};

const deleteStudent = async (id) => {
  fetchDeleteStudent.value = useFetch(`students/${id}`, { method: "DELETE" });
  await fetchDeleteStudent.value.fetch();
  dialog.value = false;
  await fetchStudents.value.fetch();
};

onMounted(async () => {
  search();
});
const headers = [
  { title: "RA", key: "ra", sortable: true },
  { title: "Nome", key: "nome", sortable: true },
  { title: "E-mail", key: "email", sortable: true },
  { title: "CPF", key: "cpf", sortable: true },
  { title: "Data Registro", key: "created_at", sortable: true },
  { title: "Data Atualizada", key: "updated_at", sortable: true },
  { title: "Ações", key: "actions", sortable: false },
];
</script>
