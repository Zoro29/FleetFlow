import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            setTimeout(() => {
                const element = document.getElementById(location.state.scrollTo);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 100);
        }
    }, [location]);

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
