import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import urlConfig from '../../config';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            // Task 9 requirement: method and header attributes in the fetch request
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (data.authtoken) {
                sessionStorage.setItem('auth-token', data.authtoken);
                sessionStorage.setItem('email', data.email);
                navigate('/app');
            } else {
                setShowerr(data.error || 'Registration failed');
            }
        } catch (e) {
            console.error(e);
            setShowerr('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            {showerr && <p className="text-danger">{showerr}</p>}
            <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;
