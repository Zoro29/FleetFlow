import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index.js';

describe('Auth and protected routes', function () {
  const rand = Math.random().toString(36).slice(2, 8);
  const email = `test+${rand}@example.com`;
  const password = 'password1';
  let token;

  it('registers a user', async function () {
    const res = await request(app).post('/api/auth/register').send({ name: 'Test', email, password, role: 'Dispatcher' });
    expect(res.status).to.be.oneOf([201]);
    expect(res.body).to.have.property('id');
  });

  it('rejects weak password', async function () {
    const res = await request(app).post('/api/auth/register').send({ name: 'Nope', email: `x${email}`, password: 'short', role: 'Dispatcher' });
    expect(res.status).to.equal(400);
  });

  it('logs in', async function () {
    const res = await request(app).post('/api/auth/login').send({ email, password });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('allows creating a vehicle with token (Dispatcher)', async function () {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Truck', license_plate: `T-${rand}`, max_capacity: 1000 });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('rejects protected route without token', async function () {
    const res = await request(app).post('/api/vehicles').send({ name: 'Nope', license_plate: 'X-1', max_capacity: 10 });
    expect(res.status).to.equal(401);
  });
});
