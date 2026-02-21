import React, { useState } from 'react';
import { Plus, X, CheckCircle, XCircle, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const statusClass = {
    'Draft': 'pill-draft', 'Dispatched': 'pill-dispatched',
    'Completed': 'pill-completed', 'Cancelled': 'pill-cancelled',
};

const emptyForm = { vehicleId: '', driverId: '', origin: '', destination: '', cargoWeight: '', notes: '', date: '' };

const TripDispatcher = () => {
    const { trips, vehicles, drivers, addTrip, updateTripStatus, isDriverEligible } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const availableVehicles = vehicles.filter(v => v.status === 'Available');
    const eligibleDrivers = drivers.filter(d => isDriverEligible(d));

    const selectedVehicle = vehicles.find(v => v.id === form.vehicleId);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.vehicleId || !form.driverId || !form.origin || !form.destination || !form.cargoWeight) {
            setError('Please fill all required fields.'); return;
        }
        const result = addTrip({ ...form, cargoWeight: Number(form.cargoWeight), date: form.date || new Date().toISOString().slice(0, 10) });
        if (!result.success) { setError(result.error); return; }
        setForm(emptyForm); setShowModal(false); setError('');
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Trip Dispatcher</h2>
                    <p>Create and manage fleet deployments</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Create Trip
                </button>
            </div>

            <div className="data-card">
                <div className="data-card-header"><h3>All Trips ({trips.length})</h3></div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Trip ID</th><th>Route</th><th>Vehicle</th><th>Driver</th>
                            <th>Cargo (kg)</th><th>Date</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...trips].reverse().map(t => {
                            const v = vehicles.find(v => v.id === t.vehicleId);
                            const d = drivers.find(d => d.id === t.driverId);
                            return (
                                <tr key={t.id}>
                                    <td className="font-mono">{t.id}</td>
                                    <td><strong style={{ color: 'var(--text-main)' }}>{t.origin}</strong> → {t.destination}</td>
                                    <td>{v?.name || t.vehicleId}</td>
                                    <td>{d?.name || t.driverId}</td>
                                    <td>{t.cargoWeight} {v ? `/ ${v.capacity}` : ''}</td>
                                    <td>{t.date}</td>
                                    <td><span className={`status-pill ${statusClass[t.status]}`}>{t.status}</span></td>
                                    <td>
                                        {t.status === 'Draft' && (
                                            <button className="btn-action success" onClick={() => updateTripStatus(t.id, 'Dispatched')}>
                                                Dispatch
                                            </button>
                                        )}
                                        {t.status === 'Dispatched' && (
                                            <button className="btn-action success" onClick={() => updateTripStatus(t.id, 'Completed')}>
                                                Complete
                                            </button>
                                        )}
                                        {(t.status === 'Draft' || t.status === 'Dispatched') && (
                                            <button className="btn-action danger" onClick={() => updateTripStatus(t.id, 'Cancelled')}>
                                                Cancel
                                            </button>
                                        )}
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
                            <h2>Create New Trip</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}
                        {selectedVehicle && (
                            <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>
                                Max Capacity: {selectedVehicle.capacity} kg
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Vehicle *</label>
                                    <select className="form-input-app" value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })}>
                                        <option value="">— Select Vehicle —</option>
                                        {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.capacity}kg)</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Driver *</label>
                                    <select className="form-input-app" value={form.driverId} onChange={e => setForm({ ...form, driverId: e.target.value })}>
                                        <option value="">— Select Driver —</option>
                                        {eligibleDrivers.map(d => <option key={d.id} value={d.id}>{d.name} ({d.category})</option>)}
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
                                    <input className="form-input-app" type="number" placeholder="e.g. 450" value={form.cargoWeight} onChange={e => setForm({ ...form, cargoWeight: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Date</label>
                                    <input className="form-input-app" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div className="form-group-app full">
                                    <label className="form-label-app">Notes</label>
                                    <input className="form-input-app" placeholder="e.g. Fragile cargo" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Trip</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default TripDispatcher;
