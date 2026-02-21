import React, { useState } from 'react';
import { Plus, X, Play, CheckCircle, XCircle, AlertTriangle, Truck, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const statusClass = {
    Draft: 'pill-draft', Dispatched: 'pill-dispatched',
    Completed: 'pill-completed', Cancelled: 'pill-cancelled',
};

const emptyForm = { vehicleId: '', driverId: '', origin: '', destination: '', cargoWeight: '', notes: '', date: '' };

const DispatcherPage = () => {
    const { trips, vehicles, drivers, addTrip, updateTripStatus, isDriverEligible } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');
    const [validationMsg, setValidationMsg] = useState('');

    const availableVehicles = vehicles.filter(v => v.status === 'Available');
    const eligibleDrivers = drivers.filter(d => isDriverEligible(d));
    const selectedVehicle = vehicles.find(v => v.id === form.vehicleId);

    // Live cargo validation
    const cargoNum = Number(form.cargoWeight);
    const overCapacity = selectedVehicle && cargoNum > 0 && cargoNum > selectedVehicle.capacity;
    const cargoOk = selectedVehicle && cargoNum > 0 && cargoNum <= selectedVehicle.capacity;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.vehicleId || !form.driverId || !form.origin || !form.destination || !form.cargoWeight) {
            setError('Please fill all required fields.'); return;
        }
        const result = addTrip({ ...form, cargoWeight: cargoNum, date: form.date || new Date().toISOString().slice(0, 10) });
        if (!result.success) { setError(result.error); return; }
        setForm(emptyForm); setShowModal(false); setError('');
    };

    // Stats for dispatcher
    const pendingTrips = trips.filter(t => t.status === 'Draft').length;
    const activeTrips = trips.filter(t => t.status === 'Dispatched').length;
    const availableVehicleCount = availableVehicles.length;
    const eligibleDriverCount = eligibleDrivers.length;

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Dispatcher Console</h2>
                    <p>Create trips, assign drivers, and validate cargo loads</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Create Trip
                </button>
            </div>

            {/* Dispatcher KPIs */}
            <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 24 }}>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--primary)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Pending Dispatch</div><div className="kpi-value">{pendingTrips}</div></div>
                        <div style={{ background: 'var(--primary-light)', borderRadius: '50%', padding: 10 }}><Play size={20} color="var(--primary)" /></div>
                    </div>
                    <div className="kpi-sub">Trips in Draft status</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--success)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Active Trips</div><div className="kpi-value">{activeTrips}</div></div>
                        <div style={{ background: '#ECFDF5', borderRadius: '50%', padding: 10 }}><CheckCircle size={20} color="var(--success)" /></div>
                    </div>
                    <div className="kpi-sub">Currently dispatched</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid #8B5CF6' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Available Vehicles</div><div className="kpi-value">{availableVehicleCount}</div></div>
                        <div style={{ background: '#F5F3FF', borderRadius: '50%', padding: 10 }}><Truck size={20} color="#8B5CF6" /></div>
                    </div>
                    <div className="kpi-sub">Ready for assignment</div>
                </div>
                <div className="kpi-card" style={{ borderTop: '3px solid var(--warning)' }}>
                    <div className="kpi-icon-wrap">
                        <div><div className="kpi-label">Eligible Drivers</div><div className="kpi-value">{eligibleDriverCount}</div></div>
                        <div style={{ background: '#FEF3C7', borderRadius: '50%', padding: 10 }}><User size={20} color="var(--warning)" /></div>
                    </div>
                    <div className="kpi-sub">Licensed and not suspended</div>
                </div>
            </div>

            {/* Available Vehicles Pool */}
            <div className="data-card" style={{ marginBottom: 24 }}>
                <div className="data-card-header"><h3>Available Vehicle Pool</h3></div>
                <table className="data-table">
                    <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Max Capacity</th><th>Odometer</th><th>Status</th></tr></thead>
                    <tbody>
                        {availableVehicles.map(v => (
                            <tr key={v.id}>
                                <td className="font-mono">{v.id}</td>
                                <td><strong style={{ color: 'var(--text-main)' }}>{v.name}</strong><small style={{ display: 'block', color: 'var(--text-tertiary)' }}>{v.model}</small></td>
                                <td>{v.type}</td>
                                <td><strong style={{ color: 'var(--primary)' }}>{v.capacity} kg</strong></td>
                                <td>{v.odometer.toLocaleString()} km</td>
                                <td><span className="status-pill pill-available">Available</span></td>
                            </tr>
                        ))}
                        {availableVehicles.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: 24 }}>No vehicles available for dispatch.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Active & Pending Trips */}
            <div className="data-card">
                <div className="data-card-header"><h3>Active & Pending Trips</h3></div>
                <table className="data-table">
                    <thead><tr><th>ID</th><th>Route</th><th>Vehicle</th><th>Driver</th><th>Cargo</th><th>Capacity</th><th>Validation</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {trips.filter(t => t.status !== 'Cancelled').reverse().map(t => {
                            const v = vehicles.find(v => v.id === t.vehicleId);
                            const d = drivers.find(d => d.id === t.driverId);
                            const pass = v && t.cargoWeight <= v.capacity;
                            return (
                                <tr key={t.id}>
                                    <td className="font-mono">{t.id}</td>
                                    <td><strong style={{ color: 'var(--text-main)' }}>{t.origin}</strong> → {t.destination}</td>
                                    <td>{v?.name || t.vehicleId}</td>
                                    <td>{d?.name || t.driverId}</td>
                                    <td>{t.cargoWeight} kg</td>
                                    <td>{v?.capacity} kg</td>
                                    <td>
                                        <span style={{ fontWeight: 700, color: pass ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', gap: 5 }}>
                                            {pass ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                            {pass ? 'PASS' : 'FAIL'}
                                        </span>
                                    </td>
                                    <td><span className={`status-pill ${statusClass[t.status]}`}>{t.status}</span></td>
                                    <td>
                                        {t.status === 'Draft' && <button className="btn-action success" onClick={() => updateTripStatus(t.id, 'Dispatched')}>Dispatch</button>}
                                        {t.status === 'Dispatched' && <button className="btn-action success" onClick={() => updateTripStatus(t.id, 'Completed')}>Complete</button>}
                                        {(t.status === 'Draft' || t.status === 'Dispatched') && <button className="btn-action danger" onClick={() => updateTripStatus(t.id, 'Cancelled')}>Cancel</button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Create Trip Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Trip</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}

                        {/* Live capacity validator */}
                        {selectedVehicle && form.cargoWeight && (
                            <div style={{
                                background: overCapacity ? '#FEF2F2' : '#ECFDF5',
                                border: `1px solid ${overCapacity ? '#FECACA' : '#A7F3D0'}`,
                                borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                                fontSize: 13, fontWeight: 700,
                                color: overCapacity ? 'var(--error)' : 'var(--success)',
                                display: 'flex', alignItems: 'center', gap: 8
                            }}>
                                {overCapacity ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                {overCapacity
                                    ? `⛔ FAIL: ${form.cargoWeight} kg exceeds capacity of ${selectedVehicle.capacity} kg!`
                                    : `✅ PASS: ${form.cargoWeight} kg ≤ ${selectedVehicle.capacity} kg capacity`}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Vehicle *</label>
                                    <select className="form-input-app" value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })}>
                                        <option value="">— Select Available Vehicle —</option>
                                        {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.name} — max {v.capacity} kg ({v.type})</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Driver *</label>
                                    <select className="form-input-app" value={form.driverId} onChange={e => setForm({ ...form, driverId: e.target.value })}>
                                        <option value="">— Select Eligible Driver —</option>
                                        {eligibleDrivers.map(d => <option key={d.id} value={d.id}>{d.name} ({d.category} license)</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Origin *</label>
                                    <input className="form-input-app" placeholder="e.g. Mumbai" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Destination *</label>
                                    <input className="form-input-app" placeholder="e.g. Pune" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Cargo Weight (kg) *</label>
                                    <input className="form-input-app" type="number" placeholder="e.g. 450" value={form.cargoWeight} onChange={e => setForm({ ...form, cargoWeight: e.target.value })}
                                        style={{ borderColor: overCapacity ? 'var(--error)' : cargoOk ? 'var(--success)' : 'var(--border-color)' }} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Date</label>
                                    <input className="form-input-app" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div className="form-group-app full">
                                    <label className="form-label-app">Notes</label>
                                    <input className="form-input-app" placeholder="e.g. Fragile cargo, handle with care" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={overCapacity} style={{ opacity: overCapacity ? 0.5 : 1 }}>Create Trip</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default DispatcherPage;
