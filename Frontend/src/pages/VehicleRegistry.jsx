import React, { useState } from 'react';
import { Plus, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const statusClass = {
    'Available': 'pill-available', 'On Trip': 'pill-ontrip',
    'In Shop': 'pill-inshop', 'Retired': 'pill-retired',
};

const emptyForm = { name: '', model: '', plate: '', type: 'Van', capacity: '', odometer: '' };

const VehicleRegistry = () => {
    const { vehicles, addVehicle, retireVehicle, updateVehicleStatus } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.plate || !form.capacity) { setError('Please fill all required fields.'); return; }
        addVehicle({ ...form, capacity: Number(form.capacity), odometer: Number(form.odometer || 0) });
        setForm(emptyForm);
        setShowModal(false);
        setError('');
    };

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Vehicle Registry</h2>
                    <p>Manage and track all fleet assets</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Add Vehicle
                </button>
            </div>

            <div className="data-card">
                <div className="data-card-header">
                    <h3>All Vehicles ({vehicles.length})</h3>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Name / Model</th><th>Type</th><th>License Plate</th>
                            <th>Max Load</th><th>Odometer</th><th>Status</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(v => (
                            <tr key={v.id}>
                                <td className="font-mono">{v.id}</td>
                                <td><strong style={{ color: 'var(--text-main)' }}>{v.name}</strong><br /><small style={{ color: 'var(--text-tertiary)' }}>{v.model}</small></td>
                                <td>{v.type}</td>
                                <td className="font-mono">{v.plate}</td>
                                <td>{v.capacity} kg</td>
                                <td>{v.odometer.toLocaleString()} km</td>
                                <td><span className={`status-pill ${statusClass[v.status]}`}>{v.status}</span></td>
                                <td>
                                    {v.status === 'Available' && (
                                        <button className="btn-action danger" onClick={() => retireVehicle(v.id)}>
                                            Retire
                                        </button>
                                    )}
                                    {v.status === 'In Shop' && (
                                        <button className="btn-action success" onClick={() => updateVehicleStatus(v.id, 'Available')}>
                                            Mark Ready
                                        </button>
                                    )}
                                    {v.status === 'Retired' && (
                                        <button className="btn-action" onClick={() => updateVehicleStatus(v.id, 'Available')}>
                                            Reactivate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Vehicle Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Vehicle</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Vehicle Name *</label>
                                    <input className="form-input-app" placeholder="e.g. Van Bravo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Model</label>
                                    <input className="form-input-app" placeholder="e.g. Mahindra Supro" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">License Plate *</label>
                                    <input className="form-input-app" placeholder="e.g. MH-01-AB-1234" value={form.plate} onChange={e => setForm({ ...form, plate: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Type</label>
                                    <select className="form-input-app" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                        <option>Truck</option><option>Van</option><option>Bike</option>
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Max Capacity (kg) *</label>
                                    <input className="form-input-app" type="number" placeholder="e.g. 500" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Current Odometer (km)</label>
                                    <input className="form-input-app" type="number" placeholder="e.g. 0" value={form.odometer} onChange={e => setForm({ ...form, odometer: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Vehicle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default VehicleRegistry;
