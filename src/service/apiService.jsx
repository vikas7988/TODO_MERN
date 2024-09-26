import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});


export const signupApi = async (username, password) => {
    const response = await api.post('/auth/register', {username, password});
    return response.data;
};


export const loginApi = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};
export const logoutApi = async (credentials) => {
    const response = await api.get('/auth/logout');
    return response.data;
};


export const getProfileApi = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};


export const fetchTodosApi = async () => {
    const response = await api.get('/todos');
    return response.data;
};


export const addTodoApi = async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
};


export const deleteTodoApi = async (id) => {
    await api.delete(`/todos/${id}`);
};


export const updateTodoApi = async (id, todo) => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
};


