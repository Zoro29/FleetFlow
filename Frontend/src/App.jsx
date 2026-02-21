import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Landing + Auth
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

// Global State
import { AppProvider } from './context/AppContext';

// App Pages
import Dashboard from './pages/Dashboard';
import VehicleRegistry from './pages/VehicleRegistry';
import TripDispatcher from './pages/TripDispatcher';
import MaintenanceLogs from './pages/MaintenanceLogs';
import ExpenseLogs from './pages/ExpenseLogs';
import DriverProfiles from './pages/DriverProfiles';
import Analytics from './pages/Analytics';

// Info Pages
import FeaturesInfoPage from './pages/FeaturesInfoPage';
import IntegrationsInfoPage from './pages/IntegrationsInfoPage';
import PricingInfoPage from './pages/PricingInfoPage';

// Company Pages
import AboutPage from './pages/company/AboutPage';
import CustomersPage from './pages/company/CustomersPage';
import CareersPage from './pages/company/CareersPage';
import ContactSalesPage from './pages/company/ContactSalesPage';

// Resources Pages
import DocumentationPage from './pages/resources/DocumentationPage';
import ApiReferencePage from './pages/resources/ApiReferencePage';
import BlogPage from './pages/resources/BlogPage';
import SystemStatusPage from './pages/resources/SystemStatusPage';

// Legal Pages
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import SecurityPage from './pages/legal/SecurityPage';

// Role-Specific Pages
import DispatcherPage from './pages/DispatcherPage';
import SafetyOfficerPage from './pages/SafetyOfficerPage';
import FinancialAnalystPage from './pages/FinancialAnalystPage';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Marketing Site */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/features" element={<FeaturesInfoPage />} />
          <Route path="/integrations" element={<IntegrationsInfoPage />} />
          <Route path="/pricing" element={<PricingInfoPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact-sales" element={<ContactSalesPage />} />

          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/api-reference" element={<ApiReferencePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/system-status" element={<SystemStatusPage />} />

          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/security" element={<SecurityPage />} />

          {/* Core App Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<VehicleRegistry />} />
          <Route path="/trips" element={<TripDispatcher />} />
          <Route path="/maintenance" element={<MaintenanceLogs />} />
          <Route path="/expenses" element={<ExpenseLogs />} />
          <Route path="/drivers" element={<DriverProfiles />} />
          <Route path="/analytics" element={<Analytics />} />

          {/* Role-Specific Consoles */}
          <Route path="/role/dispatcher" element={<DispatcherPage />} />
          <Route path="/role/safety" element={<SafetyOfficerPage />} />
          <Route path="/role/finance" element={<FinancialAnalystPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
