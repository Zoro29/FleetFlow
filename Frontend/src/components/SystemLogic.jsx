import React from 'react';
import { Download, Fingerprint, Send, CheckSquare, Wrench, BarChart4, ArrowRight } from 'lucide-react';
import './SystemLogic.css';

const SystemLogic = () => {
    const steps = [
        { id: 1, icon: <Download size={20} />, label: "Vehicle Intake" },
        { id: 2, icon: <Fingerprint size={20} />, label: "Compliance Verification" },
        { id: 3, icon: <Send size={20} />, label: "Dispatch" },
        { id: 4, icon: <CheckSquare size={20} />, label: "Trip Completion" },
        { id: 5, icon: <Wrench size={20} />, label: "Maintenance Update" },
        { id: 6, icon: <BarChart4 size={20} />, label: "Analytics Sync" }
    ];

    return (
        <section className="logic-section" id="documentation">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Automated State Engine</h2>
                    <p>
                        Fleet Flow enforces strict state progressions. Vehicles and drivers cannot
                        bypass required operational checkpoints.
                    </p>
                </div>

                <div className="logic-timeline-container">
                    <div className="logic-path">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>

                                <div className="logic-step">
                                    <div className="step-icon">
                                        {step.icon}
                                    </div>
                                    <span className="step-label">{step.label}</span>
                                </div>

                                {/* Render arrow between steps, but not after the last step */}
                                {index < steps.length - 1 && (
                                    <div className="step-arrow">
                                        <ArrowRight size={16} className="text-secondary" />
                                    </div>
                                )}

                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemLogic;
