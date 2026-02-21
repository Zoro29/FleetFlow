import React from 'react';
import {
    ShieldCheck,
    LayoutDashboard,
    Map,
    Wrench,
    CreditCard,
    Ban,
    TrendingUp,
    FileSpreadsheet
} from 'lucide-react';
import './CoreFeatures.css';

const CoreFeatures = () => {
    const features = [
        {
            icon: <ShieldCheck size={24} className="feature-icon text-primary" />,
            title: "Role-Based Access Control",
            description: "Secure, hierarchical permissions for fleet managers, dispatchers, drivers, and safety officers."
        },
        {
            icon: <LayoutDashboard size={24} className="feature-icon text-primary" />,
            title: "Real-Time Fleet Dashboard",
            description: "A centralized operational view updating asset status, locations, and performance KPIs instantly."
        },
        {
            icon: <Map size={24} className="feature-icon text-primary" />,
            title: "Smart Trip Validation Engine",
            description: "Algorithmic route and schedule verification preventing unauthorized or high-risk dispatches."
        },
        {
            icon: <Wrench size={24} className="feature-icon text-primary" />,
            title: "Maintenance Auto-State Switching",
            description: "Vehicles automatically flag for maintenance based on mileage, engine hours, or active defect reports."
        },
        {
            icon: <CreditCard size={24} className="feature-icon text-primary" />,
            title: "Fuel & Expense Tracking",
            description: "Precise digital logging of fuel slips, tolls, and en-route expenses linked directly to Vehicle ID."
        },
        {
            icon: <Ban size={24} className="feature-icon text-primary" />,
            title: "Driver Compliance Blocking",
            description: "System strictly blocks dispatch for drivers with expired licenses, missed training, or rest violations."
        },
        {
            icon: <TrendingUp size={24} className="feature-icon text-primary" />,
            title: "Financial ROI Analytics",
            description: "Granular cost-per-km tracking, profitability per asset, and automated revenue vs. expense calculations."
        },
        {
            icon: <FileSpreadsheet size={24} className="feature-icon text-primary" />,
            title: "Exportable Structured Reports",
            description: "Instantly generate and schedule PDF/CSV reports for audits, billing, and executive review."
        }
    ];

    return (
        <section className="features-section" id="features">
            <div className="container">

                <div className="section-header text-center">
                    <h2>Engineered for Scale and Precision</h2>
                    <p>
                        An interconnected ecosystem designed to eliminate operational blindspots.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoreFeatures;
