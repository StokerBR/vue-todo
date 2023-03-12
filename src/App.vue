<script setup>
import Todo from './components/Todo.vue';
</script>

<template>
  
  <Todo/>
  
</template>

<style lang="scss">
    @import '@/assets/scss/variables.scss';
    @import url('https://fonts.cdnfonts.com/css/inter');
    @import url('https://fonts.cdnfonts.com/css/mona-sans');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css');

    body {
        background-color: $black;
        // font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-family: 'Mona-Sans', sans-serif;
        // font-family: 'Inter', sans-serif;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $white;
    }
    
    body, html {
        margin: 0;
        height: 100%;
    }
    
    #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40vw;
        min-width: 300px;
        height: 100%;
        
        @media (max-width: 768px) {
            width: 80vw;
        }
        
    }
</style>
