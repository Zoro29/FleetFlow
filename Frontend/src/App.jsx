import './index.css';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import CoreFeatures from './components/CoreFeatures';
import RealTimeDashboard from './components/RealTimeDashboard';
import WorkflowSection from './components/WorkflowSection';
import SystemLogic from './components/SystemLogic';
import AnalyticsSection from './components/AnalyticsSection';
import TechArchitecture from './components/TechArchitecture';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;
