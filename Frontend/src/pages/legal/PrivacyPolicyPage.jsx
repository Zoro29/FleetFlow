import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../InfoPages.css';

const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Privacy Policy</h1>
                        <p>Last Updated: October 15, 2023</p>
                    </div>

                    <div className="info-content text-left">
                        <div className="info-section">
                            <p>
                                At Fleet Flow, we recognize that fleet data—specifically locational telematics, operational schedules, and financial metrics—is highly sensitive competitive intelligence. This Privacy Policy outlines exactly how we collect, process, and permanently secure your data.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>1. Data We Collect</h2>
                            <ul>
                                <li><strong>Telematics & GPS Data:</strong> Real-time geolocational coordinates, engine idling metrics, and hard-braking incidents via hardware integrations.</li>
                                <li><strong>Operational Identifiers:</strong> Driver names, license numbers, expiration dates, and assigned vehicle ID numbers.</li>
                                <li><strong>Financial Records:</strong> Fuel slips, maintenance invoices, and toll expenditures inputted by users or imported via ERP APIs.</li>
                            </ul>
                        </div>

                        <div className="info-section">
                            <h2>2. How We Use Your Data</h2>
                            <p>
                                We process this data <strong>exclusively</strong> to provide the Fleet Flow service. It is used to run routing algorithms, fire compliance alerts, and calculate cost-per-kilometer metrics. <strong>We do not, under any circumstances, sell, lease, or anonymize-and-resell your fleet data to third parties, insurance companies, or competing logistics firms.</strong>
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>3. Data Deletion & Retention</h2>
                            <p>
                                You own your data. Upon termination of an Enterprise agreement, or upon written request, Fleet Flow will execute a hard cryptographic wipe of all telematics and user data associated with your tenant database within 30 days, retaining only legally required billing invoices.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>4. Subprocessors</h2>
                            <p>
                                To provide our service, we use highly vetted infrastructure subprocessors including Amazon Web Services (AWS) for physical database hosting and Stripe for payment processing. All subprocessors are bound by strict DPAs (Data Processing Agreements).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicyPage;
