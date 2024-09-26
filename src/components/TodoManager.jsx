import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from '../store/actions/todoAction';
import { logout } from '../store/actions/authAction';
import { motion, AnimatePresence } from 'framer-motion';

const TodoManager = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const userName = useSelector((state) => state.auth.userName); 
    const [formState, setFormState] = useState({
        todoInput: '',
        editingTodoId: null,
        error: '',
    });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddOrUpdateTodo = (e) => {
        e.preventDefault();

        if (!formState.todoInput.trim()) {
            setFormState((prevState) => ({
                ...prevState,
                error: 'Todo item name cannot be empty',
            }));
            return;
        }

        setFormState((prevState) => ({
            ...prevState,
            error: '',
        }));

        if (formState.editingTodoId) {
            dispatch(updateTodo({ id: formState.editingTodoId, name: formState.todoInput }));
            setFormState((prevState) => ({
                ...prevState,
                editingTodoId: null,
                todoInput: '',
            }));
        } else {
            dispatch(addTodo({ name: formState.todoInput }));
            setFormState((prevState) => ({
                ...prevState,
                todoInput: '',
            }));
        }
    };

    const handleEditTodo = (todo) => {
        setFormState({
            todoInput: todo.name,
            editingTodoId: todo._id,
            error: '',
        });
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleLogout = () => {
        dispatch(logout()); // Call the logout action
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50, backgroundColor: "#f0f0f0" },
        visible: {
            opacity: 1,
            x: 0,
            backgroundColor: "#ffffff",
            transition: { type: "spring", stiffness: 100, duration: 0.5 },
        },
        exit: { opacity: 0, x: 50, backgroundColor: "#ffeded", transition: { duration: 0.3 } },
    };

    const buttonHoverVariants = {
        hover: {
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(0, 0, 0, 0.3)",
        },
    };

    const formVariants = {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            {/* Profile Section */}
            <div className="bg-gray-200 p-4 rounded mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Welcome, {userName || 'User'}</h2>
                <motion.button
                    onClick={handleLogout}
                    className="bg-red-500 text-white p-2 rounded"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                >
                    Logout
                </motion.button>
            </div>

            {/* Todo Section */}
            <h2 className="text-2xl font-bold text-center">Todo List</h2>
            <motion.form
                onSubmit={handleAddOrUpdateTodo}
                className="mt-6"
                variants={formVariants}
                whileHover="hover"
                whileTap="tap"
            >
                <input
                    type="text"
                    value={formState.todoInput}
                    onChange={(e) => setFormState((prevState) => ({ ...prevState, todoInput: e.target.value }))}
                    placeholder="New Todo"
                    className="block w-full p-2 mb-4 border rounded"
                />
                {formState.error && <p className="text-red-500 mb-2">{formState.error}</p>}
                <motion.button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                >
                    {formState.editingTodoId ? 'Update Todo' : 'Add Todo'}
                </motion.button>
            </motion.form>

            <ul className="mt-4">
                <AnimatePresence>
                    {todos.map((todo) => (
                        <motion.li
                            key={todo._id}
                            className="flex justify-between items-center p-2 border-b"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={itemVariants}
                        >
                            {todo.itemName}
                            <div className="flex">
                                <motion.button
                                    onClick={() => handleEditTodo(todo)}
                                    className="text-green-500 mr-4"
                                    variants={buttonHoverVariants}
                                    whileHover="hover"
                                >
                                    Edit
                                </motion.button>
                                <motion.button
                                    onClick={() => handleDeleteTodo(todo._id)}
                                    className="text-red-500"
                                    variants={buttonHoverVariants}
                                    whileHover="hover"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default TodoManager;
