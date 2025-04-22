<template>
  <v-navigation-drawer
    v-model="layoutStore.drawer"
    :rail="layoutStore.rail"    
    @click="layoutStore.setRail(false)">
    <v-list-item      
      :title="userStore.nome"
      nav>
      <template v-slot:prepend>
        
        <v-avatar size="40" class="mr-2">
          <img :src="avatar" alt="Avatar" />
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="layoutStore.toggleRail()"
        ></v-btn>
      </template>
    </v-list-item>  
    <v-divider></v-divider>   
    <v-list density="compact" nav>
      <v-list-item
        v-for="(route, index) in menuItems" 
        :key="index"
        :prepend-icon="route.meta?.icon || 'mdi-circle-small'"
        :title="route.meta?.title || ''"
        :to="{ name: route.name }"
        :value="route.name"
        v-show="!route.meta?.hidden && hasPermission(route)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
const layoutStore = useLayoutStore();
const router = useRouter();
const userStore = useUserStore();
const randomSeed = Math.random().toString(36).substring(2, 10);

const avatar = createAvatar(adventurer, {
  seed: randomSeed,
  size: 55,
}).toDataUri();

const menuItems = computed(() => {
  const dashboardRoute = router.getRoutes().find(route => route.path === '/dashboard');  
  if (dashboardRoute?.children) {
    return dashboardRoute.children.filter(route => !route.meta?.hidden);
  }
  return [];
});

const hasPermission = (route) => { 
  const userRoles = userStore.roles;
  return userRoles.some(role => route.meta.roles.includes(role));
};


</script>