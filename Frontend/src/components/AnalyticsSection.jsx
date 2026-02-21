import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, DollarSign, TrendingDown } from 'lucide-react';
import './AnalyticsSection.css';

const financialData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 34000 },
    { month: 'Mar', revenue: 48000, expenses: 31000 },
    { month: 'Apr', revenue: 61000, expenses: 36000 },
    { month: 'May', revenue: 59000, expenses: 33000 },
    { month: 'Jun', revenue: 68000, expenses: 30000 },
];

const AnalyticsSection = () => {
    return (
        <section className="analytics-section">
            <div className="container">

                <div className="section-header text-center">
                    <h2>Predictable ROI & Financial Tracking</h2>
                    <p>
                        Connect raw trip telemetry directly to your bottom line. Move from
                        estimated costs to exact, per-kilometer profitability metrics.
                    </p>
                </div>

                <div className="analytics-grid">

                    {/* Formula / Metrics Column */}
                    <div className="metrics-column">
                        <div className="metric-card">
                            <div className="metric-header">
                                <Calculator size={20} className="text-primary" />
                                <h4>Vehicle ROI Formula</h4>
                            </div>
                            <div className="formula-box">
                                <span className="var">(Trip Revenue)</span> - <span className="var text-error">(Fuel + Tolls + Maint)</span>
                                <div className="formula-divider"></div>
                                <span className="var">Total Kilometers Driven</span>
                            </div>
                            <p className="metric-desc">Real-time Cost-Per-Km (CPK) calculation updated at the completion of every route.</p>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <TrendingDown size={20} className="text-success" />
                                <h4>Efficiency Gains</h4>
                            </div>
                            <div className="stat-group">
                                <div className="stat-value">14.2%</div>
                                <div className="stat-label">Reduction in unverified fuel expenses</div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Column */}
                    <div className="chart-column">
                        <div className="chart-card">
                            <div className="chart-header">
                                <div>
                                    <h3>Revenue vs. Operational Expenses</h3>
                                    <span className="chart-subtitle">YTD Fleet Performance (USD)</span>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <span className="legend-dot bg-primary"></span>
                                        <span>Revenue</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot bg-secondary"></span>
                                        <span>Expenses</span>
                                    </div>
                                </div>
                            </div>

                            <div className="area-chart-container">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2E5BFF" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#2E5BFF" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#A3ACB9" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#A3ACB9" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F2" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5F6B7A' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5F6B7A' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #E5E9F2', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                                            formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#2E5BFF" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                                        <Area type="monotone" dataKey="expenses" stroke="#A3ACB9" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AnalyticsSection;
