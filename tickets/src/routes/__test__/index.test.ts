import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';

const client = request(app);

const createTicket = () => {
  return client.post('/api/tickets').set('Cookie', signup()).send({
    title: 'asdfasdf',
    price: 20,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await client.get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
