import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../InfoPages.css';

const ApiReferencePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>REST API Reference</h1>
                        <p>Build custom integrations and connect Fleet Flow directly into your proprietary ERP systems.</p>
                    </div>

                    <div className="info-content" style={{ maxWidth: 900 }}>
                        <div className="info-section">
                            <h2>Authentication</h2>
                            <p>
                                All API requests require a Bearer token in the Authorization header. You can generate API keys directly from your Fleet Flow admin dashboard under Developer Settings.
                            </p>
                            <pre style={{ background: '#1E293B', color: '#E2E8F0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 14 }}>
                                <code>curl -H "Authorization: Bearer YOUR_API_KEY" https://api.fleetflow.io/v1/vehicles</code>
                            </pre>
                        </div>

                        <div className="info-section">
                            <h2>Endpoints Overview</h2>

                            <div style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: 4, fontSize: 13, fontWeight: 700 }}>GET</span>
                                    /v1/vehicles
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8 }}>Returns a paginated list of all active assets in your fleet along with current GPS coordinates and operational status.</p>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 8px', borderRadius: 4, fontSize: 13, fontWeight: 700 }}>POST</span>
                                    /v1/trips/dispatch
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8 }}>Programmatically create a new trip assignment. Will return a 403 error if the driver is non-compliant or vehicle needs maintenance.</p>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <h3 style={{ fontSize: 18, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 8px', borderRadius: 4, fontSize: 13, fontWeight: 700 }}>DELETE</span>
                                    /v1/drivers/{"{id}"}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8 }}>Deactivate a driver profile. This does not hard-delete historical trip data associated with the driver for audit purposes.</p>
                            </div>
                        </div>

                        <div className="info-section text-center" style={{ marginTop: 40 }}>
                            <a href="#" className="btn btn-primary">Download OpenAPI Blueprint (.json)</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ApiReferencePage;
