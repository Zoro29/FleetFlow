import React from 'react';
import './Footer.css';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
    return (
        <section className="cta-section" id="pricing">
            <div className="container">
                <div className="cta-content text-center">
                    <h2>Operate Your Fleet with Precision, Not Guesswork.</h2>
                    <p>
                        Bring operational control, compliance, and profitability into one real-time system.
                    </p>
                    <div className="cta-actions">
                        <button className="btn btn-primary btn-lg">
                            Book Demo
                            <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-outline btn-lg">Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
