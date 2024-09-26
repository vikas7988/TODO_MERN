
import { fetchTodosApi, addTodoApi, deleteTodoApi, updateTodoApi } from '../../service/apiService';

export const fetchTodos = () => {
    return async (dispatch) => {
        const response = await fetchTodosApi();
        dispatch({ type: 'SET_TODOS', payload: response });
    };
};

export const addTodo = (todo) => {
    return async (dispatch) => {
        const response = await addTodoApi(todo);
        dispatch({ type: 'ADD_TODO', payload: response });
    };
};

export const deleteTodo = (id) => {
    return async (dispatch) => {
        await deleteTodoApi(id);
        dispatch({ type: 'DELETE_TODO', payload: id });
    };
};

export const updateTodo = (todo) => {
    return async (dispatch) => {
        const response = await updateTodoApi(todo.id, { name: todo.name });
        dispatch({ type: 'UPDATE_TODO', payload: response });
    };
};
