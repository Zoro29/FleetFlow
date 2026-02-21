import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Truck, MapPin, Wrench, DollarSign,
    Users, BarChart2, LogOut, Menu, ChevronRight,
    Navigation, Shield, TrendingUp
} from 'lucide-react';
import './DashboardLayout.css';

const coreNavItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Command Center' },
    { to: '/vehicles', icon: <Truck size={18} />, label: 'Vehicle Registry' },
    { to: '/trips', icon: <MapPin size={18} />, label: 'Trip Dispatcher' },
    { to: '/maintenance', icon: <Wrench size={18} />, label: 'Maintenance Logs' },
    { to: '/expenses', icon: <DollarSign size={18} />, label: 'Expense & Fuel' },
    { to: '/drivers', icon: <Users size={18} />, label: 'Driver Profiles' },
    { to: '/analytics', icon: <BarChart2 size={18} />, label: 'Analytics' },
];

const roleNavItems = [
    { to: '/role/dispatcher', icon: <Navigation size={18} />, label: 'Dispatcher Console', accent: '#2563EB' },
    { to: '/role/safety', icon: <Shield size={18} />, label: 'Safety Officer', accent: '#10B981' },
    { to: '/role/finance', icon: <TrendingUp size={18} />, label: 'Financial Analyst', accent: '#8B5CF6' },
];

const allNavItems = [...coreNavItems, ...roleNavItems];

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = allNavItems.find(n => location.pathname.startsWith(n.to));

    return (
        <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
            {/* Sidebar */}
            <aside className="app-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <Truck size={22} className="logo-icon" />
                        {!collapsed && <span className="logo-text">Fleet Flow</span>}
                    </div>
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {/* Core pages */}
                    {!collapsed && <div className="nav-section-label">Fleet Management</div>}
                    {coreNavItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            title={item.label}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!collapsed && <span className="nav-label">{item.label}</span>}
                        </NavLink>
                    ))}

                    {/* Divider */}
                    <div className="nav-divider" />
                    {!collapsed && <div className="nav-section-label">Role Consoles</div>}

                    {/* Role pages */}
                    {roleNavItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `sidebar-link role-link ${isActive ? 'active' : ''}`}
                            title={item.label}
                            style={({ isActive }) => isActive ? { color: item.accent, background: `${item.accent}12` } : {}}
                        >
                            <span className="nav-icon" style={{ color: item.accent }}>{item.icon}</span>
                            {!collapsed && <span className="nav-label">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <button className="sidebar-logout" onClick={() => navigate('/')}>
                    <LogOut size={18} />
                    {!collapsed && <span>Exit to Site</span>}
                </button>
            </aside>

            {/* Main Content */}
            <div className="app-main">
                <header className="app-topbar">
                    <div className="topbar-left">
                        <h1 className="page-title">{currentPage?.label || 'Dashboard'}</h1>
                    </div>
                    <div className="topbar-right">
                        <div className="role-pill">Fleet Manager</div>
                        <div className="user-avatar">FM</div>
                    </div>
                </header>
                <main className="app-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
