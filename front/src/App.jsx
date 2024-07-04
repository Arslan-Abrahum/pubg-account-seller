import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Home'; // Assuming you have a Home component
import Details from './Components/Details';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={"/details"} element={<Details/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
