<script setup>
    import {ref, onMounted} from 'vue';
    
    let todoItem = ref('');
    let items = ref([
        /* {name: 'a'},
        {name: 'b'},
        {name: 'c'}, */
    ]);
    
    function addTodoItem() {
        if (todoItem.value === '') return;
        items.value.push({name: todoItem.value});
        todoItem.value = '';
    }
    
</script>

<template>
    
    <div class="container">
        
        <div class="holder">
            
            <form @submit.prevent="addTodoItem">
                <input type="text" placeholder="Add an item" v-model="todoItem">
            </form>
            
            <div class="list">
                
                <ul>
                    <li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
                </ul>
                
            </div>
            
            <p>StokerBR's ToDo List</p>
            
        </div>
        
    </div>
        
</template>

<style lang="scss" scoped>
    @import '@/assets/scss/variables.scss';
    
    input {
        width: calc(100% - 40px);
        border: 0;
        padding: 20px;
        font-size: 1.3em;
        background-color: $black-mute;
        color: $text-light;
        
        &:focus {
            color: $white;
            outline: none;
        }
        
    }
    
    .container {
        padding: 40px 0;
        max-height: calc(100% - 80px);
    }
    
    .holder {
        display: flex;
        flex-direction: column;
        background: $black-mute;
        border-radius: 10px;
        overflow: hidden;
        max-height: 100%;
    }
    
    .list {
        
        overflow-y: auto;
        
        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
            
            li {
                padding: 20px;
                font-size: 1.3em;
                background-color: $text-light;
                border-left: 5px solid $indigo;
                margin-bottom: 2px;
                color: $white;
            }
            
        }
        
    }

    p {
        text-align:center;
        padding: 30px 0;
        color: gray;
    }
    
</style>