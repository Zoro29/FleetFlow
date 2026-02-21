import React, { useState } from 'react';
import { Plus, X, Fuel } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../app/DashboardLayout';

const emptyForm = { vehicleId: '', liters: '', costPerLiter: '', date: '', tripId: '' };

const ExpenseLogs = () => {
    const { expenses, vehicles, trips, addExpense } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.vehicleId || !form.liters || !form.costPerLiter || !form.date) {
            setError('Please fill all required fields.'); return;
        }
        addExpense({ ...form, liters: Number(form.liters), costPerLiter: Number(form.costPerLiter) });
        setForm(emptyForm); setShowModal(false); setError('');
    };

    // Aggregate totals per vehicle
    const vehicleTotals = vehicles.map(v => {
        const vExpenses = expenses.filter(e => e.vehicleId === v.id);
        const fuel = vExpenses.filter(e => e.type === 'Fuel').reduce((s, e) => s + e.totalCost, 0);
        const maint = vExpenses.filter(e => e.type === 'Maintenance').reduce((s, e) => s + e.totalCost, 0);
        return { ...v, fuelCost: fuel, maintCost: maint, total: fuel + maint };
    }).filter(v => v.total > 0);

    const totalSpend = expenses.reduce((s, e) => s + e.totalCost, 0);

    return (
        <DashboardLayout>
            <div className="page-header">
                <div>
                    <h2>Expense & Fuel Logs</h2>
                    <p>Total Spend: <strong style={{ color: 'var(--error)' }}>₹{totalSpend.toLocaleString()}</strong></p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Plus size={16} /> Log Fuel
                </button>
            </div>

            {/* Per-vehicle totals */}
            <div className="data-card" style={{ marginBottom: 24 }}>
                <div className="data-card-header"><h3>Total Operational Costs per Vehicle</h3></div>
                <table className="data-table">
                    <thead>
                        <tr><th>Vehicle</th><th>Fuel Cost (₹)</th><th>Maintenance (₹)</th><th>Total Cost (₹)</th></tr>
                    </thead>
                    <tbody>
                        {vehicleTotals.map(v => (
                            <tr key={v.id}>
                                <td><span className="font-mono">{v.id}</span> — {v.name}</td>
                                <td style={{ color: 'var(--primary)', fontWeight: 600 }}>₹{v.fuelCost.toLocaleString()}</td>
                                <td style={{ color: 'var(--warning)', fontWeight: 600 }}>₹{v.maintCost.toLocaleString()}</td>
                                <td style={{ color: 'var(--error)', fontWeight: 700 }}>₹{v.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* All expense records */}
            <div className="data-card">
                <div className="data-card-header"><h3>All Expense Records ({expenses.length})</h3></div>
                <table className="data-table">
                    <thead>
                        <tr><th>ID</th><th>Vehicle</th><th>Type</th><th>Liters</th><th>Rate</th><th>Total (₹)</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                        {[...expenses].reverse().map(e => {
                            const v = vehicles.find(v => v.id === e.vehicleId);
                            return (
                                <tr key={e.id}>
                                    <td className="font-mono">{e.id}</td>
                                    <td>{v?.name || e.vehicleId}</td>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            {e.type === 'Fuel' ? <Fuel size={13} color="var(--primary)" /> : '🔧'}
                                            {e.type}
                                        </span>
                                    </td>
                                    <td>{e.liters > 0 ? `${e.liters}L` : '—'}</td>
                                    <td>{e.costPerLiter > 0 ? `₹${e.costPerLiter}/L` : '—'}</td>
                                    <td style={{ fontWeight: 700, color: 'var(--error)' }}>₹{e.totalCost.toLocaleString()}</td>
                                    <td>{e.date}</td>
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
                            <h2>Log Fuel Expense</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group-app">
                                    <label className="form-label-app">Vehicle *</label>
                                    <select className="form-input-app" value={form.vehicleId} onChange={e => setForm({ ...form, vehicleId: e.target.value })}>
                                        <option value="">— Select Vehicle —</option>
                                        {vehicles.filter(v => v.status !== 'Retired').map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Trip (optional)</label>
                                    <select className="form-input-app" value={form.tripId} onChange={e => setForm({ ...form, tripId: e.target.value })}>
                                        <option value="">— No Trip —</option>
                                        {trips.map(t => <option key={t.id} value={t.id}>{t.id}: {t.origin}→{t.destination}</option>)}
                                    </select>
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Liters Filled *</label>
                                    <input className="form-input-app" type="number" step="0.1" placeholder="e.g. 45" value={form.liters} onChange={e => setForm({ ...form, liters: e.target.value })} />
                                </div>
                                <div className="form-group-app">
                                    <label className="form-label-app">Cost Per Liter (₹) *</label>
                                    <input className="form-input-app" type="number" step="0.1" placeholder="e.g. 94.5" value={form.costPerLiter} onChange={e => setForm({ ...form, costPerLiter: e.target.value })} />
                                </div>
                                <div className="form-group-app full">
                                    <label className="form-label-app">Date *</label>
                                    <input className="form-input-app" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                {form.liters && form.costPerLiter && (
                                    <div className="form-group-app full">
                                        <div style={{ background: '#ECFDF5', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>
                                            Auto-calculated Total: ₹{(Number(form.liters) * Number(form.costPerLiter)).toLocaleString()}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Log Expense</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ExpenseLogs;
