import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../InfoPages.css';

const TermsOfServicePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="info-page-container">
                <div className="container">
                    <div className="info-header">
                        <h1>Terms of Service</h1>
                        <p>Last Updated: September 1, 2023</p>
                    </div>

                    <div className="info-content text-left">
                        <div className="info-section">
                            <p>
                                These Terms of Service ("Terms") dictate the contractual agreement between your organization ("Client") and Fleet Flow Inc. ("Provider") regarding the use of the Fleet Flow SaaS platform and its associated APIs.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>1. Acceptable Use Policy</h2>
                            <p>
                                The Client agrees to use the platform strictly for managing legal commercial logistics operations. The platform may not be used to track vehicles or individuals without their explicit, legally-obtained consent in accordance with regional privacy laws (e.g., GDPR, CCPA).
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>2. Service Level Agreement (SLA)</h2>
                            <p>
                                Fleet Flow guarantees a 99.99% monthly uptime for core routing and telematics ingestion services on the Enterprise tier. In the event we fail to meet this SLA, the Client is entitled to platform service credits equal to 10% of their monthly billing rate per 0.1% of downtime, up to 50% of the total monthly bill.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>3. Limitation of Liability</h2>
                            <p>
                                While Fleet Flow provides routing suggestions and automated compliance blocking, the final responsibility for ensuring a driver is legally fit to operate a vehicle rests entirely with the Client. Fleet Flow is not liable for structural damage, delays, fines, or loss of life resulting from improper vehicle operation or circumvention of our software blocks by the Client's dispatchers.
                            </p>
                        </div>

                        <div className="info-section">
                            <h2>4. Termination</h2>
                            <p>
                                Subscriptions are billed on an annual or monthly basis. Organizations may terminate their agreement at the end of their current billing cycle. Fleet Flow reserves the right to immediately suspend accounts found to be reverse-engineering our proprietary routing algorithms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfServicePage;
