import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex bg-image items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-black bg-opacity-50  p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-4xl text-white text-shadow-custom font-bold mb-6 text-center">Login</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-shadow-custom text-white font-medium " htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={onChange} 
                            placeholder="Username" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-shadow-custom text-white font-medium" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={onChange} 
                            placeholder="Password" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border-none rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-2 px-4 border-none outline-none rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                    >
                        Login
                    </button>
                    <p className='text-white'>
                        Don't have an account? <Link to="/signup" className="text-red-600 hover:text-red-700">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;