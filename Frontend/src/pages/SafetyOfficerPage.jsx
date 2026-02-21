import React from 'react';
import { AlertTriangle, CheckCircle, Shield, XCircle, TrendingUp, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const SafetyOfficerPage = () => {
    const { drivers, trips, updateDriverStatus } = useAppContext();

    const today = new Date();
    const isExpired = (expiry) => new Date(expiry) < today;
    const daysUntilExpiry = (expiry) => Math.ceil((new Date(expiry) - today) / (1000 * 60 * 60 * 24));

    const expired = drivers.filter(d => isExpired(d.expiry));
    const expiringSoon = drivers.filter(d => {
        const days = daysUntilExpiry(d.expiry);
        return !isExpired(d.expiry) && days <= 90;
    });
    const suspended = drivers.filter(d => d.status === 'Suspended');
    const compliant = drivers.filter(d => !isExpired(d.expiry) && d.status !== 'Suspended');
    const avgSafetyScore = Math.round(drivers.reduce((s, d) => s + d.safetyScore, 0) / drivers.length);

    const riskLevel = (driver) => {
        if (isExpired(driver.expiry) || driver.status === 'Suspended') return 'HIGH';
        const days = daysUntilExpiry(driver.expiry);
        if (days <= 30 || driver.safetyScore < 75) return 'MEDIUM';
        return 'LOW';
    };

    const riskColor = { HIGH: 'var(--error)', MEDIUM: 'var(--warning)', LOW: 'var(--success)' };
    const riskBg = { HIGH: '#FEF2F2', MEDIUM: '#FEF3C7', LOW: '#ECFDF5' };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Safety Officer Console</h2>
                    <p>Monitor driver compliance, license expirations, and safety scores</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: avgSafetyScore >= 85 ? '#ECFDF5' : '#FEF3C7', padding: '8px 16px', borderRadius: 12, fontWeight: 700, color: avgSafetyScore >= 85 ? 'var(--success)' : 'var(--warning)' }}>
                    <Shield size={18} />
                    Fleet Safety Score: {avgSafetyScore}/100
                </div>
            </div>

            {/* Safety KPIs */}
            <div className="kpi-grid" style={{ marginBottom: 24 }}>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--error)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Expired Licenses</div><div className="kpi-value" style={{ color: 'var(--error)' }}>{expired.length}</div></div>
                        <div style={{ background: '#FEF2F2', borderRadius: '50%', padding: 10 }}><XCircle size={20} color="var(--error)" /></div>
                    </div>
                    <div className="kpi-sub" style={{ color: 'var(--error)' }}>{expired.length > 0 ? 'Immediate action required' : 'All clear'}</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--warning)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Expiring ≤ 90 Days</div><div className="kpi-value" style={{ color: 'var(--warning)' }}>{expiringSoon.length}</div></div>
                        <div style={{ background: '#FEF3C7', borderRadius: '50%', padding: 10 }}><AlertTriangle size={20} color="var(--warning)" /></div>
                    </div>
                    <div className="kpi-sub">Renewal required soon</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid #8B5CF6' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Suspended</div><div className="kpi-value" style={{ color: '#8B5CF6' }}>{suspended.length}</div></div>
                        <div style={{ background: '#F5F3FF', borderRadius: '50%', padding: 10 }}><User size={20} color="#8B5CF6" /></div>
                    </div>
                    <div className="kpi-sub">Blocked from assignment</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--success)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Fully Compliant</div><div className="kpi-value" style={{ color: 'var(--success)' }}>{compliant.length}</div></div>
                        <div style={{ background: '#ECFDF5', borderRadius: '50%', padding: 10 }}><CheckCircle size={20} color="var(--success)" /></div>
                    </div>
                    <div className="kpi-sub">Valid license & active</div>
                </div>
            </div>

            {/* High Risk Alerts */}
            {(expired.length > 0 || suspended.length > 0) && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
                    <div style={{ fontWeight: 700, color: 'var(--error)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AlertTriangle size={18} /> Critical Compliance Alerts
                    </div>
                    {expired.map(d => (
                        <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #FECACA' }}>
                            <span style={{ color: 'var(--error)', fontWeight: 600 }}>{d.name} — License EXPIRED on {d.expiry}</span>
                            <button className="btn-action danger" onClick={() => updateDriverStatus(d.id, 'Suspended')}>Suspend Driver</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Expiring Soon Warning */}
            {expiringSoon.length > 0 && (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
                    <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <AlertTriangle size={18} /> Renewal Warnings (≤ 90 Days)
                    </div>
                    {expiringSoon.map(d => {
                        const days = daysUntilExpiry(d.expiry);
                        return (
                            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #FDE68A', color: '#92400E' }}>
                                <span><strong>{d.name}</strong> — expires {d.expiry}</span>
                                <span style={{ fontWeight: 700 }}>{days} days remaining</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Full Compliance Table */}
            <div className="data-card">
                <div className="data-card-header"><h3>Driver Compliance Register</h3></div>
                <table className="data-table">
                    <thead>
                        <tr><th>Driver</th><th>License</th><th>Category</th><th>Expiry</th><th>Days Left</th><th>Safety Score</th><th>Trips</th><th>Status</th><th>Risk</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {drivers.map(d => {
                            const expired = isExpired(d.expiry);
                            const days = daysUntilExpiry(d.expiry);
                            const risk = riskLevel(d);
                            return (
                                <tr key={d.id} style={{ background: expired ? '#FFF8F8' : 'inherit' }}>
                                    <td><strong style={{ color: 'var(--text-main)' }}>{d.name}</strong></td>
                                    <td className="font-mono">{d.license}</td>
                                    <td>{d.category}</td>
                                    <td style={{ color: expired ? 'var(--error)' : days <= 90 ? 'var(--warning)' : 'inherit', fontWeight: expired ? 700 : 400 }}>
                                        {d.expiry}
                                    </td>
                                    <td style={{ fontWeight: 700, color: expired ? 'var(--error)' : days <= 30 ? 'var(--error)' : days <= 90 ? 'var(--warning)' : 'var(--success)' }}>
                                        {expired ? 'EXPIRED' : `${days}d`}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 70, height: 8, borderRadius: 4, background: `linear-gradient(to right, ${d.safetyScore > 85 ? 'var(--success)' : d.safetyScore > 70 ? 'var(--warning)' : 'var(--error)'} ${d.safetyScore}%, var(--border-color) 0)` }} />
                                            <span style={{ fontWeight: 700 }}>{d.safetyScore}</span>
                                        </div>
                                    </td>
                                    <td>{d.trips}</td>
                                    <td>
                                        <span className={`status-pill ${d.status === 'On Duty' ? 'pill-onduty' : d.status === 'Suspended' ? 'pill-suspended' : 'pill-offduty'}`}>{d.status}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 12, background: riskBg[risk], color: riskColor[risk] }}>
                                            {risk}
                                        </span>
                                    </td>
                                    <td>
                                        {d.status !== 'Suspended' && <button className="btn-action danger" onClick={() => updateDriverStatus(d.id, 'Suspended')}>Suspend</button>}
                                        {d.status === 'Suspended' && <button className="btn-action success" onClick={() => updateDriverStatus(d.id, 'Off Duty')}>Reinstate</button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default SafetyOfficerPage;
