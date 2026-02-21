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

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* Marketing Site */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* App Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<VehicleRegistry />} />
          <Route path="/trips" element={<TripDispatcher />} />
          <Route path="/maintenance" element={<MaintenanceLogs />} />
          <Route path="/expenses" element={<ExpenseLogs />} />
          <Route path="/drivers" element={<DriverProfiles />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
