import React, { useState } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const statusClass = { 'On Duty': 'pill-onduty', 'Off Duty': 'pill-offduty', 'Suspended': 'pill-suspended' };
const emptyForm = { name: '', license: '', category: 'Van', expiry: '', status: 'Off Duty' };

const DriverProfiles = () => {
    const { drivers, addDriver, updateDriverStatus, isDriverEligible } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const isExpired = (expiry) => new Date(expiry) < new Date();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.license || !form.expiry) { setError('Fill all required fields.'); return; }
        addDriver(form);
        setForm(emptyForm); setShowModal(false); setError('');
    };

    const cycleStatus = (driver) => {
        const cycle = { 'On Duty': 'Off Duty', 'Off Duty': 'Suspended', 'Suspended': 'Off Duty' };
        updateDriverStatus(driver.id, cycle[driver.status]);
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Driver Profiles</h2>
                    <p>Compliance, performance, and status management</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Add Driver
                </button>
            </div>

            <div className="data-card">
                <div className="data-card-header"><h3>All Drivers ({drivers.length})</h3></div>
                <table className="data-table">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>License</th><th>Category</th><th>Expiry</th><th>Trips</th><th>Safety Score</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {drivers.map(d => {
                            const expired = isExpired(d.expiry);
                            return (
                                <tr key={d.id} style={expired || d.status === 'Suspended' ? { background: '#FFF8F8' } : {}}>
                                    <td className="font-mono">{d.id}</td>
                                    <td>
                                        <strong style={{ color: 'var(--text-main)' }}>{d.name}</strong>
                                        {!isDriverEligible(d) && (
                                            <span style={{ marginLeft: 8, fontSize: 11, background: '#FEF2F2', color: 'var(--error)', padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>
                                                ⛔ Blocked
                                            </span>
                                        )}
                                    </td>
                                    <td className="font-mono">{d.license}</td>
                                    <td>{d.category}</td>
                                    <td style={{ color: expired ? 'var(--error)' : 'var(--text-secondary)', fontWeight: expired ? 700 : 400 }}>
                                        {expired && <AlertCircle size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                                        {d.expiry}
                                        {expired && <span className="status-pill pill-expired" style={{ marginLeft: 6 }}>Expired</span>}
                                    </td>
                                    <td>{d.trips}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{
                                                width: 60, height: 8, borderRadius: 4,
                                                background: `linear-gradient(to right, ${d.safetyScore > 85 ? 'var(--success)' : d.safetyScore > 70 ? 'var(--warning)' : 'var(--error)'} ${d.safetyScore}%, var(--border-color) 0)`
                                            }} />
                                            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{d.safetyScore}</span>
                                        </div>
                                    </td>
                                    <td><span className={`status-pill ${statusClass[d.status]}`}>{d.status}</span></td>
                                    <td>
                                        <button className="btn-action" onClick={() => cycleStatus(d)}>
                                            Toggle Status
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Driver</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Full Name *</label>
                                    <input className="form-input-app" placeholder="e.g. Alex Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">License No. *</label>
                                    <input className="form-input-app" placeholder="e.g. DL-MH-2024-001" value={form.license} onChange={e => setForm({ ...form, license: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">License Category</label>
                                    <select className="form-input-app" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        <option>Van</option><option>Truck</option><option>Bike</option>
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">License Expiry *</label>
                                    <input className="form-input-app" type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Driver</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default DriverProfiles;
