const initialState = {
    todos: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo._id !== action.payload) };
        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo._id === action.payload._id ? action.payload : todo
                )
            };
        default:
            return state;
    }
};

export default todoReducer;
