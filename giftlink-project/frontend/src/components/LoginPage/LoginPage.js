import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const authtoken = sessionStorage.getItem('auth-token') || '';

            // Task 10 requirement: Content-Type and Authorization attributes in headers
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authtoken}`,
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.authtoken) {
                sessionStorage.setItem('auth-token', data.authtoken);
                sessionStorage.setItem('name', data.userName);
                sessionStorage.setItem('email', data.userEmail);
                navigate('/app');
            } else {
                setShowerr(data.error || 'Login failed');
            }
        } catch (e) {
            console.error(e);
            setShowerr('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {showerr && <p className="text-danger">{showerr}</p>}
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
