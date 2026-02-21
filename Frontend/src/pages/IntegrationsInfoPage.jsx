import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Network, Database, Smartphone } from 'lucide-react';
import './InfoPages.css';

const IntegrationsInfoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Seamless Integrations</h1>
                        <p>Fleet Flow doesn't exist in a vacuum. We connect with the tools you already rely on so your data flows effortlessly across your business.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section">
                            <h2><Network size={24} /> GPS & Telematics Providers</h2>
                            <p>
                                We plug directly into major ELD (Electronic Logging Device) and GPS telematics hardware. This means your dashboard isn't just relying on drivers to tap a button on their phone. We pull live odometer readings, hard-braking alerts, and exact GPS coordinates directly from the vehicles themselves. It’s the closest thing to actually sitting in the passenger seat.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Database size={24} /> Accounting & ERM Software</h2>
                            <p>
                                Your financial analysts shouldn't have to manually copy and paste expense logs. Fleet Flow features secure API bridges to popular accounting software like QuickBooks, Xero, and enterprise ERPs. Whether it's a $50 fuel slip or a $5,000 engine overhaul, the expense is pushed straight to your general ledger with perfect accuracy.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Smartphone size={24} /> Communication & Alerting Systems</h2>
                            <p>
                                When a critical issue arises—like a vehicle breaking down or a dispatcher assigning a high-priority load—you need to know instantly. We integrate with Slack, Microsoft Teams, and standard SMS gateways so critical alerts bypass the inbox and go straight to the people who need to take action.
                            </p>
                        </div>

                        <div className="info-section">
                            <p>
                                <strong>Need a custom integration?</strong> Our enterprise plans include access to our robust, well-documented REST API. Your internal engineering teams can pull any data point from Fleet Flow into your proprietary internal systems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default IntegrationsInfoPage;
