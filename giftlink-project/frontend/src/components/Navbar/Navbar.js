import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const email = sessionStorage.getItem('email');

    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <Link to="/" style={{ marginRight: '15px' }}>GiftLink</Link>
            <Link to="/app" style={{ marginRight: '15px' }}>Gifts</Link>
            <Link to="/search" style={{ marginRight: '15px' }}>Search</Link>
            {!email ? (
                <>
                    <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <span>Logged in as {email}</span>
            )}
        </nav>
    );
}

export default Navbar;
