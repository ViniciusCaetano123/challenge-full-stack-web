<template>
    <div>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <router-link :to="{ name: 'students'}">Go to Home</router-link>
        <router-link :to="{name: 'login'}">Go to Login</router-link>
    </div>
</template>