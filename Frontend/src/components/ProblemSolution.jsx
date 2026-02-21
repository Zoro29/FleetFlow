import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    return (
        <section className="problem-solution-section" id="solutions">
            <div className="container">

                <div className="ps-grid">
                    {/* Left Column: The Problem */}
                    <div className="ps-card problem-card">
                        <h3 className="ps-card-title">The Legacy Problem</h3>
                        <ul className="ps-list">
                            <li>
                                <XCircle className="ps-icon text-error" size={20} />
                                <span>Manual logbooks causing entry delays and errors</span>
                            </li>
                            <li>
                                <XCircle className="ps-icon text-error" size={20} />
                                <span>No real-time vehicle visibility or proactive alerts</span>
                            </li>
                            <li>
                                <XCircle className="ps-icon text-error" size={20} />
                                <span>License compliance risks and expired credentials</span>
                            </li>
                            <li>
                                <XCircle className="ps-icon text-error" size={20} />
                                <span>Untracked fuel losses and unverified expenses</span>
                            </li>
                            <li>
                                <XCircle className="ps-icon text-error" size={20} />
                                <span>No ROI measurement or cost-per-km data</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: The Solution */}
                    <div className="ps-card solution-card">
                        <h3 className="ps-card-title">Fleet Flow Solution</h3>
                        <ul className="ps-list">
                            <li>
                                <CheckCircle className="ps-icon text-success" size={20} />
                                <span>Centralized digital control hub updated in real-time</span>
                            </li>
                            <li>
                                <CheckCircle className="ps-icon text-success" size={20} />
                                <span>Real-time vehicle and driver state engine</span>
                            </li>
                            <li>
                                <CheckCircle className="ps-icon text-success" size={20} />
                                <span>Automated compliance blocking prior to dispatch</span>
                            </li>
                            <li>
                                <CheckCircle className="ps-icon text-success" size={20} />
                                <span>Live operational cost and expense calculations</span>
                            </li>
                            <li>
                                <CheckCircle className="ps-icon text-success" size={20} />
                                <span>Structured reporting exports for financial reviews</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProblemSolution;
