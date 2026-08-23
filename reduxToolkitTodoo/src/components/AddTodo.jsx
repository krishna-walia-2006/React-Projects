import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, clearEditTodo } from '../features/todo/todoSlice';

function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    // 💡 Get the item that is staged for editing from Redux
    const currentEditTodo = useSelector((state) => state.currentEditTodo);

    // 💡 Whenever currentEditTodo changes (user clicked Edit), populate the input box
    useEffect(() => {
        if (currentEditTodo.id) {
            setInput(currentEditTodo.text);
        }
    }, [currentEditTodo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!input) return;

        // 💡 Check if we are in Update mode or Add mode
        if (currentEditTodo.id) {
            // Update Mode
            dispatch(updateTodo({ id: currentEditTodo.id, text: input }));
            dispatch(clearEditTodo()); // Reset the form back to "Add" mode
        } else {
            // Add Mode
            dispatch(addTodo(input));
        }
        
        setInput(''); // Clear local input state
    };

    return (
        <form onSubmit={submitHandler} className="space-x-3 mt-12">
            <input
                type="text"
                className="bg-gray-800 rounded border border-gray-700 text-gray-100 py-1 px-3"
                placeholder="Enter a Todo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            
            {/* 💡 Dynamically change button color and text based on mode */}
            <button
                type="submit"
                className={`text-white py-2 px-6 rounded text-lg ${
                    currentEditTodo.id ? "bg-orange-500 hover:bg-orange-600" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
            >
                {currentEditTodo.id ? "Update Todo" : "Add Todo"}
            </button>
        </form>
    );
}

export default AddTodo;