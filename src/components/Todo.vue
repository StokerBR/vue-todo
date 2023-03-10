<script setup>
    import {ref, onMounted, computed} from 'vue';
    
    let todoItem = ref('');
    let items = ref([]);
    const log = computed(() => console.log);
    
    //Adds a new ToDo item if value is not empty
    function addTodoItem() {
        if (todoItem.value === '') return;
        items.value.unshift({
            name: todoItem.value,
            id: Date.now(),
        });
        todoItem.value = '';
    }
    
    //Toggles the checkbox and moves the item to the top or bottom of the list
    function toggleCheck(index) {
        let checked = !items.value[index]['checked'];
        let item = items.value.splice(index, 1)[0];
        item.checked = checked;
        
        //If checked, move to bottom of list, otherwise move to top
        if (checked) {
            items.value.push(item);
        } else {
            items.value.unshift(item);
        }
    }
    
</script>

<template>
    
    <div class="container">
        
        <div class="holder">
            
            <form @submit.prevent="addTodoItem">
                <input type="text" class="add-item" placeholder="Add an item" v-model="todoItem">
            </form>
            
            <div class="list">
                
                <transition-group tag="ul" name="list" appear>
                    
                    <li v-for="(item, index) in items" :key="item.id" @click="toggleCheck(index)">
                        
                        <label :class="['checkbox-container', {'checked': item.checked}]">
                            {{ item.name }}
                            <input type="checkbox" :checked="item.checked" disabled>
                            <span class="checkmark"></span>
                        </label>
                        
                    </li>
                    
                </transition-group>
                
            </div>
            
            <p v-if="!items.length">StokerBR's ToDo List</p>
            
        </div>
        
    </div>
        
</template>

<style lang="scss" scoped>
    @import '@/assets/scss/variables.scss';
    @import '@/assets/scss/checkbox.scss';
    @import 'animate.css';
    
    input.add-item {
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
                border-left: 5px solid $blue;
                margin-bottom: 2px;
                color: $white;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
            }
            
        }
        
    }

    p {
        text-align:center;
        padding: 30px 0;
        color: gray;
    }

    /* .list-enter-from {
        opacity: 0;
        transform: scale(0.5);
    }

    .list-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .list-enter-active {
        transition: all 0.2s ease;
    } */
    
    .list-enter-active {
        animation: fadeInDown 0.2s;
    }
    
    .list-leave-active {
        animation: zoomOut 0.2s;
        position: absolute;
    }
    
    .list-move {
        transition: all 0.2s ease;
    }
    
</style>