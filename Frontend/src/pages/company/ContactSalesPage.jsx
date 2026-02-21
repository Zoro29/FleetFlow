import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import '../InfoPages.css';

const ContactSalesPage = () => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Contact Our Sales Team</h1>
                        <p>Ready to upgrade your fleet's operating system? Talk to our enterprise specialists to tailor a deployment plan.</p>
                    </div>

                    <div className="info-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

                        <div className="contact-info">
                            <h2 style={{ fontSize: 24, marginBottom: 24, color: 'var(--text-main)' }}>Let's talk scale.</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
                                Whether you're managing 50 box trucks or an international shipping line of 10,000+ assets, we want to hear about the specific bottlenecks in your operations.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: 12, borderRadius: '50%' }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: 16, color: 'var(--text-main)' }}>Email Us</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>enterprise@fleetflow.io</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: 12, borderRadius: '50%' }}>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: 16, color: 'var(--text-main)' }}>Call Directly</h4>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>+1 (800) 555-0199</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper" style={{ background: '#F8FAFC', padding: 32, borderRadius: 16, border: '1px solid var(--border-color)' }}>
                            {submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ background: '#DCFCE7', color: '#166534', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                        <MessageSquare size={32} />
                                    </div>
                                    <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--text-main)' }}>Message Received!</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>An enterprise specialist will contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 6 }}>Full Name</label>
                                        <input type="text" required style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 8 }} placeholder="Jane Doe" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 6 }}>Work Email</label>
                                        <input type="email" required style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 8 }} placeholder="jane@company.com" />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 6 }}>Company Size (Vehicles)</label>
                                        <select required style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                                            <option value="">Select an option</option>
                                            <option value="10-50">10 - 50</option>
                                            <option value="51-200">51 - 200</option>
                                            <option value="201-1000">201 - 1,000</option>
                                            <option value="1000+">1,000+</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 6 }}>How can we help?</label>
                                        <textarea required rows={4} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 8, resize: 'none' }} placeholder="Tell us about your operational challenges..."></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: 8, padding: 14 }}>Send Message</button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactSalesPage;
