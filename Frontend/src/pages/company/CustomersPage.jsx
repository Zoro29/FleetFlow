import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Building2, Globe2, Truck } from 'lucide-react';
import '../InfoPages.css';

const CustomersPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Trusted by Industry Leaders</h1>
                        <p>From regional distributors to global logistics behemoths, see who relies on Fleet Flow every single day.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section text-center" style={{ marginBottom: 48 }}>
                            <h2 style={{ justifyContent: 'center', marginBottom: 24 }}>Over 500,000+ Vehicles Managed Daily</h2>
                            <div className="pricing-grid">
                                <div className="pricing-card" style={{ padding: '32px 16px' }}>
                                    <Building2 size={40} className="text-secondary" style={{ margin: '0 auto 16px' }} />
                                    <h3 style={{ fontSize: 18 }}>Apex Freight Systems</h3>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Reduced idle time by 32% across 4,000 long-haul trucks.</p>
                                </div>
                                <div className="pricing-card" style={{ padding: '32px 16px' }}>
                                    <Globe2 size={40} className="text-secondary" style={{ margin: '0 auto 16px' }} />
                                    <h3 style={{ fontSize: 18 }}>Global Logistics Inc.</h3>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Achieved 100% compliance automation eliminating DOT fines.</p>
                                </div>
                                <div className="pricing-card" style={{ padding: '32px 16px' }}>
                                    <Truck size={40} className="text-secondary" style={{ margin: '0 auto 16px' }} />
                                    <h3 style={{ fontSize: 18 }}>Metro Cold Chain</h3>
                                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Saved $1.2M annually in preventative maintenance optimization.</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h2>The Fleet Flow Impact</h2>
                            <p>
                                Our partners don't just buy software; they enter into an efficiency partnership. On average, our enterprise deployments see a complete ROI within the first four months of implementation through recovered fuel costs and reduced out-of-service maintenance days.
                            </p>
                            <p>
                                <em>"Before Fleet Flow, our dispatchers were essentially playing a high-stakes memory game. Now, the system acts as a safety net that refuses to let us make operational errors."</em>
                                <br />— <strong>VP of Operations, Apex Freight Systems</strong>
                            </p>
                        </div>

                        <div className="info-section" style={{ textAlign: 'center', marginTop: 40 }}>
                            <Link to="/contact-sales" className="btn btn-primary btn-lg">Join the Fleet Flow Network</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomersPage;
