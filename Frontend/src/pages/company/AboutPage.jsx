import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Users, Zap } from 'lucide-react';
import '../InfoPages.css';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>About Fleet Flow</h1>
                        <p>We are engineers, logisticians, and data scientists on a mission to modernize the world's supply chains.</p>
                    </div>

                    <div className="info-content">
                        <div className="info-section">
                            <h2>The Problem We Saw</h2>
                            <p>
                                Across the globe, multi-million dollar fleets are still being managed by whiteboards, scattered spreadsheets, and fragmented WhatsApp groups. This lack of centralized structural management leads to catastrophic safety failures, massive fuel waste, and burned-out dispatchers. We realized that hardware telematics (GPS tracking) solved where a truck was, but not *how* it should operate.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Target size={24} /> Our Mission</h2>
                            <p>
                                To build the central nervous system for commercial fleets. We empower fleet managers with real-time, algorithmic precision that seamlessly integrates dispatching, maintenance scheduling, compliance monitoring, and financial auditing into a single pane of glass.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Users size={24} /> Leadership & Team</h2>
                            <p>
                                Founded in 2021 by veterans of the shipping and enterprise software industries. Our core engineering team operates globally, bringing together top-tier architectural talent previously responsible for designing high-availability financial trading systems. We apply that same rigorous standard of zero-downtime reliability to logistics.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2><Zap size={24} /> Core Values</h2>
                            <ul>
                                <li><strong>Precision Over Guesswork:</strong> If it can't be measured accurately, it shouldn't be in our system.</li>
                                <li><strong>Operator-First Design:</strong> Software shouldn't hold a dispatcher back; it should act as an extension of their instincts.</li>
                                <li><strong>Uncompromising Security:</strong> Fleet data is competitive intelligence. We protect it with institutional-grade safeguards.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
