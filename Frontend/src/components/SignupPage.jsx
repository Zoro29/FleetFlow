import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './AuthPages.css';
import { useAppContext } from '../context/AppContext';

const SignupPage = () => {
    const { register, login } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register({ name, email, password, role: 'Dispatcher' });
            // auto-login
            await login(email, password);
            // navigate to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message || 'Signup failed');
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
                    <h2>Create your account</h2>
                    <p>Get started with enterprise fleet structural management.</p>
                </div>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} />
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="John Doe" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="manager@fleet.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="••••••••" required />
                        </div>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="btn btn-primary auth-submit-btn">
                        Create Account <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
