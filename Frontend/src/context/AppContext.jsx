import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const initialVehicles = [
    { id: 'V001', name: 'Truck Alpha', model: 'Tata 407', plate: 'MH-12-AB-1234', type: 'Truck', capacity: 1000, odometer: 48520, status: 'Available' },
    { id: 'V002', name: 'Van-05', model: 'Force Traveller', plate: 'MH-01-BC-5678', type: 'Van', capacity: 500, odometer: 21300, status: 'On Trip' },
    { id: 'V003', name: 'Bike Runner', model: 'TVS Apache', plate: 'MH-04-CD-9012', type: 'Bike', capacity: 50, odometer: 8900, status: 'Available' },
    { id: 'V004', name: 'Van Bravo', model: 'Mahindra Supro', plate: 'MH-14-EF-3456', type: 'Van', capacity: 400, odometer: 33200, status: 'In Shop' },
    { id: 'V005', name: 'Heavy Hauler', model: 'Ashok Leyland', plate: 'MH-06-GH-7890', type: 'Truck', capacity: 2000, odometer: 91400, status: 'Available' },
];

const initialDrivers = [
    { id: 'D001', name: 'Alex Kumar', license: 'DL-MH-2019-001', category: 'Van', expiry: '2026-08-15', status: 'On Duty', trips: 42, safetyScore: 94 },
    { id: 'D002', name: 'Priya Sharma', license: 'DL-MH-2020-002', category: 'Truck', expiry: '2025-12-01', status: 'On Duty', trips: 87, safetyScore: 98 },
    { id: 'D003', name: 'Raj Mehta', license: 'DL-MH-2018-003', category: 'Bike', expiry: '2024-05-10', status: 'Suspended', trips: 23, safetyScore: 71 },
    { id: 'D004', name: 'Sunita Patel', license: 'DL-MH-2021-004', category: 'Van', expiry: '2027-03-22', status: 'Off Duty', trips: 61, safetyScore: 91 },
    { id: 'D005', name: 'Marco Fernandes', license: 'DL-MH-2022-005', category: 'Truck', expiry: '2028-11-30', status: 'On Duty', trips: 15, safetyScore: 88 },
];

const initialTrips = [
    { id: 'T001', vehicleId: 'V002', driverId: 'D001', origin: 'Mumbai', destination: 'Pune', cargoWeight: 450, status: 'Dispatched', date: '2026-02-21', notes: 'Electronics shipment' },
    { id: 'T002', vehicleId: 'V001', driverId: 'D002', origin: 'Nagpur', destination: 'Aurangabad', cargoWeight: 900, status: 'Completed', date: '2026-02-18', notes: 'Construction material' },
    { id: 'T003', vehicleId: 'V003', driverId: 'D003', origin: 'Thane', destination: 'Navi Mumbai', cargoWeight: 30, status: 'Cancelled', date: '2026-02-17', notes: 'Documents' },
    { id: 'T004', vehicleId: 'V005', driverId: 'D005', origin: 'Nashik', destination: 'Mumbai', cargoWeight: 1800, status: 'Draft', date: '2026-02-22', notes: 'Agricultural produce' },
];

const initialMaintenance = [
    { id: 'M001', vehicleId: 'V004', serviceType: 'Engine Overhaul', date: '2026-02-19', cost: 18500, notes: 'Full engine rebuild' },
    { id: 'M002', vehicleId: 'V001', serviceType: 'Oil Change', date: '2026-02-15', cost: 800, notes: 'Routine 5000km service' },
];

const initialExpenses = [
    { id: 'E001', vehicleId: 'V002', tripId: 'T001', liters: 42, costPerLiter: 94.5, totalCost: 3969, date: '2026-02-21', type: 'Fuel' },
    { id: 'E002', vehicleId: 'V001', tripId: 'T002', liters: 80, costPerLiter: 95.2, totalCost: 7616, date: '2026-02-18', type: 'Fuel' },
    { id: 'E003', vehicleId: 'V004', tripId: null, liters: 0, costPerLiter: 0, totalCost: 18500, date: '2026-02-19', type: 'Maintenance' },
];

export const AppProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [drivers, setDrivers] = useState(initialDrivers);
    const [trips, setTrips] = useState(initialTrips);
    const [maintenance, setMaintenance] = useState(initialMaintenance);
    const [expenses, setExpenses] = useState(initialExpenses);

    // Vehicle actions
    const addVehicle = (vehicle) => {
        const id = `V${String(vehicles.length + 1).padStart(3, '0')}`;
        setVehicles(prev => [...prev, { ...vehicle, id, status: 'Available' }]);
    };

    const updateVehicleStatus = (vehicleId, status) => {
        setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status } : v));
    };

    const retireVehicle = (vehicleId) => {
        updateVehicleStatus(vehicleId, 'Retired');
    };

    // Driver actions
    const addDriver = (driver) => {
        const id = `D${String(drivers.length + 1).padStart(3, '0')}`;
        setDrivers(prev => [...prev, { ...driver, id, trips: 0, safetyScore: 100 }]);
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
    const addTrip = (trip) => {
        const vehicle = vehicles.find(v => v.id === trip.vehicleId);
        if (!vehicle) return { success: false, error: 'Vehicle not found' };
        if (trip.cargoWeight > vehicle.capacity) {
            return { success: false, error: `Cargo weight ${trip.cargoWeight}kg exceeds vehicle capacity ${vehicle.capacity}kg.` };
        }
        const driver = drivers.find(d => d.id === trip.driverId);
        if (driver && !isDriverEligible(driver)) {
            return { success: false, error: 'Driver license is expired or driver is suspended.' };
        }
        const id = `T${String(trips.length + 1).padStart(3, '0')}`;
        setTrips(prev => [...prev, { ...trip, id, status: 'Draft' }]);
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
    const addMaintenance = (record) => {
        const id = `M${String(maintenance.length + 1).padStart(3, '0')}`;
        setMaintenance(prev => [...prev, { ...record, id }]);
        // Auto-set vehicle to In Shop
        updateVehicleStatus(record.vehicleId, 'In Shop');
        // Add to expenses
        const expId = `E${String(expenses.length + 1).padStart(3, '0')}`;
        setExpenses(prev => [...prev, { id: expId, vehicleId: record.vehicleId, tripId: null, liters: 0, costPerLiter: 0, totalCost: record.cost, date: record.date, type: 'Maintenance' }]);
    };

    // Expense actions
    const addExpense = (expense) => {
        const id = `E${String(expenses.length + 1).padStart(3, '0')}`;
        const totalCost = expense.liters * expense.costPerLiter;
        setExpenses(prev => [...prev, { ...expense, id, totalCost, type: 'Fuel' }]);
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
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
