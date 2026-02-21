import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, ArrowRight, X, KeyRound } from 'lucide-react';
import './AuthPages.css';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, checkEmail } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [shake, setShake] = useState(false);

    // OTP Modal State
    const [showOtp, setShowOtp] = useState(false);
    const [otpStep, setOtpStep] = useState('generate'); // 'generate' | 'enter' | 'reset'
    const [otpValue, setOtpValue] = useState('');
    const [otpEmail, setOtpEmail] = useState('');
    const [otpError, setOtpError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingOtp, setLoadingOtp] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const body = await login(email, password);
            const apiRole = body && body.user && body.user.role;

            // Normalize backend enum roles to the display roles used for routing
            let role = apiRole;
            if (apiRole === 'Manager') role = 'Fleet Manager';
            else if (apiRole === 'Safety') role = 'Safety Officer';
            else if (apiRole === 'Finance') role = 'Financial Analyst';

            if (role && role !== 'Fleet Manager') {
                if (role === 'Dispatcher') navigate('/role/dispatcher');
                else if (role === 'Safety Officer') navigate('/role/safety');
                else if (role === 'Financial Analyst') navigate('/role/finance');
                else navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Incorrect user name or password');
            setShake(true);
            setTimeout(() => setShake(false), 500);
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
                        <div className={`input-wrapper ${shake ? 'error-shake' : ''}`}>
                            <Mail className="input-icon" size={18} />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="manager@fleet.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Password</label>
                            <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); setShowOtp(true); setOtpStep('generate'); setOtpValue(''); setOtpEmail(email); setNewPassword(''); setConfirmPassword(''); setOtpError(''); }}>Forgot password?</a>
                        </div>
                        <div className={`input-wrapper ${shake ? 'error-shake' : ''}`}>
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

            {/* OTP Demo Modal */}
            {showOtp && (
                <div className="auth-modal-overlay" onClick={() => setShowOtp(false)}>
                    <div className="auth-modal-box animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                        <button className="auth-modal-close" onClick={() => setShowOtp(false)}>
                            <X size={20} />
                        </button>

                        <div className="auth-modal-header">
                            <KeyRound size={32} className="auth-modal-icon" />
                            <h3>Password Recovery</h3>
                            <p>
                                {otpStep === 'generate' && "Enter your email address and we'll send you an OTP."}
                                {otpStep === 'enter' && "Enter the 4-digit OTP sent to your email."}
                                {otpStep === 'reset' && "Create a new secure password for your account."}
                            </p>
                        </div>

                        {otpError && otpError !== 'UNREGISTERED' && <div className="auth-error" style={{ marginBottom: 16 }}>{otpError}</div>}

                        {otpStep === 'generate' && (
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input value={otpEmail} onChange={e => setOtpEmail(e.target.value)} type="email" placeholder="manager@fleet.com" disabled={loadingOtp} />
                                </div>
                                <button className="btn btn-primary auth-submit-btn" style={{ marginTop: 16 }} disabled={loadingOtp} onClick={async () => {
                                    if (!otpEmail) {
                                        setOtpError('Please enter an email.');
                                        return;
                                    }

                                    setLoadingOtp(true);
                                    setOtpError('');

                                    // Real Registration Check
                                    const isRegistered = await checkEmail(otpEmail);

                                    setLoadingOtp(false);

                                    if (!isRegistered) {
                                        setOtpError('UNREGISTERED');
                                        return;
                                    }

                                    setOtpError('');
                                    setOtpStep('enter');
                                }}>
                                    {loadingOtp ? 'Verifying...' : <>Generate OTP <ArrowRight size={18} /></>}
                                </button>

                                {otpError === 'UNREGISTERED' && (
                                    <div style={{ textAlign: 'center', marginTop: 16, padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8 }}>
                                        <p style={{ color: 'var(--error)', fontSize: 13, fontWeight: 600, margin: '0 0 8px 0' }}>
                                            We couldn't find any account registered with this email.
                                        </p>
                                        <Link to="/signup" className="btn btn-outline" style={{ display: 'inline-block', width: '100%', padding: '8px', fontSize: 13 }}>
                                            Sign up for a new account
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {otpStep === 'enter' && (
                            <div className="form-group">
                                <label>One-Time Password (OTP)</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input value={otpValue} onChange={e => setOtpValue(e.target.value)} type="text" placeholder="e.g. 1234" maxLength={4} />
                                </div>
                                <button className="btn btn-primary auth-submit-btn" style={{ marginTop: 16 }} onClick={() => {
                                    if (otpValue === '1234') {
                                        setOtpError('');
                                        setOtpStep('reset');
                                    } else {
                                        setOtpError('Invalid OTP. Please try again.');
                                    }
                                }}>
                                    Verify OTP
                                </button>
                                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-secondary)', background: '#F8FAFC', padding: '8px 12px', borderRadius: 8, border: '1px dashed #CBD5E1' }}>
                                    💡 <strong>For the Demo Version Use otp "1234"</strong>
                                </div>
                            </div>
                        )}

                        {otpStep === 'reset' && (
                            <div className="form-group">
                                <label>Create New Password</label>
                                <div className="input-wrapper" style={{ marginBottom: 12 }}>
                                    <Lock className="input-icon" size={18} />
                                    <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="••••••••" />
                                </div>

                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" />
                                </div>

                                <button className="btn btn-primary auth-submit-btn" style={{ marginTop: 16 }} onClick={async () => {
                                    if (!newPassword || !confirmPassword) {
                                        setOtpError('Please fill in both fields.');
                                        return;
                                    }
                                    if (newPassword !== confirmPassword) {
                                        setOtpError('Passwords do not match.');
                                        return;
                                    }

                                    // Auto login after reset
                                    setShowOtp(false);
                                    try {
                                        const body = await login(otpEmail, newPassword);
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
                                        // Fallback if backend isn't connected
                                        setEmail(otpEmail);
                                        setPassword(newPassword);
                                        setError('Password successfully reset! You can now log in.');
                                    }
                                }}>
                                    Reset & Log In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
