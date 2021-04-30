import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';

const test = request(app);

it('responds with details about the current user', async () => {
  const cookie = await signup();

  const response = await test
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@example.com');
});

it('responds with null if not authenticated', async () => {
  const response = await test.get('/api/users/currentuser').send().expect(200);

  expect(response.body.currentUser).toEqual(null);
});
