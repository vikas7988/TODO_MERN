import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TodoManager from './components/TodoManager';
import { fetchProfile } from './store/actions/authAction';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/protectedroutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile()); 
    }, [dispatch]);

    return (<>
     <ToastContainer 
    position="top-right" 
    autoClose={1500} 
    hideProgressBar={false} 
    closeOnClick 
    pauseOnHover 
    draggable 
    theme="light" 
/>

<div className='p-10'>
        <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/todos" element={<TodoManager />} />
            </Route>
        </Routes>

        </div>
        </> );
};

export default App;
