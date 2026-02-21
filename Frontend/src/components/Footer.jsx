import React from 'react';
import { Truck, Mail, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">

                <div className="footer-grid">

                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <Truck size={24} className="text-secondary" />
                            <span>Fleet Flow</span>
                        </div>
                        <p className="footer-tagline">
                            Real-time structural management for high-performance logistics operations.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Email"><Mail size={18} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Nav Columns */}
                    <div className="footer-navs">
                        <div className="footer-col">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Integrations</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Changelog</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Customers</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Contact Sales</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">API Reference</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">System Status</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Security</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Fleet Flow System Inc. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
