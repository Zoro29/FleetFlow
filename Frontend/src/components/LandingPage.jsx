import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ProblemSolution from './ProblemSolution';
import CoreFeatures from './CoreFeatures';
import RealTimeDashboard from './RealTimeDashboard';
import WorkflowSection from './WorkflowSection';
import SystemLogic from './SystemLogic';
import AnalyticsSection from './AnalyticsSection';
import TechArchitecture from './TechArchitecture';
import CtaSection from './CtaSection';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <ProblemSolution />
                <CoreFeatures />
                <RealTimeDashboard />
                <WorkflowSection />
                <SystemLogic />
                <AnalyticsSection />
                <TechArchitecture />
                <CtaSection />
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
