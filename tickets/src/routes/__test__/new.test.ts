import request from 'supertest';
import { app } from '../../app';

const client = request(app);

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await client.post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {});

it('returns an error if an invalid title is provided', async () => {});

it('return an error if an invalid price is provided', async () => {});

it('creates a ticket with valid inputs', async () => {});
