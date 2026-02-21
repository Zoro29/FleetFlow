import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle2 } from 'lucide-react';
import './InfoPages.css';

const PricingInfoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Simple, Transparent Pricing</h1>
                        <p>No hidden fees or surprise overages. Pay only for the size of your fleet and the features you need to scale comfortably.</p>
                    </div>

                    <div className="info-content" style={{ maxWidth: '1000px', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
                        <div className="pricing-grid">

                            {/* Pro Plan */}
                            <div className="pricing-card">
                                <h3>Professional</h3>
                                <div className="price">$49<span>/mo</span></div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, minHeight: 42 }}>
                                    Perfect for small but growing fleets looking to digitize their operations.
                                </p>
                                <div className="info-section" style={{ textAlign: 'left', marginBottom: 0 }}>
                                    <ul>
                                        <li>Up to 20 Vehicles</li>
                                        <li>Basic Trip Dispatching</li>
                                        <li>Standard Maintenance Logs</li>
                                        <li>Email Support</li>
                                    </ul>
                                </div>
                                <Link to="/signup" className="btn btn-outline pricing-btn">Start Free Trial</Link>
                            </div>

                            {/* Enterprise Plan */}
                            <div className="pricing-card popular">
                                <div className="popular-badge">MOST POPULAR</div>
                                <h3>Enterprise</h3>
                                <div className="price">$199<span>/mo</span></div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, minHeight: 42 }}>
                                    Advanced insights and automation for serious logistics operations.
                                </p>
                                <div className="info-section" style={{ textAlign: 'left', marginBottom: 0 }}>
                                    <ul>
                                        <li>Up to 100 Vehicles</li>
                                        <li>Automated Compliance Blocking</li>
                                        <li>Financial ROI Dashboard</li>
                                        <li>Priority 24/7 Support</li>
                                    </ul>
                                </div>
                                <Link to="/signup" className="btn btn-primary pricing-btn">Get Started</Link>
                            </div>

                            {/* Unlimited Plan */}
                            <div className="pricing-card">
                                <h3>Unlimited</h3>
                                <div className="price">Custom</div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, minHeight: 42 }}>
                                    Full ecosystem connection for massive fleets doing global business.
                                </p>
                                <div className="info-section" style={{ textAlign: 'left', marginBottom: 0 }}>
                                    <ul>
                                        <li>Unlimited Vehicles</li>
                                        <li>Full API & Integrations</li>
                                        <li>Custom Reporting Engine</li>
                                        <li>Dedicated Success Manager</li>
                                    </ul>
                                </div>
                                <Link to="/signup" className="btn btn-outline pricing-btn">Contact Sales</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PricingInfoPage;
