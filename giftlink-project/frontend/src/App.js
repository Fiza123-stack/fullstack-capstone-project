import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';

function LandingPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h1>GiftLink</h1>
            <p>Give away items you no longer need, or find free items near you.</p>
            <a href="/app"><button>Get Started</button></a>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<MainPage />} />
                <Route path="/gift/:id" element={<DetailsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
