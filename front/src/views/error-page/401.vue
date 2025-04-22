<template>
    <div>
        <h1>401</h1>
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <router-link :to="{ name: 'students'}">Go to Home</router-link>
        <router-link :to="{name: 'login'}">Go to Login</router-link>
    </div>
</template>