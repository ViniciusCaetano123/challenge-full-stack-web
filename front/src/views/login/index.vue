<template>
  <div class="d-flex align-center justify-center h-screen">
    <v-card class="mx-auto w-100" max-width="454">
      <v-container class="pa-10">
        <div class="d-flex justify-space-between align-center">
          <h1 class="text-h5 font-weight-bold">Login</h1>
          <router-link to="/register" class="text-primary text-decoration-none">Não tem uma conta?</router-link>
        </div>
        <v-form @submit.prevent="submit" class="mt-7">
          <div class="mb-6">
            <v-label>E-mail </v-label>
            <v-text-field aria-label="email address" v-model="email" class="mt-2" required hide-details="auto"
              variant="outlined" color="primary" ></v-text-field>
          </div>
          <div class="mb-6">
            <v-label>Senha</v-label>
            <v-text-field  aria-label="password" v-model="password" required variant="outlined" color="primary"
              hide-details="auto" :type="showEveOutline ? 'text' : 'password'" class="mt-2" >
              <template v-slot:append-inner>
                <v-icon :icon="showEveOutline ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" class="cursor-pointer"
                  @click="showEveOutline = !showEveOutline"></v-icon>
              </template>
            </v-text-field>
          </div> 
          <v-alert density="compact" size="x-small"  v-if="isValid" :title="isValid" type="error" class="mb-3"></v-alert>
          <v-btn :loading="fetchLogin?.loading" :readonly="fetchLogin?.loading" color="primary" class="w-100 pa-1" size="large" text="Login"
          type="submit"> </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script setup>
import Auth from '@/models/Auth'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { setItem } from '../../utils/localStorage'
const router = useRouter()
const email = ref('')
const password = ref('')
const showEveOutline = ref(false)
const isValid = ref('')
const fetchLogin = ref(null)
const userStore = useUserStore()
const submit = async () => {
  isValid.value = '';
  const auth = new Auth(email.value, password.value);
  const validation = auth.validate(); 

  if (!validation.success) {
    isValid.value = validation.errors[0]; 
    return;
  }
  
  const { url, config } = login(auth); 
  fetchLogin.value = useFetch(url, config);
  await fetchLogin.value?.fetch();  
  console.log('fetchLogin', fetchLogin.value);
  if (fetchLogin.value?.error) {      
    //isValid.value = fetchLogin.value.error.message;
  } else {
    const {payload} = fetchLogin.value?.data
    userStore.setUser({
      id: payload.id,
      nome: payload.nome,
      email: payload.email,     
      perfil: payload.perfil,
      token: payload.token,
    });
    setItem('user', payload);
    router.push({name: 'students'});
  }
};
</script>