import React from 'react';
import { Network, Search, PenTool, Database, ShieldAlert } from 'lucide-react';
import './WorkflowSection.css';

const WorkflowSection = () => {
    const roles = [
        {
            title: "Fleet Manager",
            icon: <Network size={20} className="role-icon" />,
            color: "var(--primary)",
            controls: "Macro fleet-wide config & rule setting.",
            monitors: "High-level ROI, utilization, system health.",
            decisions: "Asset allocation, vendor management."
        },
        {
            title: "Dispatcher",
            icon: <Search size={20} className="role-icon" />,
            color: "var(--text-main)",
            controls: "Route assignment, active trip scaling.",
            monitors: "Live asset location, ETAs, delays.",
            decisions: "Re-routing, incident triage."
        },
        {
            title: "Driver",
            icon: <PenTool size={20} className="role-icon" />,
            color: "var(--text-main)",
            controls: "Trip status updates, expense logging.",
            monitors: "Assigned routes, compliance countdowns.",
            decisions: "En-route resting, localized routing."
        },
        {
            title: "Finance",
            icon: <Database size={20} className="role-icon" />,
            color: "var(--warning)",
            controls: "Budget caps, expense approvals.",
            monitors: "Cost per km, fuel slip anomalies.",
            decisions: "Invoice clearance, toll dispute."
        },
        {
            title: "Safety Sys Admin",
            icon: <ShieldAlert size={20} className="role-icon" />,
            color: "var(--error)",
            controls: "Compliance logic, block overrides.",
            monitors: "License expiries, speed violations.",
            decisions: "Driver suspension, risk audits."
        }
    ];

    return (
        <section className="workflow-section" id="solutions">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Rigid Workflows. Dynamic Control.</h2>
                    <p>
                        An interconnected operations matrix that assigns precise control boundaries
                        and visibility access point to every tier of your organization.
                    </p>
                </div>

                <div className="workflow-timeline">
                    {/* Connector Line */}
                    <div className="timeline-connector"></div>

                    <div className="workflow-nodes">
                        {roles.map((role, idx) => (
                            <div key={idx} className="workflow-node">

                                <div className="node-marker" style={{ borderColor: role.color }}>
                                    {role.icon}
                                </div>

                                <h4 className="role-title" style={{ color: role.color }}>{role.title}</h4>

                                <div className="role-details">
                                    <div className="detail-group">
                                        <span className="detail-label">Controls:</span>
                                        <p>{role.controls}</p>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">Monitors:</span>
                                        <p>{role.monitors}</p>
                                    </div>
                                    <div className="detail-group">
                                        <span className="detail-label">Decisions:</span>
                                        <p>{role.decisions}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WorkflowSection;
