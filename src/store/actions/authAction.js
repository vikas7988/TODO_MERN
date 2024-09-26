import { toast } from 'react-toastify';
import {
    loginApi,
    logoutApi,
    getProfileApi, 
} from '../../service/apiService';

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOADING' }); 
            const response = await loginApi({ username, password });

            
            if (response.success) {
                dispatch({ type: 'LOGIN', payload: response.name });
                toast.success('Login successful!'); 
                // console.log('Login successful:', response);
                return true;
            } else {
                dispatch({ type: 'LOGIN_ERROR', payload: response.message || 'Login failed' });
                toast.error(response.message || 'Login failed');
                // console.error('Login failed:', response.message);
                return false;
            }
        } catch (error) {
            // console.error('Login failed:', error);
            dispatch({ type: 'LOGIN_ERROR', payload: 'An error occurred during login' });
            toast.error('An error occurred during login');
            return false; 
        }
    };
};



export const logout = () => {
    return async (dispatch) => {
        try {
            await logoutApi(); 
            dispatch({ type: 'LOGOUT' });
            // console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error);
          
        }
    };
};


export const fetchProfile = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOADING' }); 
            const response = await getProfileApi();

            
            if (response.username) {
                dispatch({ type: 'LOGIN', payload: response.username });
                // console.log('Profile fetch successful:', response);
            } else {
                dispatch({ type: 'LOGIN_ERROR', payload: 'Failed to fetch profile' });
                // console.error('Profile fetch failed');
            }
        } catch (error) {
            // console.error('Profile fetch error:', error);
            dispatch({ type: 'LOGIN_ERROR', payload: 'Error occurred during profile fetch' });
        }
    };
};



