import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Lock, Server, FileDigit, Shield } from 'lucide-react';
import '../InfoPages.css';

const SecurityPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Security Architecture</h1>
                        <p>We treat your operational data like financial data. Fleet Flow is built on Zero-Trust principles.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section text-center" style={{ marginBottom: 40 }}>
                            <div style={{ display: 'inline-flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px 32px', borderRadius: 8, fontWeight: 600 }}>SOC 2 Type II Certified</div>
                                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px 32px', borderRadius: 8, fontWeight: 600 }}>GDPR Compliant</div>
                                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px 32px', borderRadius: 8, fontWeight: 600 }}>End-to-End Encryption</div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h2><Lock size={24} /> Data Encryption</h2>
                            <p>
                                All data passed between your dispatchers' browsers, the ELD hardware, and our servers is encrypted in transit using TLS 1.3. Once it reaches our database, your sensitive records are encrypted at rest using AES-256 bit encryption. Not even a physical breach of our AWS data centers would expose your telematics.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Shield size={24} /> Role-Based Access Control (RBAC)</h2>
                            <p>
                                Security starts internally. Fleet Flow enforces strict hierarchical permissions. A driver cannot see financial ROI analytics, and a dispatcher cannot edit the master compliance certificates managed by the Safety Officer. We also support forced 2FA (Two-Factor Authentication) for all administrative accounts.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Server size={24} /> Infrastructure Resilience</h2>
                            <p>
                                We operate across multiple physical availability zones. If a server cluster goes offline, traffic is instantly re-routed to a replica cluster with zero data loss. Daily encrypted backups are stored in cold storage for 30 days.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><FileDigit size={24} /> Vulnerability Testing</h2>
                            <p>
                                We retain independent, third-party cybersecurity firms to conduct biannual penetration testing ("ethical hacking") on our web application and API endpoints. We also run automated static code analysis scanning for vulnerabilities on every single software update deployed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SecurityPage;
