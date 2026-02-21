import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Fuel, Wrench, Download } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const FinancialAnalystPage = () => {
    const { vehicles, expenses, maintenance, trips } = useAppContext();

    // Aggregate revenue and distance from trips
    const completedTrips = trips.filter(t => t.status === 'Completed');
    const totalRevenue = completedTrips.reduce((s, t) => s + (t.revenue || 0), 0);
    const totalDistance = completedTrips.reduce((s, t) => s + (t.distanceKm || 0), 0);

    const totalFuel = expenses.filter(e => e.type === 'Fuel').reduce((s, e) => s + e.totalCost, 0);
    const totalMaint = expenses.filter(e => e.type === 'Maintenance').reduce((s, e) => s + e.totalCost, 0);
    const totalCost = totalFuel + totalMaint;
    const netProfit = totalRevenue - totalCost;

    // Per-vehicle financial breakdown (real revenue and distance)
    const vehicleFinancials = vehicles.map(v => {
        const vTrips = completedTrips.filter(t => t.vehicleId === v.id);
        const revenue = vTrips.reduce((s, t) => s + (t.revenue || 0), 0);
        const km = vTrips.reduce((s, t) => s + (t.distanceKm || 0), 0);
        const fuelCost = expenses.filter(e => e.vehicleId === v.id && e.type === 'Fuel').reduce((s, e) => s + e.totalCost, 0);
        const maintCost = expenses.filter(e => e.vehicleId === v.id && e.type === 'Maintenance').reduce((s, e) => s + e.totalCost, 0);
        const liters = expenses.filter(e => e.vehicleId === v.id && e.type === 'Fuel').reduce((s, e) => s + e.liters, 0);
        const fuelEff = liters > 0 ? +(km / liters).toFixed(2) : 0;
        const vehicleTotalCost = fuelCost + maintCost;
        const profit = revenue - vehicleTotalCost;
        const acquisitionCost = 500000;
        const roi = acquisitionCost > 0 ? +(((profit) / acquisitionCost) * 100).toFixed(1) : 0;
        const costPerKm = km > 0 ? +(vehicleTotalCost / km).toFixed(2) : 0;
        return { id: v.id, name: v.name, type: v.type, fuelCost, maintCost, totalCost: vehicleTotalCost, revenue, profit, roi, fuelEff, costPerKm, trips: vTrips.length, distanceKm: km };
    }).filter(v => v.revenue > 0 || v.totalCost > 0);

    // Bar chart data
    const barData = vehicleFinancials.filter(v => v.totalCost > 0 || v.revenue > 0).map(v => ({
        name: v.name.split(' ')[0], Revenue: v.revenue, Fuel: v.fuelCost, Maintenance: v.maintCost,
    }));

    // Pie chart
    const pieData = [
        { name: 'Fuel', value: totalFuel },
        { name: 'Maintenance', value: totalMaint },
    ];

    // Monthly trend from real trips (group by month of created_at)
    const trendMap = new Map();
    completedTrips.forEach(t => {
        const d = t.date ? new Date(t.date) : null;
        if (!d || Number.isNaN(d.getTime())) return;
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (!trendMap.has(key)) trendMap.set(key, { month: key, fuel: 0, maint: 0, revenue: 0 });
        const bucket = trendMap.get(key);
        bucket.revenue += t.revenue || 0;
    });
    expenses.forEach(e => {
        const d = e.date ? new Date(e.date) : null;
        if (!d || Number.isNaN(d.getTime())) return;
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (!trendMap.has(key)) trendMap.set(key, { month: key, fuel: 0, maint: 0, revenue: 0 });
        const bucket = trendMap.get(key);
        if (e.type === 'Fuel') bucket.fuel += e.totalCost;
        if (e.type === 'Maintenance') bucket.maint += e.totalCost;
    });
    const trendData = Array.from(trendMap.values()).sort((a, b) => a.month.localeCompare(b.month));

    const exportCSV = (data, name) => {
        if (!data || data.length === 0) return; // nothing to export
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(r => Object.values(r).join(','));
        const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${name}.csv`; a.click();
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Financial Analyst Console</h2>
                    <p>Audit fuel spend, maintenance ROI, and operational costs</p>
                </div>
                <button className="btn btn-outline" onClick={() => exportCSV(vehicleFinancials, 'fleetflow-financials')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Financial KPIs */}
            <div className="kpi-grid" style={{ marginBottom: 24 }}>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--success)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Total Revenue</div><div className="kpi-value" style={{ fontSize: 22 }}>₹{totalRevenue.toLocaleString()}</div></div>
                        <div style={{ background: '#ECFDF5', borderRadius: '50%', padding: 10 }}><TrendingUp size={20} color="var(--success)" /></div>
                    </div>
                    <div className="kpi-sub">Across all fleet vehicles</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--primary)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Total Fuel Spend</div><div className="kpi-value" style={{ fontSize: 22 }}>₹{totalFuel.toLocaleString()}</div></div>
                        <div style={{ background: 'var(--primary-light)', borderRadius: '50%', padding: 10 }}><Fuel size={20} color="var(--primary)" /></div>
                    </div>
                    <div className="kpi-sub">{((totalFuel / (totalFuel + totalMaint)) * 100).toFixed(0)}% of total expenses</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--warning)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Maintenance Spend</div><div className="kpi-value" style={{ fontSize: 22 }}>₹{totalMaint.toLocaleString()}</div></div>
                        <div style={{ background: '#FEF3C7', borderRadius: '50%', padding: 10 }}><Wrench size={20} color="var(--warning)" /></div>
                    </div>
                    <div className="kpi-sub">{maintenance.length} service records</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--accent)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Distance Covered</div><div className="kpi-value" style={{ fontSize: 22 }}>{Math.round(totalDistance).toLocaleString()} km</div></div>
                        <div style={{ background: '#EEF2FF', borderRadius: '50%', padding: 10 }}><DollarSign size={20} color="var(--accent)" /></div>
                    </div>
                    <div className="kpi-sub">Completed trip distance</div>
                </div>
                <div className="kpi-card" style={{ borderTop: `3px solid ${netProfit >= 0 ? 'var(--success)' : 'var(--error)'}` }}>
                    <div className="kpi-icon-wrap">
                        <div>
                            <div className="kpi-label">Net Profit</div>
                            <div className="kpi-value" style={{ fontSize: 22, color: netProfit >= 0 ? 'var(--success)' : 'var(--error)' }}>
                                {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ background: netProfit >= 0 ? '#ECFDF5' : '#FEF2F2', borderRadius: '50%', padding: 10 }}>
                            {netProfit >= 0 ? <TrendingUp size={20} color="var(--success)" /> : <TrendingDown size={20} color="var(--error)" />}
                        </div>
                    </div>
                    <div className="kpi-sub">Revenue minus all costs</div>
                </div>
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
                {/* Monthly Trend */}
                <div className="data-card">
                    <div className="data-card-header"><h3>Monthly Cost vs Revenue Trend</h3></div>
                    <div style={{ padding: '20px 16px' }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="var(--success)" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                                <Line type="monotone" dataKey="fuel" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} name="Fuel" />
                                <Line type="monotone" dataKey="maint" stroke="var(--warning)" strokeWidth={2} dot={{ r: 4 }} name="Maintenance" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Expense Pie */}
                <div className="data-card">
                    <div className="data-card-header"><h3>Expense Breakdown</h3></div>
                    <div style={{ padding: '20px 16px' }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={75}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                </Pie>
                                <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Revenue vs Cost Bar */}
            <div className="data-card" style={{ marginBottom: 24 }}>
                <div className="data-card-header"><h3>Revenue vs Costs per Vehicle</h3></div>
                <div style={{ padding: '20px 16px' }}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
                            <Legend />
                            <Bar dataKey="Revenue" fill="var(--success)" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="Fuel" fill="var(--primary)" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="Maintenance" fill="var(--warning)" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Full Vehicle Financials Table */}
            <div className="data-card">
                <div className="data-card-header">
                    <h3>Vehicle Financial Audit Table</h3>
                    <button className="btn-action" onClick={() => exportCSV(vehicleFinancials, 'vehicle-audit')}>
                        <Download size={12} /> Export
                    </button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th><th>Revenue (₹)</th><th>Fuel Cost (₹)</th><th>Maint Cost (₹)</th>
                            <th>Total Cost (₹)</th><th>Net Profit (₹)</th><th>ROI %</th><th>Trips</th><th>Distance (km)</th><th>Fuel Eff.</th><th>Cost/km</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleFinancials.map(v => (
                            <tr key={v.id}>
                                <td><span className="font-mono">{v.id}</span> — {v.name}</td>
                                <td style={{ color: 'var(--success)', fontWeight: 600 }}>₹{v.revenue.toLocaleString()}</td>
                                <td style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{v.fuelCost.toLocaleString()}</td>
                                <td style={{ color: 'var(--warning)', fontWeight: 600 }}>₹{v.maintCost.toLocaleString()}</td>
                                <td style={{ color: 'var(--error)', fontWeight: 600 }}>₹{v.totalCost.toLocaleString()}</td>
                                <td style={{ fontWeight: 700, color: v.profit >= 0 ? 'var(--success)' : 'var(--error)' }}>
                                    {v.profit >= 0 ? '+' : ''}₹{v.profit.toLocaleString()}
                                </td>
                                <td>
                                    <span style={{ fontWeight: 700, color: v.roi > 5 ? 'var(--success)' : v.roi > 0 ? 'var(--warning)' : 'var(--error)' }}>
                                        {v.roi}%
                                    </span>
                                </td>
                                <td>{v.trips}</td>
                                <td>{v.distanceKm > 0 ? Math.round(v.distanceKm).toLocaleString() : '—'}</td>
                                <td>{v.fuelEff > 0 ? `${v.fuelEff} km/L` : '—'}</td>
                                <td>{v.costPerKm > 0 ? `₹${v.costPerKm}/km` : '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default FinancialAnalystPage;
