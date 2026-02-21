import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './AuthPages.css';
import { useAppContext } from '../context/AppContext';

const SignupPage = () => {
    const { register, login } = useAppContext();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Dispatcher');

    const roleDescriptions = {
        'Fleet Manager': 'Oversee vehicle health, asset lifecycle, and scheduling.',
        'Dispatcher': 'Create trips, assign drivers, and validate cargo loads.',
        'Safety Officer': 'Monitor driver compliance, license expirations, and safety scores.',
        'Financial Analyst': 'Audit fuel spend, maintenance ROI, and operational costs.',
    };
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register({ name, email, password, role });
            // auto-login
            const body = await login(email, password);
            const r = body && body.user && body.user.role;
            if (r && r !== 'Fleet Manager') {
                if (r === 'Dispatcher') navigate('/role/dispatcher');
                else if (r === 'Safety Officer') navigate('/role/safety');
                else if (r === 'Financial Analyst') navigate('/role/finance');
                else navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
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

                    <div className="form-group">
                        <label htmlFor="role">User Type</label>
                        <div className="input-wrapper">
                            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="select-input">
                                <option value="Fleet Manager">Fleet Manager</option>
                                <option value="Dispatcher">Dispatcher</option>
                                <option value="Safety Officer">Safety Officer</option>
                                <option value="Financial Analyst">Financial Analyst</option>
                            </select>
                        </div>
                        <small className="role-desc">{roleDescriptions[role]}</small>
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
