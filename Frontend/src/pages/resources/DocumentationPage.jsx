import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BookOpen, Terminal, Settings, HelpCircle } from 'lucide-react';
import '../InfoPages.css';

const DocumentationPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Product Documentation</h1>
                        <p>Comprehensive guides and tutorials to get your fleet off the ground and fully integrated.</p>
                    </div>

                    <div className="info-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 0, backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>

                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="pricing-card" style={{ padding: 32, textAlign: 'left', height: '100%' }}>
                                <BookOpen size={32} className="text-primary" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Quick Start Guide</h3>
                                <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Step-by-step instructions for adding your first vehicles, drivers, and setting up your initial dispatch rules.</p>
                            </div>
                        </a>

                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="pricing-card" style={{ padding: 32, textAlign: 'left', height: '100%' }}>
                                <Settings size={32} className="text-secondary" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Configuration & Policies</h3>
                                <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>How to set up automated maintenance triggers, compliance blocking, and role-based access for your team.</p>
                            </div>
                        </a>

                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="pricing-card" style={{ padding: 32, textAlign: 'left', height: '100%' }}>
                                <Terminal size={32} style={{ color: '#10B981', marginBottom: 16 }} />
                                <h3 style={{ fontSize: 20, marginBottom: 8 }}>Hardware Integrations</h3>
                                <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Supported ELD devices, telematics installation guides, and troubleshooting sensor connectivity.</p>
                            </div>
                        </a>

                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="pricing-card" style={{ padding: 32, textAlign: 'left', height: '100%' }}>
                                <HelpCircle size={32} style={{ color: '#F59E0B', marginBottom: 16 }} />
                                <h3 style={{ fontSize: 20, marginBottom: 8 }}>FAQ & Troubleshooting</h3>
                                <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Solutions for common dashboard errors, dispatcher blocking overrides, and mobile app syncing issues.</p>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DocumentationPage;
