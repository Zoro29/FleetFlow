import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, TrendingUp, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Analytics = () => {
    const { vehicles, expenses, trips } = useAppContext();

    // Fuel efficiency per vehicle (mock km data)
    const kmPerTrip = { V001: 320, V002: 160, V003: 45, V004: 0, V005: 580 };
    const fuelEfficiency = vehicles.map(v => {
        const fuelLiters = expenses.filter(e => e.vehicleId === v.id && e.type === 'Fuel').reduce((s, e) => s + e.liters, 0);
        const km = kmPerTrip[v.id] || 0;
        return { name: v.name.split(' ')[0], kmPerL: fuelLiters > 0 ? +(km / fuelLiters).toFixed(2) : 0, liters: fuelLiters };
    }).filter(v => v.liters > 0);

    // Cost breakdown pie
    const fuelTotal = expenses.filter(e => e.type === 'Fuel').reduce((s, e) => s + e.totalCost, 0);
    const maintTotal = expenses.filter(e => e.type === 'Maintenance').reduce((s, e) => s + e.totalCost, 0);
    const pieData = [
        { name: 'Fuel', value: fuelTotal },
        { name: 'Maintenance', value: maintTotal },
    ];

    // Vehicle ROI (mock revenue per vehicle)
    const mockRevenue = { V001: 45000, V002: 28000, V003: 5000, V004: 0, V005: 80000 };
    const roiData = vehicles.map(v => {
        const costs = expenses.filter(e => e.vehicleId === v.id).reduce((s, e) => s + e.totalCost, 0);
        const revenue = mockRevenue[v.id] || 0;
        const acquisitionCost = 500000;
        const roi = acquisitionCost > 0 ? +(((revenue - costs) / acquisitionCost) * 100).toFixed(1) : 0;
        return { id: v.id, name: v.name, revenue, costs, profit: revenue - costs, roi };
    });

    // CSV Export
    const exportCSV = (data, name) => {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(r => Object.values(r).join(','));
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${name}.csv`; a.click();
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Analytics & Financial Reports</h2>
                    <p>Data-driven insights for operational decisions</p>
                </div>
                <button className="btn btn-outline" onClick={() => exportCSV(roiData, 'fleetflow-roi')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Summary KPI row */}
            <div className="kpi-grid" style={{ marginBottom: 24 }}>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--primary)' }}>
                    <div className="kpi-label">Total Trips</div>
                    <div className="kpi-value">{trips.length}</div>
                    <div className="kpi-sub">{trips.filter(t => t.status === 'Completed').length} completed</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--error)' }}>
                    <div className="kpi-label">Total Fuel Cost</div>
                    <div className="kpi-value" style={{ fontSize: 24 }}>₹{fuelTotal.toLocaleString()}</div>
                    <div className="kpi-sub">Across all vehicles</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--warning)' }}>
                    <div className="kpi-label">Total Maintenance</div>
                    <div className="kpi-value" style={{ fontSize: 24 }}>₹{maintTotal.toLocaleString()}</div>
                    <div className="kpi-sub">Service records logged</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--success)' }}>
                    <div className="kpi-label">Total Revenue (Mock)</div>
                    <div className="kpi-value" style={{ fontSize: 24 }}>₹{Object.values(mockRevenue).reduce((a, b) => a + b, 0).toLocaleString()}</div>
                    <div className="kpi-sub">Across fleet</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {/* Fuel Efficiency Chart */}
                <div className="data-card">
                    <div className="data-card-header">
                        <h3>Fuel Efficiency (km/L)</h3>
                        <TrendingUp size={16} color="var(--text-tertiary)" />
                    </div>
                    <div style={{ padding: '20px 16px' }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={fuelEfficiency}>
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(v) => [`${v} km/L`, 'Efficiency']} />
                                <Bar dataKey="kmPerL" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cost Breakdown Pie */}
                <div className="data-card">
                    <div className="data-card-header">
                        <h3>Cost Breakdown</h3>
                        <DollarSign size={16} color="var(--text-tertiary)" />
                    </div>
                    <div style={{ padding: '20px 16px' }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Vehicle ROI Table */}
            <div className="data-card">
                <div className="data-card-header">
                    <h3>Vehicle ROI Analysis</h3>
                    <button className="btn-action" onClick={() => exportCSV(roiData, 'vehicle-roi')}>
                        <Download size={12} /> Export
                    </button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr><th>Vehicle</th><th>Revenue (₹)</th><th>Total Costs (₹)</th><th>Net Profit (₹)</th><th>ROI %</th></tr>
                    </thead>
                    <tbody>
                        {roiData.map(r => (
                            <tr key={r.id}>
                                <td><span className="font-mono">{r.id}</span> — {r.name}</td>
                                <td style={{ color: 'var(--success)', fontWeight: 600 }}>₹{r.revenue.toLocaleString()}</td>
                                <td style={{ color: 'var(--error)', fontWeight: 600 }}>₹{r.costs.toLocaleString()}</td>
                                <td style={{ fontWeight: 700, color: r.profit >= 0 ? 'var(--success)' : 'var(--error)' }}>
                                    {r.profit >= 0 ? '+' : ''}₹{r.profit.toLocaleString()}
                                </td>
                                <td>
                                    <span style={{
                                        fontWeight: 700,
                                        color: r.roi > 5 ? 'var(--success)' : r.roi > 0 ? 'var(--warning)' : 'var(--error)'
                                    }}>
                                        {r.roi}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
