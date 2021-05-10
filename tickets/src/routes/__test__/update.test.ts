import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';

const client = request(app);

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await client
    .put(`/api/tickets/${id}`)
    .set('Cookie', signup())
    .send({
      title: 'asdfasdf',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await client
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdfasdf',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await client
    .post('/api/tickets')
    .set('Cookie', signup())
    .send({
      title: 'asdfasdf',
      price: 20,
    });

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signup())
    .send({
      title: 'asdfasdlfj',
      price: 1000,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signup();
  const response = await client
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdfasdf',
      price: 20,
    });

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 20,
    })
    .expect(400);

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdfasdfasdf',
      price: -20,
    })
    .expect(400);

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdfasdfasdf',
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = signup();
  const response = await client
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdfasdf',
      price: 20,
    });

  await client
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'newtitle',
      price: 100,
    })
    .expect(200);

  const ticketResponse = await client
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('newtitle');
  expect(ticketResponse.body.price).toEqual(100);
});
