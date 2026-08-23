import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: 1,
        text: "Hello World"
    }],currentEditTodo: { id: null, text: '' }
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state,action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state,action) => {
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload; // Payload is now an object
            const existingTodo = state.todos.find((todo) => todo.id === id);
            
            if (existingTodo) {
                existingTodo.text = text; // Mutate directly using Immer
            }
        },
        // 2. Grabs the todo from the list and stages it for editing
        setEditTodo: (state, action) => {
            state.currentEditTodo = action.payload; 
        },
        // 3. Clears the top input box back to normal "Add" mode
        clearEditTodo: (state) => {
            state.currentEditTodo = { id: null, text: '' };
        }
    }    

})

export const {addTodo,removeTodo,updateTodo,setEditTodo,clearEditTodo} = todoSlice.actions

export default todoSlice.reducer