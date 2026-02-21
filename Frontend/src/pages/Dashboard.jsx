import React, { useState } from 'react';
import { Activity, Truck, AlertTriangle, Package, TrendingUp, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const statusClass = {
    'Available': 'pill-available',
    'On Trip': 'pill-ontrip',
    'In Shop': 'pill-inshop',
    'Retired': 'pill-retired',
    'Draft': 'pill-draft',
    'Dispatched': 'pill-dispatched',
    'Completed': 'pill-completed',
    'Cancelled': 'pill-cancelled',
};

const Dashboard = () => {
    const { stats, trips, vehicles, drivers } = useAppContext();
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const recentTrips = [...trips].reverse().slice(0, 6);

    const filteredVehicles = vehicles.filter(v => {
        const typeMatch = typeFilter === 'All' || v.type === typeFilter;
        const statusMatch = statusFilter === 'All' || v.status === statusFilter;
        return typeMatch && statusMatch;
    });

    return (
        <DashboardLayout>
            {/* KPI Cards */}
            <div className="kpi-grid">
                <div className="kpi-card" style={{ borderTop: '3px solid var(--primary)' }}>
                    <div className="kpi-icon-wrap">
                        <div>
                            <div className="kpi-label">Active Fleet</div>
                            <div className="kpi-value">{stats.activeFleet}</div>
                        </div>
                        <div style={{ background: 'var(--primary-light)', borderRadius: '50%', padding: 10 }}>
                            <Truck size={22} color="var(--primary)" />
                        </div>
                    </div>
                    <div className="kpi-sub">Vehicles on active trips</div>
                </div>

                <div className="kpi-card" style={{ borderTop: '3px solid var(--warning)' }}>
                    <div className="kpi-icon-wrap">
                        <div>
                            <div className="kpi-label">Maintenance Alerts</div>
                            <div className="kpi-value">{stats.maintenanceAlerts}</div>
                        </div>
                        <div style={{ background: '#FEF3C7', borderRadius: '50%', padding: 10 }}>
                            <AlertTriangle size={22} color="var(--warning)" />
                        </div>
                    </div>
                    <div className="kpi-sub">Vehicles currently in shop</div>
                </div>

                <div className="kpi-card" style={{ borderTop: '3px solid var(--success)' }}>
                    <div className="kpi-icon-wrap">
                        <div>
                            <div className="kpi-label">Utilization Rate</div>
                            <div className="kpi-value">{stats.utilizationRate}%</div>
                        </div>
                        <div style={{ background: '#ECFDF5', borderRadius: '50%', padding: 10 }}>
                            <TrendingUp size={22} color="var(--success)" />
                        </div>
                    </div>
                    <div className="kpi-sub">Fleet assigned vs. idle</div>
                </div>

                <div className="kpi-card" style={{ borderTop: '3px solid #8B5CF6' }}>
                    <div className="kpi-icon-wrap">
                        <div>
                            <div className="kpi-label">Pending Cargo</div>
                            <div className="kpi-value">{stats.pendingCargo}</div>
                        </div>
                        <div style={{ background: '#F5F3FF', borderRadius: '50%', padding: 10 }}>
                            <Package size={22} color="#8B5CF6" />
                        </div>
                    </div>
                    <div className="kpi-sub">Shipments awaiting dispatch</div>
                </div>
            </div>

            {/* Fleet Overview with Filters */}
            <div className="data-card" style={{ marginBottom: 24 }}>
                <div className="data-card-header">
                    <h3>Fleet Overview</h3>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                            <option value="All">All Types</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Bike">Bike</option>
                        </select>
                        <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Available">Available</option>
                            <option value="On Trip">On Trip</option>
                            <option value="In Shop">In Shop</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th><th>Type</th><th>Plate</th><th>Capacity</th><th>Odometer</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(v => (
                            <tr key={v.id}>
                                <td><span className="font-mono">{v.id}</span> — {v.name}</td>
                                <td>{v.type}</td>
                                <td className="font-mono">{v.plate}</td>
                                <td>{v.capacity} kg</td>
                                <td>{v.odometer.toLocaleString()} km</td>
                                <td><span className={`status-pill ${statusClass[v.status]}`}>{v.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Recent Trips */}
            <div className="data-card">
                <div className="data-card-header">
                    <h3>Recent Trips</h3>
                    <MapPin size={16} color="var(--text-tertiary)" />
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Trip ID</th><th>Route</th><th>Vehicle</th><th>Cargo</th><th>Date</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTrips.map(t => {
                            const v = vehicles.find(v => v.id === t.vehicleId);
                            return (
                                <tr key={t.id}>
                                    <td className="font-mono">{t.id}</td>
                                    <td>{t.origin} → {t.destination}</td>
                                    <td>{v?.name || t.vehicleId}</td>
                                    <td>{t.cargoWeight} kg</td>
                                    <td>{t.date}</td>
                                    <td><span className={`status-pill ${statusClass[t.status]}`}>{t.status}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
