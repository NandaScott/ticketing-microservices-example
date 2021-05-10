import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';
import mongoose from 'mongoose';

const client = request(app);

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await client.get(`/api/tickets/${id}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;
  const response = await client
    .post('/api/tickets')
    .set('Cookie', signup())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await client
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
