import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Map, TrendingUp, CreditCard } from 'lucide-react';
import './InfoPages.css';

const FeaturesInfoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Platform Features</h1>
                        <p>Everything you need to run a high-performance fleet, thoughtfully designed for the humans who use it every day.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section">
                            <h2><Map size={24} /> Intelligent Dispatch & Routing</h2>
                            <p>
                                Say goodbye to whiteboards and messy spreadsheets. Our dispatch system visually maps out your entire vehicle pool. You can see who is available, who is on a trip, and which vehicles need a break. It intuitively blocks dispatching if a driver's license is expired or a vehicle is scheduled for maintenance, keeping your fleet safe and compliant without you having to double-check manually.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><ShieldCheck size={24} /> Safety & Compliance Automated</h2>
                            <p>
                                We know how stressful it is to track hundreds of expiration dates. Fleet Flow acts as your digital safety officer. We continuously monitor driver licenses, training certificates, and vehicle permits. Before a violation ever happens, the system alerts you in bright, bold metrics on your dashboard.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><CreditCard size={24} /> Bulletproof Expense Tracking</h2>
                            <p>
                                Fuel costs and unexpected repairs can eat your profit margins over night. We've built an expense engine that precisely tracks every dollar spent natively alongside your dispatch data. Log fuel receipts per vehicle, track maintenance invoices, and instantly see your true "cost per kilometer" in real-time.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><TrendingUp size={24} /> Financial & Operational Analytics</h2>
                            <p>
                                Data is useless unless you can understand it at a glance. Our analytics dashboard doesn't just show you numbers; it tells you the story of your business. See which vehicles are your most profitable assets, which routes cost you the most in fuel, and where you can tighten up operations to maximize ROI.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FeaturesInfoPage;
