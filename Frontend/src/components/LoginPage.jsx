import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, ArrowRight } from 'lucide-react';
import './AuthPages.css';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const body = await login(email, password);
            const role = body && body.user && body.user.role;
            if (role && role !== 'Fleet Manager') {
                if (role === 'Dispatcher') navigate('/role/dispatcher');
                else if (role === 'Safety Officer') navigate('/role/safety');
                else if (role === 'Financial Analyst') navigate('/role/finance');
                else navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page-container">
            {/* Background styling elements */}
            <div className="auth-bg-blob top-left"></div>
            <div className="auth-bg-blob bottom-right"></div>

            <div className="auth-card animate-fade-in-up">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        <Truck className="logo-icon" size={28} />
                        <span className="logo-text">Fleet Flow</span>
                    </Link>
                    <h2>Welcome back</h2>
                    <p>Enter your credentials to access your operational dashboard.</p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="manager@fleet.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Password</label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="••••••••" required />
                        </div>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="btn btn-primary auth-submit-btn">
                        Log In <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
