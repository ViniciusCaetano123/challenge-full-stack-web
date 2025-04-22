<script setup>
import { RouterView } from 'vue-router'
import { toast } from '@/composables/useToast'
</script>

<template>
  <v-snackbar
    location="top"
    v-model="toast.show"
    :color="toast.color"
    timeout="3000"
  >
    {{ toast.message }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="toast.show = false"
      >Fechar</v-btn>
    </template>
  </v-snackbar>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>