import React from 'react';
import { Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar-container">
            <div className="container navbar-inner">
                {/* Logo Section */}
                <div className="navbar-logo">
                    <Truck className="logo-icon" size={24} />
                    <span className="logo-text">Fleet Flow</span>
                </div>

                {/* Navigation Links */}
                <nav className="navbar-links">
                    <a href="#product">Product</a>
                    <a href="#features">Features</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#documentation">Documentation</a>
                </nav>

                {/* Action Buttons */}
                <div className="navbar-actions">
                    <Link to="/login" className="btn btn-outline">Log In</Link>
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
