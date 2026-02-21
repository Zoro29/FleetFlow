import React from 'react';
import { Truck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = (e, id) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    return (
        <header className="navbar-container">
            <div className="container navbar-inner">
                {/* Logo Section */}
                <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Truck className="logo-icon" size={24} />
                    <span className="logo-text">Fleet Flow</span>
                </Link>

                {/* Navigation Links */}
                <nav className="navbar-links">
                    <a href="#product" onClick={(e) => handleScroll(e, 'product')}>Product</a>
                    <a href="#features" onClick={(e) => handleScroll(e, 'features')}>Features</a>
                    <a href="#solutions" onClick={(e) => handleScroll(e, 'solutions')}>Solutions</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')}>Pricing</a>
                    <a href="#documentation" onClick={(e) => handleScroll(e, 'documentation')}>Documentation</a>
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
