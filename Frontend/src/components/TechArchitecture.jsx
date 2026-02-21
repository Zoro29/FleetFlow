import React from 'react';
import { Layers, Server, Database } from 'lucide-react';
import './TechArchitecture.css';

const TechArchitecture = () => {
    return (
        <section className="architecture-section">
            <div className="container">

                <div className="section-header text-center animate-fade-in-up">
                    <h2>Enterprise Tech Architecture</h2>
                    <p>
                        Built on a modular, decoupled stack ensuring rapid query performance,
                        secure state storage, and seamless API integrations.
                    </p>
                </div>

                <div className="arch-pipeline animate-fade-in-up delay-100">

                    {/* Node 1: Frontend */}
                    <div className="arch-node">
                        <div className="node-icon-wrapper blue-glow">
                            <Layers size={24} className="text-primary" />
                        </div>
                        <h3 className="node-title">Frontend Client</h3>
                        <div className="node-pills">
                            <span className="pill">React + Vite</span>
                            <span className="pill">Real-Time UI</span>
                            <span className="pill">Role-Gated</span>
                        </div>
                    </div>

                    {/* Animated Connecting Arrow */}
                    <div className="arch-connection">
                        <div className="data-flow-line"></div>
                    </div>

                    {/* Node 2: Backend */}
                    <div className="arch-node main-node">
                        <div className="node-icon-wrapper green-glow">
                            <Server size={28} className="text-success" />
                        </div>
                        <h3 className="node-title">API & State Engine</h3>
                        <div className="node-pills">
                            <span className="pill">Express REST API</span>
                            <span className="pill">JWT Authentication</span>
                            <span className="pill">Dockerized Node</span>
                        </div>
                    </div>

                    {/* Animated Connecting Arrow */}
                    <div className="arch-connection">
                        <div className="data-flow-line"></div>
                    </div>

                    {/* Node 3: Database */}
                    <div className="arch-node">
                        <div className="node-icon-wrapper orange-glow">
                            <Database size={24} className="text-warning" />
                        </div>
                        <h3 className="node-title">Data Layer</h3>
                        <div className="node-pills">
                            <span className="pill">PostgreSQL 16</span>
                            <span className="pill">pg Node Client</span>
                            <span className="pill">Automated Seeders</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TechArchitecture;
