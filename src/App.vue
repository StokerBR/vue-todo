<script setup>
import Todo from './components/Todo.vue';
</script>

<template>
    
    <nav>
        <router-link to="/">ToDo</router-link>
        <router-link to="/about">About</router-link>
    </nav>
    
    <div class="container">
        <router-view />
    </div>

</template>

<style lang="scss">
    @import '@/assets/scss/variables.scss';
    @import url('https://fonts.cdnfonts.com/css/inter');
    @import url('https://fonts.cdnfonts.com/css/mona-sans');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css');

    body {
        background-color: $black;
        font-family: 'Mona-Sans', sans-serif;
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
    
    nav {
        display: flex;
        column-gap: 15px;
        padding: 20px 0;
        
        a {
            padding: 10px;
            text-decoration: none;
            background: $black-mute;
            border-radius: 3px;
            color: $text-light-2;
            font-weight: bold;
            
            &.router-link-active {
                background: $indigo;
                color: $white;
            }
            
            &:not(.router-link-active):hover {
                background: $text-light;
            }
            
        }
        
    }

    .container {
        margin: auto 0;
        padding-bottom: 20px;
        max-height: calc(100% - 100px);
    }
    
</style>
