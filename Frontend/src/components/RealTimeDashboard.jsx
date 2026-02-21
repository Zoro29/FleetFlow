import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Navigation } from 'lucide-react';
import './RealTimeDashboard.css';

const performanceData = [
    { time: '08:00', efficiency: 4.2 },
    { time: '10:00', efficiency: 4.5 },
    { time: '12:00', efficiency: 4.8 },
    { time: '14:00', efficiency: 4.4 },
    { time: '16:00', efficiency: 4.6 },
    { time: '18:00', efficiency: 4.9 },
    { time: '20:00', efficiency: 4.7 },
];

const utilizationData = [
    { name: 'Active', value: 85, color: '#2DBE7E' },
    { name: 'Maintenance', value: 10, color: '#F4B740' },
    { name: 'Idle', value: 5, color: '#E5E9F2' }
];

const RealTimeDashboard = () => {
    const [pulseScale, setPulseScale] = useState(1);

    // Subtle pulse animation logic to simulate live data
    useEffect(() => {
        const interval = setInterval(() => {
            setPulseScale(prev => prev === 1 ? 1.05 : 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="dashboard-section">
            <div className="container">

                <div className="dashboard-header">
                    <div className="dash-title-group">
                        <h2>Live Operational Telemetry</h2>
                        <p>Monitor the exact state, location, and efficiency of your entire network.</p>
                    </div>
                    <div className="live-status-badge">
                        <span className="live-indicator"></span>
                        System Live
                    </div>
                </div>

                <div className="dashboard-grid">

                    {/* Main Chart Area */}
                    <div className="dash-card main-chart-card">
                        <div className="card-header">
                            <h3>Fleet Fuel Efficiency (km/L)</h3>
                            <span className="card-subtitle">Trailing 12 Hours</span>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F2" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5F6B7A' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5F6B7A' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #E5E9F2', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                                        itemStyle={{ color: '#2E5BFF', fontWeight: 600 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="efficiency"
                                        stroke="#2E5BFF"
                                        strokeWidth={3}
                                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Column Stats */}
                    <div className="dash-sidebar">

                        {/* Donut Chart */}
                        <div className="dash-card">
                            <div className="card-header">
                                <h3>Asset Utilization</h3>
                            </div>
                            <div className="donut-container">
                                <ResponsiveContainer width="100%" height={160}>
                                    <PieChart>
                                        <Pie
                                            data={utilizationData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={2}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {utilizationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="donut-center-text">
                                    <span className="donut-value">85%</span>
                                    <span className="donut-label">Active</span>
                                </div>
                            </div>
                            <div className="donut-legend">
                                {utilizationData.map((item, idx) => (
                                    <div key={idx} className="legend-item">
                                        <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                                        <span className="legend-text">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alerts Feed */}
                        <div className="dash-card">
                            <div className="card-header">
                                <h3>System Alerts</h3>
                            </div>
                            <div className="alert-list">
                                <div className="alert-item error">
                                    <AlertCircle size={16} className="alert-icon" />
                                    <div className="alert-content">
                                        <span className="alert-title">Compliance Block</span>
                                        <span className="alert-desc">Driver license expired (ID: D-402)</span>
                                    </div>
                                </div>
                                <div className="alert-item warning">
                                    <Navigation size={16} className="alert-icon" />
                                    <div className="alert-content">
                                        <span className="alert-title">Route Deviation</span>
                                        <span className="alert-desc">Vehicle FT-4921 off prescribed path</span>
                                    </div>
                                </div>
                                <div className="alert-item success">
                                    <CheckCircle2 size={16} className="alert-icon" />
                                    <div className="alert-content">
                                        <span className="alert-title">Maintenance Cleared</span>
                                        <span className="alert-desc">Vehicle FT-1049 ready for dispatch</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default RealTimeDashboard;
