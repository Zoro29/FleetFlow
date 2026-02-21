import React from 'react';
import { Layers, Server, Database, ArrowDown } from 'lucide-react';
import './TechArchitecture.css';

const TechArchitecture = () => {
    return (
        <section className="architecture-section">
            <div className="container">

                <div className="section-header text-center">
                    <h2>Enterprise Tech Architecture</h2>
                    <p>
                        Built on a modular, decoupled stack ensuring rapid query performance,
                        secure state storage, and seamless API integrations.
                    </p>
                </div>

                <div className="arch-diagram">

                    {/* Frontend Layer */}
                    <div className="arch-layer">
                        <div className="layer-header">
                            <Layers size={20} className="text-primary" />
                            <h3>Frontend: React / Vite</h3>
                        </div>
                        <div className="layer-blocks">
                            <div className="arch-block">Modular UI Components</div>
                            <div className="arch-block">Real-Time Data Visualization</div>
                            <div className="arch-block">Role-Gated Routes</div>
                        </div>
                    </div>

                    <div className="arch-connector">
                        <ArrowDown className="text-tertiary" size={24} />
                    </div>

                    {/* Backend Layer */}
                    <div className="arch-layer">
                        <div className="layer-header">
                            <Server size={20} className="text-primary" />
                            <h3>Backend: Node API & State Engine</h3>
                        </div>
                        <div className="layer-blocks">
                            <div className="arch-block">Live Telemetry WebSockets</div>
                            <div className="arch-block">Validation Middleware</div>
                            <div className="arch-block">Fleet Authentication Hub</div>
                        </div>
                    </div>

                    <div className="arch-connector">
                        <ArrowDown className="text-tertiary" size={24} />
                    </div>

                    {/* Database Layer */}
                    <div className="arch-layer">
                        <div className="layer-header">
                            <Database size={20} className="text-primary" />
                            <h3>Data Persistence Layer</h3>
                        </div>
                        <div className="layer-blocks">
                            <div className="arch-block database-block">
                                <strong>PostgreSQL</strong>
                                <span>Relational Vehicle & Role Data</span>
                            </div>
                            <div className="arch-block database-block">
                                <strong>Redis</strong>
                                <span>Live Location Caching</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TechArchitecture;
