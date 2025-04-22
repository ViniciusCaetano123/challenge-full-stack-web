<template>
  <v-responsive>
    <v-app>
      <NavBar></NavBar>
      <SideBar></SideBar>  
      <v-main class="h-full">
        <v-container fluid>
          <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>