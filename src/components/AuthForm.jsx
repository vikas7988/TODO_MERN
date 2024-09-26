import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { signupApi } from '../service/apiService';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            
             dispatch(login(username, password)); 
        } else {
            
            if (!validatePassword(password)) {
                toast.error("Password must be at least 8 characters long and contain at least one letter and one special character or number.");
                return; 
            }
            try {
                const result = await signupApi(username, password); // Wait for the signup result
                if (result) { // If signup was successful
                    toast.success('Signup successful! Redirecting to login...'); // Notify user
                    setTimeout(() => setIsLogin(true), 2000); // Redirect after 2 seconds
                }
            } catch (err) {
                // console.log(err.response.data.error)
                toast.error(err?.response?.data?.error || 'Signup failed. Please try again.'); // Notify user of the error
            }
        }
    };

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
        setUsername(''); 
        setPassword(''); 
    };


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/todos'); 
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center">
                {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            <form onSubmit={handleSubmit} className="mt-6">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="block w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full p-2 mb-4 border rounded"
                    required
                />
                {error && isLogin && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : isLogin ? 'bg-blue-500' : 'bg-green-500'} text-white`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={toggleAuthMode} 
                    className="text-blue-500"
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
