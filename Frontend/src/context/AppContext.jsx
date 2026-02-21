import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialVehicles = [];
const initialDrivers = [];
const initialTrips = [];
const initialMaintenance = [];
const initialExpenses = [];

export const AppProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [drivers, setDrivers] = useState(initialDrivers);
    const [trips, setTrips] = useState(initialTrips);
    const [maintenance, setMaintenance] = useState(initialMaintenance);
    const [expenses, setExpenses] = useState(initialExpenses);
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('ff_token');
        const user = token ? JSON.parse(localStorage.getItem('ff_user') || 'null') : null;
        return { token, user };
    });

    useEffect(() => {
        if (auth.token) {
            localStorage.setItem('ff_token', auth.token);
            if (auth.user) localStorage.setItem('ff_user', JSON.stringify(auth.user));
        } else {
            localStorage.removeItem('ff_token');
            localStorage.removeItem('ff_user');
        }
    }, [auth]);

    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

    // load all data from backend on mount
    useEffect(() => {
        async function load() {
            try {
                const [vRes, dRes, tRes, mRes, eRes] = await Promise.all([
                    fetch(`${API_BASE}/vehicles`, { headers: auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {} }),
                    fetch(`${API_BASE}/drivers`, { headers: auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {} }),
                    fetch(`${API_BASE}/trips`, { headers: auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {} }),
                    fetch(`${API_BASE}/maintenance`, { headers: auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {} }),
                    fetch(`${API_BASE}/expenses`, { headers: auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {} }),
                ]);
                if (vRes.ok) setVehicles(await vRes.json());
                if (dRes.ok) setDrivers(await dRes.json());
                if (tRes.ok) setTrips(await tRes.json());
                if (mRes.ok) setMaintenance(await mRes.json());
                if (eRes.ok) setExpenses(await eRes.json());
            } catch (err) {
                // ignore for now
            }
        }
        load();
    }, [API_BASE, auth && auth.token]);

    async function login(email, password) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Login failed');
        }
        const body = await res.json();
        setAuth({ token: body.token, user: body.user || null });
        return body;
    }

    async function register({ name, email, password, role }) {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Registration failed');
        }
        const body = await res.json();
        return body;
    }

    function logout() {
        setAuth({ token: null, user: null });
    }

    function authHeaders() {
        return auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
    }

    function userRole() {
        return auth && auth.user ? auth.user.role : null;
    }

    function hasRole(...roles) {
        const r = userRole();
        return !!(r && roles.includes(r));
    }

    // Vehicle actions
    const addVehicle = async (vehicle) => {
        const payload = {
            name: vehicle.name,
            model: vehicle.model,
            license_plate: vehicle.plate,
            type: vehicle.type,
            max_capacity: vehicle.capacity,
            odometer: vehicle.odometer || 0,
        };
        const res = await fetch(`${API_BASE}/vehicles`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify(payload) });
        if (res.ok) {
            const body = await res.json();
            // map to frontend shape
            const item = { id: body.id, name: body.name, model: body.model || '', plate: body.license_plate || '', type: body.type || '', capacity: body.max_capacity || body.capacity || 0, odometer: body.odometer || 0, status: body.status || 'Available' };
            setVehicles(prev => [...prev, item]);
        } else {
            throw new Error('Failed to create vehicle');
        }
    };

    const updateVehicleStatus = (vehicleId, status) => {
        setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status } : v));
    };

    const retireVehicle = (vehicleId) => {
        updateVehicleStatus(vehicleId, 'Retired');
    };

    // Driver actions
    const addDriver = async (driver) => {
        // create locally via API if endpoint exists; for now just add locally
        const payload = { name: driver.name, license: driver.license, category: driver.category, expiry: driver.expiry, status: driver.status || 'Off Duty' };
        const res = await fetch(`${API_BASE}/drivers`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify(payload) });
        if (res.ok) {
            const body = await res.json();
            const item = { id: body.id, name: body.name, license: body.license, category: body.category, expiry: body.expiry, status: body.status, trips: body.trips || 0, safetyScore: body.safetyScore || 0 };
            setDrivers(prev => [...prev, item]);
        } else {
            // fallback: add locally
            const id = `D${String(drivers.length + 1).padStart(3, '0')}`;
            setDrivers(prev => [...prev, { ...driver, id, trips: 0, safetyScore: 100 }]);
        }
    };

    const updateDriverStatus = (driverId, status) => {
        setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, status } : d));
    };

    const isDriverEligible = (driver) => {
        const today = new Date();
        const expiry = new Date(driver.expiry);
        return expiry > today && driver.status !== 'Suspended';
    };

    // Trip actions
    const addTrip = async (trip) => {
        const payload = {
            vehicle_id: trip.vehicleId,
            driver_id: trip.driverId,
            cargo_weight: trip.cargoWeight,
            origin: trip.origin,
            destination: trip.destination,
            notes: trip.notes || '',
            date: trip.date || new Date().toISOString(),
        };
        const res = await fetch(`${API_BASE}/trips`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify(payload) });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return { success: false, error: err.message || 'Create trip failed' };
        }
        const body = await res.json();
        const item = { id: body.id, vehicleId: body.vehicle_id, driverId: body.driver_id, origin: body.origin, destination: body.destination, cargoWeight: body.cargo_weight, status: body.status, date: body.date || body.created_at, notes: body.notes || '' };
        setTrips(prev => [...prev, item]);
        return { success: true };
    };

    const updateTripStatus = (tripId, newStatus) => {
        setTrips(prev => prev.map(t => {
            if (t.id !== tripId) return t;
            if (newStatus === 'Dispatched') {
                updateVehicleStatus(t.vehicleId, 'On Trip');
                updateDriverStatus(t.driverId, 'On Duty');
            }
            if (newStatus === 'Completed' || newStatus === 'Cancelled') {
                updateVehicleStatus(t.vehicleId, 'Available');
                updateDriverStatus(t.driverId, 'Off Duty');
            }
            return { ...t, status: newStatus };
        }));
    };

    // Maintenance actions
    const addMaintenance = async (record) => {
        const payload = { vehicle_id: record.vehicleId, serviceType: record.serviceType || record.serviceType, date: record.date, cost: record.cost, notes: record.notes };
        const res = await fetch(`${API_BASE}/maintenance`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify(payload) });
        if (res.ok) {
            const body = await res.json();
            setMaintenance(prev => [...prev, body]);
            // update vehicle status locally
            updateVehicleStatus(record.vehicleId, 'In Shop');
            // add expense record
            const expRes = await fetch(`${API_BASE}/expenses`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify({ vehicle_id: record.vehicleId, trip_id: null, liters: 0, cost_per_liter: 0, total_cost: record.cost, date: record.date, type: 'Maintenance' }) });
            if (expRes.ok) {
                const expBody = await expRes.json();
                setExpenses(prev => [...prev, expBody]);
            }
        }
    };

    // Expense actions
    const addExpense = async (expense) => {
        const payload = { vehicle_id: expense.vehicleId, trip_id: expense.tripId || null, liters: expense.liters || 0, cost_per_liter: expense.costPerLiter || 0, total_cost: (expense.liters || 0) * (expense.costPerLiter || 0), date: expense.date, type: expense.type || 'Fuel' };
        const res = await fetch(`${API_BASE}/expenses`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(auth && auth.token ? { Authorization: `Bearer ${auth.token}` } : {}) }, body: JSON.stringify(payload) });
        if (res.ok) {
            const body = await res.json();
            setExpenses(prev => [...prev, body]);
        }
    };

    // Derived stats
    const stats = {
        activeFleet: vehicles.filter(v => v.status === 'On Trip').length,
        maintenanceAlerts: vehicles.filter(v => v.status === 'In Shop').length,
        available: vehicles.filter(v => v.status === 'Available').length,
        utilizationRate: Math.round((vehicles.filter(v => v.status === 'On Trip').length / vehicles.filter(v => v.status !== 'Retired').length) * 100),
        pendingCargo: trips.filter(t => t.status === 'Draft').length,
    };

    return (
        <AppContext.Provider value={{
            vehicles, drivers, trips, maintenance, expenses,
            stats,
            addVehicle, updateVehicleStatus, retireVehicle,
            addDriver, updateDriverStatus, isDriverEligible,
            addTrip, updateTripStatus,
            addMaintenance,
            addExpense,
            // auth
            auth, login, register, logout, authHeaders, userRole, hasRole,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
