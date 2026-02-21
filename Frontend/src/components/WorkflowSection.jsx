import React, { useState } from 'react';
import { Network, Search, PenTool, Database, ShieldAlert, ChevronRight } from 'lucide-react';
import './WorkflowSection.css';

const roles = [
    {
        id: 'manager',
        title: "Fleet Manager",
        icon: <Network size={24} />,
        color: "var(--primary)",
        gradient: "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 100%)",
        controls: "Macro fleet-wide config & rule setting.",
        monitors: "High-level ROI, utilization, system health.",
        decisions: "Asset allocation, vendor management."
    },
    {
        id: 'dispatcher',
        title: "Dispatcher",
        icon: <Search size={24} />,
        color: "var(--text-main)",
        gradient: "linear-gradient(135deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0) 100%)",
        controls: "Route assignment, active trip scaling.",
        monitors: "Live asset location, ETAs, delays.",
        decisions: "Re-routing, incident triage."
    },
    {
        id: 'driver',
        title: "Driver",
        icon: <PenTool size={24} />,
        color: "var(--text-main)",
        gradient: "linear-gradient(135deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0) 100%)",
        controls: "Trip status updates, expense logging.",
        monitors: "Assigned routes, compliance countdowns.",
        decisions: "En-route resting, localized routing."
    },
    {
        id: 'finance',
        title: "Finance",
        icon: <Database size={24} />,
        color: "var(--warning)",
        gradient: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0) 100%)",
        controls: "Budget caps, expense approvals.",
        monitors: "Cost per km, fuel slip anomalies.",
        decisions: "Invoice clearance, toll dispute."
    },
    {
        id: 'safety',
        title: "Safety Sys Admin",
        icon: <ShieldAlert size={24} />,
        color: "var(--error)",
        gradient: "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0) 100%)",
        controls: "Compliance logic, block overrides.",
        monitors: "License expiries, speed violations.",
        decisions: "Driver suspension, risk audits."
    }
];

const WorkflowSection = () => {
    const [activeRole, setActiveRole] = useState(roles[0]);

    return (
        <section className="workflow-section" id="workflows">
            <div className="container">
                <div className="section-header text-center animate-fade-in-up">
                    <h2>Precision Access Control</h2>
                    <p>
                        An interconnected operations matrix securing control boundaries
                        while delivering real-time visibility to every tier of your organization.
                    </p>
                </div>

                <div className="workflow-container animate-fade-in-up delay-100">

                    {/* Left Side: Role Selector Tabs */}
                    <div className="role-selector">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                className={`role-tab ${activeRole.id === role.id ? 'active' : ''}`}
                                onClick={() => setActiveRole(role)}
                                style={{
                                    borderLeftColor: activeRole.id === role.id ? role.color : 'transparent'
                                }}
                            >
                                <div className="role-tab-icon" style={{ color: activeRole.id === role.id ? role.color : 'var(--text-tertiary)' }}>
                                    {role.icon}
                                </div>
                                <span className="role-tab-title">{role.title}</span>
                                <ChevronRight
                                    size={18}
                                    className={`role-tab-arrow ${activeRole.id === role.id ? 'visible' : ''}`}
                                    style={{ color: role.color }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Dynamic Role Details Content */}
                    <div className="role-content-area" style={{ background: activeRole.gradient }}>

                        <div className="role-display-header" style={{ color: activeRole.color }}>
                            <div className="role-display-icon">
                                {activeRole.icon}
                            </div>
                            <h3>{activeRole.title} Access Profile</h3>
                        </div>

                        <div className="role-grid">

                            <div className="role-metric-box">
                                <span className="box-label">Controls</span>
                                <p className="box-value">{activeRole.controls}</p>
                            </div>

                            <div className="role-metric-box">
                                <span className="box-label">Monitors</span>
                                <p className="box-value">{activeRole.monitors}</p>
                            </div>

                            <div className="role-metric-box full-width">
                                <span className="box-label">Decisions</span>
                                <p className="box-value">{activeRole.decisions}</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;
