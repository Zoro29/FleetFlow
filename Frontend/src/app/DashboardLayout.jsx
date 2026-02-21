import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Truck, MapPin, Wrench, DollarSign,
    Users, BarChart2, LogOut, Truck as TruckIcon, Menu, X, ChevronRight
} from 'lucide-react';
import './DashboardLayout.css';

const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Command Center' },
    { to: '/vehicles', icon: <Truck size={18} />, label: 'Vehicle Registry' },
    { to: '/trips', icon: <MapPin size={18} />, label: 'Trip Dispatcher' },
    { to: '/maintenance', icon: <Wrench size={18} />, label: 'Maintenance Logs' },
    { to: '/expenses', icon: <DollarSign size={18} />, label: 'Expense & Fuel' },
    { to: '/drivers', icon: <Users size={18} />, label: 'Driver Profiles' },
    { to: '/analytics', icon: <BarChart2 size={18} />, label: 'Analytics' },
];

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = navItems.find(n => location.pathname.startsWith(n.to));

    return (
        <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
            {/* Sidebar */}
            <aside className="app-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <TruckIcon size={22} className="logo-icon" />
                        {!collapsed && <span className="logo-text">Fleet Flow</span>}
                    </div>
                    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
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
                </nav>

                <button className="sidebar-logout" onClick={() => navigate('/')}>
                    <LogOut size={18} />
                    {!collapsed && <span>Exit to Site</span>}
                </button>
            </aside>

            {/* Main Content */}
            <div className="app-main">
                {/* Topbar */}
                <header className="app-topbar">
                    <div className="topbar-left">
                        <h1 className="page-title">{currentPage?.label || 'Dashboard'}</h1>
                    </div>
                    <div className="topbar-right">
                        <div className="role-pill">Fleet Manager</div>
                        <div className="user-avatar">FM</div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="app-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
