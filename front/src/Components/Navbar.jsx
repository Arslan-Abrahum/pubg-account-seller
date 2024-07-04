import React, { useEffect, useContext, useState } from 'react'
import Modal from 'react-modal';
import { useGlobalContext } from '../context';
import { FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
Modal.setAppElement('#root');

function Navbar({ }) {

    const { isModalOpen, toggleModal, handleAddAccount, handleImageUpload, passwordVisible , togglePasswordVisibility, isOpen, setIsOpen,toggleDropdown } = useGlobalContext()
    const { logout, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [feedback, setFeedback] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Function to handle scroll lock
        const handleScrollLock = () => {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        };
        // Apply scroll lock on mount
        handleScrollLock();
        // Clean up
        return () => {
            document.body.style.overflow = 'auto'; // Restore default on unmount
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isOpen) {
            setFormData({ username: user?.username || '', password: '' });
        }
    }, [isOpen, user]);

    // Update or reset Password
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:5000/api/auth/update',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            
            setFeedback('User updated successfully');
            setFormData({ username: '', password: '' });
            setIsOpen(false)
            navigate('/');
        } catch (err) {
            setFeedback('Error updating user. Please try again.');
            console.error(err);
        }
    };



    return (
        <div>
            <nav className="bg-white text-black font-bold shadow-lg p-4 flex justify-between items-center flex-wrap">
                <div>
                    <h1 className="text-4xl cursor-pointer">Gujjar Account</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="bg-red-500 text-white py-2 px-8 rounded mr-2 cursor-pointer hover:bg-red-600"
                        onClick={toggleModal}
                    >
                        Add New
                    </button>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white py-2 px-8 rounded cursor-pointer hover:bg-red-600"
                    >
                        Logout
                    </button>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="bg-red-500 text-white py-2 px-8 rounded cursor-pointer hover:bg-red-600"
                        >
                            Profile Settings
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-lg py-4 z-10">
                                <form onSubmit={onSubmit}>
                                    <div className="px-4 pb-4">
                                        <label htmlFor="username" className="block text-sm font-medium mb-2">Username:</label>
                                        <input
                                            onChange={onChange}
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                    <div className="px-4 pb-4">
                                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
                                        <input
                                            onChange={onChange}
                                            type={passwordVisible ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-3 text-sm text-gray-600"
                                        >
                                            {passwordVisible ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    <div className="px-4">
                                        <button  type='submit' className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded focus:outline-none">
                                            Reset or Update User Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className='fixed inset-0 bg-black bg-image bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='absolute top-4 left-4 flex'>
                        <button onClick={toggleModal} className='bg-red-500 py-2 px-4 rounded text-white text-2xl font-bold'><FaXmark /></button>
                    </div>

                    <div className='bg-white rounded-lg shadow-lg w-full max-w-xl'>
                        <div className='mb-4 bg-slate-500 bg-image rounded-t-lg p-12 text-center'>
                            <h2 className='text-4xl font-bold text-white uppercase'>Gujjar Carder</h2>
                        </div>
                        <div className='mb-4 p-6'>
                            <h1 className='text-2xl mb-14 font-semibold uppercase'>Add Carding Account</h1>
                            <form onSubmit={handleAddAccount}>
                                <div className='form-group space-y-4'>
                                    <div>
                                        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} className='w-full p-2 border rounded' required />
                                    </div>
                                    <div>
                                        <input type="text" name="accountTitle" placeholder="ACCOUNT TITLE" className='w-full p-2 text-xl rounded outline-none border-b-4' required />
                                    </div>
                                    <div>
                                        <input type="number" name="accountNumber" placeholder="ACCOUNT PRICE" className='w-full p-2 text-xl outline-none border-b-4 rounded' required />
                                    </div>
                                    <div>
                                        <input type="text" name="email" placeholder="ACCOUNT EMAIL / NUMBER" required className='w-full p-2 text-xl outline-none border-b-4 rounded' />
                                    </div>
                                    <div>
                                        <input type="password" name="password" placeholder="ACCOUNT PASSWORD" required className='w-full p-2 text-xl outline-none border-b-4 rounded' />
                                    </div>
                                    <button type='submit' className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 uppercase'>ADD Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default Navbar