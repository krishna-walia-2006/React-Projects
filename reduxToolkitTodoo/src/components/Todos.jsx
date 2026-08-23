import { useSelector, useDispatch } from 'react-redux'
import {removeTodo,setEditTodo} from '../features/todo/todoSlice'


function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
  return (
    <>
    
    <ul className="list-none w-full space-y-3">
  <div>
    {todos.map((todo) => (
      <li
  className="mt-4 flex items-center justify-between bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-xl shadow-sm hover:border-zinc-700 transition-all duration-200"
  key={todo.id}
>
  {/* Todo Text */}
  <div className="text-white text-base font-medium truncate">
    {todo.text}
  </div>

  {/* Buttons */}
  <div className="flex items-center gap-2 ml-4">

    {/* Update Button */}
    <button
      className="w-9 h-9 flex items-center justify-center rounded-lg
                 bg-blue-500/10 text-blue-400 border border-blue-500/20
                 hover:bg-blue-500 hover:text-white
                 transition-all duration-200"
      title="Update Todo"
      onClick={() => dispatch(setEditTodo({ id: todo.id, text: todo.text }))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 7.125L16.875 4.5"
        />
      </svg>
    </button>

    {/* Delete Button */}
    <button
      onClick={() => dispatch(removeTodo(todo.id))}
      className="w-9 h-9 flex items-center justify-center rounded-lg
                 bg-red-500/10 text-red-400 border border-red-500/20
                 hover:bg-red-500 hover:text-white
                 transition-all duration-200"
      title="Delete Todo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>

  </div>
</li>
    ))}
  </div>
</ul>
    </>
  )
}

export default Todos