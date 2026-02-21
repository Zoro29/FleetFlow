import React from 'react';
import { ArrowRight, Activity, MapPin, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container hero-container">

                {/* Left Column: Copy & CTA */}
                <div className="hero-content animate-fade-in-up">
                    <h1>
                        Modular Fleet & Logistics Management. <br />
                        <span className="text-highlight">Real-Time. Rule-Based. Scalable.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Replace manual logbooks with a centralized operational command system that tracks assets, drivers, compliance, and financial performance — in real time.
                    </p>

                    <div className="hero-actions">
                        <button className="btn btn-primary btn-lg">
                            Request Live Demo
                            <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-outline btn-lg">
                            View System Architecture
                        </button>
                    </div>
                </div>

                {/* Right Column: Dashboard Mockup */}
                <div className="hero-visual animate-fade-in-up delay-200">
                    <div className="dashboard-mockup">

                        {/* Mockup Header */}
                        <div className="mockup-header">
                            <span className="mockup-title">Active Fleet Status</span>
                            <div className="mockup-pulse-wrapper">
                                <span className="live-indicator"></span>
                                <span>Live Sync</span>
                            </div>
                        </div>

                        {/* Mockup KPIs */}
                        <div className="mockup-kpis">
                            <div className="kpi-card">
                                <Activity size={16} className="kpi-icon text-primary" />
                                <div className="kpi-value">94%</div>
                                <div className="kpi-label">Utilization Rate</div>
                            </div>
                            <div className="kpi-card">
                                <MapPin size={16} className="kpi-icon text-success" />
                                <div className="kpi-value">142</div>
                                <div className="kpi-label">Active Routes</div>
                            </div>
                            <div className="kpi-card">
                                <Gauge size={16} className="kpi-icon text-warning" />
                                <div className="kpi-value">12</div>
                                <div className="kpi-label">Maint. Alerts</div>
                            </div>
                        </div>

                        {/* Mockup Table */}
                        <div className="mockup-table-container">
                            <table className="mockup-table">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Driver</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-mono">FT-4921</td>
                                        <td>J. Smith</td>
                                        <td><span className="status-pill success">In Transit</span></td>
                                    </tr>
                                    <tr>
                                        <td className="font-mono">FT-8832</td>
                                        <td>A. Wong</td>
                                        <td><span className="status-pill primary">Loading</span></td>
                                    </tr>
                                    <tr>
                                        <td className="font-mono">FT-1049</td>
                                        <td>M. Johnson</td>
                                        <td><span className="status-pill warning">Maintenance</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
