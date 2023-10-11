import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss'

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = () => {
        const isSuccess = AuthService.login(username, password);
        if (isSuccess) {
            navigate("/")
            setIsAuthenticated(true)
        } else {
            setError(toast("Invalid username or password"));
        }
    };

    return (
        <div className='login__container'>
            <div className="login__box">
                <h2>Login</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
            {error && <ToastContainer />}

        </div>
    );
}

export default Login;
