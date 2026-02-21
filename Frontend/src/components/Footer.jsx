import React from 'react';
import { Truck, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
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
                        <div className="social-links" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                            <a href="mailto:technews3116@gmail.com" aria-label="Email" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail size={18} />
                                <span style={{ fontSize: '14px' }}>technews3116@gmail.com</span>
                            </a>
                            <a href="https://www.linkedin.com/in/krish29" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Linkedin size={18} />
                                <span style={{ fontSize: '14px' }}>linkedin.com/in/krish29</span>
                            </a>
                        </div>
                    </div>

                    {/* Nav Columns */}
                    <div className="footer-navs">
                        <div className="footer-col">
                            <h4>Product</h4>
                            <ul>
                                <li><Link to="/features">Features</Link></li>
                                <li><Link to="/integrations">Integrations</Link></li>
                                <li><Link to="/pricing">Pricing</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/customers">Customers</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/contact-sales">Contact Sales</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Resources</h4>
                            <ul>
                                <li><Link to="/documentation">Documentation</Link></li>
                                <li><Link to="/api-reference">API Reference</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/system-status">System Status</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Legal</h4>
                            <ul>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/security">Security</Link></li>
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
