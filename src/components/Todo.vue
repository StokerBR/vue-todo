<script setup>
    import {ref, onMounted, computed} from 'vue';
    import {useVuelidate} from '@vuelidate/core';
    import {required, minLength, maxLength, helpers} from '@vuelidate/validators';
    
    const todoItem = ref('');
    
    const prevItems = JSON.parse(localStorage.getItem("todoItems") || '[]'); //Gets items from local storage or empty array if none
    const items = ref(prevItems);
    
    //Checks if value is unique in the list
    const unique = (value) => {
        return !items.value.some(item => item.name === value);
    }
    
    //Validation rules
    const rules = computed(() => ({
        todoItem: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(20),
            unique: helpers.withMessage('This item already exists', unique)
        }
    }));
    
    //Vuelidate instance
    const v$ = useVuelidate(rules, {todoItem});
    
    //Updates local storage when items change
    function updateStorage() {
        localStorage.setItem("todoItems", JSON.stringify(items.value));
    }
    
    //Adds a new ToDo item if value is valid
    async function addTodoItem() {
        const isValid = await v$.value.$validate();
        
        if (isValid) {
            
            items.value.unshift({
                name: todoItem.value,
                id: Date.now(),
            });
            
            updateStorage();
            
            todoItem.value = '';
            v$.value.$reset();
            
        }
        
    }
    
    //Handles the checkbox change
    function handleCheck(index, toggle = false) {
        let item = items.value.splice(index, 1)[0];
        let checked = item.checked;

        if (toggle) {
            checked = !checked;
            item.checked = checked;
        }
        
        //If checked, move to bottom of list, otherwise move to top
        if (checked) {
            items.value.push(item);
        } else {
            items.value.unshift(item);
        }
        
        updateStorage();
        
    }
    
    //Removes a ToDo item
    function removeTodoItem(index) {
        items.value.splice(index, 1);
        updateStorage();
    }
    
</script>

<template>
    
    <div class="holder">
        
        <form @submit.prevent="addTodoItem">
            <input type="text" class="add-item" placeholder="Add an item" v-model="todoItem" maxlength="20">
            <span class="input-error" v-if="v$.todoItem.$error">{{ v$.todoItem.$errors[0].$message }}</span>
        </form>
        
        <div class="list">
            
            <transition-group tag="ul" name="list" appear>
                
                <li v-for="(item, index) in items" :key="item.id" @click="handleCheck(index, true)">
                    
                    <div class="label-wrapper">
                        <label :class="['checkbox-container', {'checked': item.checked}]" @click.stop>
                            <span class="text" :title="item.name">{{ item.name }}</span>
                            <input type="checkbox" :checked="item.checked" v-model="item.checked" @change="handleCheck(index)">
                            <span class="checkmark" @click.stop></span>
                        </label>
                    </div>
                    
                    <button type="button" class="remove" @click.stop="removeTodoItem(index)">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    
                </li>
                
            </transition-group>
            
        </div>
        
        <p v-if="!items.length">StokerBR's ToDo List</p>
        
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
        color: $white;
        
        &:focus {
            outline: none;
        }
        
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
                
                .label-wrapper {
                    width: calc(100% - 40px);
                    
                    .text {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                    
                }
                
                .remove {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: auto;
                    width: 30px;
                    height: 30px;
                    border: none;
                    border-radius: 50%;
                    background-color: $black;
                    color: $text-light-2;
                    cursor: pointer;
                    
                    &:hover {
                        background-color: $black-mute;
                    }
                    
                }
                
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
    }
    
    .list-move {
        transition: all 0.2s ease;
    }
    
    form {
        position: relative;
    }
    
    .input-error {
        background-color: $error;
        color: $white;
        font-weight: 600;
        font-size: 12px;
        padding: 5px;
        position: absolute;
        left: 0;
        bottom: -10px;
        z-index: 2;
    }
    
</style>