import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Briefcase, Code, Terminal, Heart } from 'lucide-react';
import '../InfoPages.css';

const CareersPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Join the Fleet Flow Team</h1>
                        <p>We're building the infrastructure that moves the global economy. And we need your help.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section">
                            <h2>Why Work Here?</h2>
                            <p>
                                Logistics isn't just about trucks; it's a massive, complex data algorithm waiting to be optimized. At Fleet Flow, you will tackle high-stakes engineering problems where a 1% improvement in efficiency can save millions of gallons of fuel and drastically reduce carbon emissions.
                            </p>
                            <ul>
                                <li><strong>Remote-First Culture:</strong> Work from anywhere. We care about extreme ownership and output, not office hours.</li>
                                <li><strong>Top of Market Compensation:</strong> Competitive equity packages, 401(k) matching, and comprehensive healthcare.</li>
                                <li><strong>Hard Tech Problems:</strong> Deal with distributed systems, real-time socket streams, and huge datasets on a daily basis.</li>
                            </ul>
                        </div>

                        <div className="info-section">
                            <h2><Code size={24} /> Open Roles</h2>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 16, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text-main)' }}>Senior Backend Engineer (Node.js/Go)</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>Remote - Global</p>
                                <p style={{ fontSize: 15 }}>Design and scale our real-time telematics ingestion engine capable of handling millions of GPS events per minute.</p>
                                <button className="btn btn-outline" style={{ marginTop: 12, padding: '6px 16px', fontSize: 13 }}>Apply Now</button>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: 16, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text-main)' }}>Product Designer (UX/UI)</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>Remote - North America / Europe</p>
                                <p style={{ fontSize: 15 }}>Take our complex datasets and turn them into beautiful, highly intuitive dashboards for dispatchers and safety officers.</p>
                                <button className="btn btn-outline" style={{ marginTop: 12, padding: '6px 16px', fontSize: 13 }}>Apply Now</button>
                            </div>

                            <div>
                                <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text-main)' }}>Enterprise Account Executive</h3>
                                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>Remote - US Only</p>
                                <p style={{ fontSize: 15 }}>Lead the charge in expanding our footprint among Top 100 logistics carriers across North America.</p>
                                <button className="btn btn-outline" style={{ marginTop: 12, padding: '6px 16px', fontSize: 13 }}>Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CareersPage;
