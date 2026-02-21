import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle2 } from 'lucide-react';
import '../InfoPages.css';

const SystemStatusPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header" style={{ marginBottom: 40 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#DCFCE7', color: '#166534', padding: '12px 24px', borderRadius: 30, fontWeight: 600, fontSize: 18, marginBottom: 24 }}>
                            <CheckCircle2 size={24} />
                            All Systems Operational
                        </div>
                        <h1 style={{ fontSize: 32 }}>Real-Time System Status</h1>
                        <p>We target 99.99% uptime. Below is the live status of our core infrastructure services.</p>
                    </div>

                    <div className="info-content" style={{ maxWidth: 700 }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                            <div>
                                <h3 style={{ fontSize: 16, margin: 0, color: 'var(--text-main)' }}>Web Application Engine</h3>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>Frontend dashboards & routing</p>
                            </div>
                            <span style={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Operational</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                            <div>
                                <h3 style={{ fontSize: 16, margin: 0, color: 'var(--text-main)' }}>Telematics Ingestion API</h3>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>Real-time GPS socket connections</p>
                            </div>
                            <span style={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Operational</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                            <div>
                                <h3 style={{ fontSize: 16, margin: 0, color: 'var(--text-main)' }}>Compliance Logic Gateway</h3>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>Driver and maintenance permission checking</p>
                            </div>
                            <span style={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Operational</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
                            <div>
                                <h3 style={{ fontSize: 16, margin: 0, color: 'var(--text-main)' }}>PostgreSQL Database Storage</h3>
                                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>Core relational data records</p>
                            </div>
                            <span style={{ color: '#10B981', fontWeight: 600, fontSize: 14 }}>Operational</span>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SystemStatusPage;
