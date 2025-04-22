<template>
  <v-app-bar elevation="0" height="60" color="teal-darken-4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="layoutStore.toggleDrawer()"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Grupo A Educação</v-app-bar-title>   
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'

const theme = useTheme()
const layoutStore = useLayoutStore()

const isDarkMode = computed({
  get: () => theme.global.current.value.dark,
  set: (value) => {
    theme.global.name.value = value ? 'dark' : 'light'
  }
})

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}
</script>