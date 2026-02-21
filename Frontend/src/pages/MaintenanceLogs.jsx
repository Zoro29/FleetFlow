import React, { useState } from 'react';
import { Plus, X, Wrench } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const emptyForm = { vehicleId: '', serviceType: '', date: '', cost: '', notes: '' };

const MaintenanceLogs = () => {
    const { maintenance, vehicles, addMaintenance } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.vehicleId || !form.serviceType || !form.date || !form.cost) {
            setError('Please fill all required fields.'); return;
        }
        addMaintenance({ ...form, cost: Number(form.cost) });
        setForm(emptyForm); setShowModal(false); setError('');
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Maintenance Logs</h2>
                    <p>Track servicing — vehicles auto-set to "In Shop" on log submission</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Log Service
                </button>
            </div>

            {/* Quick info banner */}
            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#92400E', fontWeight: 500 }}>
                ⚡ Auto-Logic: Logging a service record automatically sets the vehicle status to <strong>In Shop</strong>, removing it from the Dispatcher selection pool.
            </div>

            <div className="data-card">
                <div className="data-card-header"><h3>Service Records ({maintenance.length})</h3></div>
                <table className="data-table">
                    <thead>
                        <tr><th>ID</th><th>Vehicle</th><th>Service Type</th><th>Date</th><th>Cost (₹)</th><th>Notes</th></tr>
                    </thead>
                    <tbody>
                        {[...maintenance].reverse().map(m => {
                            const v = vehicles.find(v => v.id === m.vehicleId);
                            return (
                                <tr key={m.id}>
                                    <td className="font-mono">{m.id}</td>
                                    <td>{v?.name || m.vehicleId}</td>
                                    <td><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Wrench size={13} /> {m.serviceType}</span></td>
                                    <td>{m.date}</td>
                                    <td style={{ color: 'var(--warning)', fontWeight: 700 }}>₹{m.cost.toLocaleString()}</td>
                                    <td style={{ color: 'var(--text-tertiary)' }}>{m.notes || '—'}</td>
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
                            <h2>Log Service Record</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}
                        <div style={{ background: '#FEF3C7', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#92400E', fontWeight: 500 }}>
                            Vehicle will be automatically set to "In Shop" after submission.
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Vehicle *</label>
                                    <select className="form-input-app" value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })}>
                                        <option value="">— Select Vehicle —</option>
                                        {vehicles.filter(v => v.status !== 'Retired').map(v => <option key={v.id} value={v.id}>{v.name} ({v.status})</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Service Type *</label>
                                    <select className="form-input-app" value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })}>
                                        <option value="">— Select —</option>
                                        <option>Oil Change</option>
                                        <option>Tyre Replacement</option>
                                        <option>Engine Overhaul</option>
                                        <option>Brake Service</option>
                                        <option>AC Repair</option>
                                        <option>Battery Replacement</option>
                                        <option>General Checkup</option>
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Service Date *</label>
                                    <input className="form-input-app" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Cost (₹) *</label>
                                    <input className="form-input-app" type="number" placeholder="e.g. 8500" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} />
                                </div>
                                <div className="form-group-app full">
                                    <label className="form-label-app">Notes</label>
                                    <input className="form-input-app" placeholder="e.g. Replaced all four tyres" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Log Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default MaintenanceLogs;
