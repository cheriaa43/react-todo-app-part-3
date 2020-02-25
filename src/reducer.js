import todos from "./todos.json";
import { DELETE_TODO, TOGGLE_TODO, ADD_TODO, CLEAR_COMPLETED_TODOS } from "./actions";

const initialState = {
  todos: todos
};
const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            const newTodoList = state.todos.slice();
            newTodoList.push(action.payload);
            return { todos: newTodoList };
        }

        case TOGGLE_TODO: {
            const newTodoList = state.todos.map(todo => {
            if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
            }
            return todo;
            });
            return { todos: newTodoList };
        }
            
        case DELETE_TODO: {
            const newTodoList = state.todos.filter(todo => {
              if (todo.id === action.payload) {
                return false;
              }
              return true;
            });
            return { todos: newTodoList };
        }
            
        case CLEAR_COMPLETED_TODOS: {
            const newTodoList = state.todos.filter(todo => {
                if (todo.completed === true) {
                    return false;
                }
                return true;
            });
            return { todos: newTodoList };
        }
        default:
            return state;
  }
};

export default todosReducer;