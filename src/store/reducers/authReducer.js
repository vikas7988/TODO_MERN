const initialState = {
    isAuthenticated: false,
    userName: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, error: null };
        case 'LOGIN':
            return { ...state, isAuthenticated: true, userName: action.payload, loading: false };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, userName: null, loading: false };
        case 'LOGIN_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
