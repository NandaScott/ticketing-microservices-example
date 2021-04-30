import request from 'supertest';
import { app } from '../../app';

const test = request(app);

it('returns a 201 on successful signup', async () => {
  test
    .post('/api/user/signup')
    .send({ email: 'test@example.com', password: 'password' })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  test
    .post('/api/user/signup')
    .send({ email: 'notanemail', password: 'password' })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  test
    .post('/api/user/signup')
    .send({ email: 'test@example.com', password: 'p' })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  test.post('/api/user/signup').send({ email: 'test@example.com' }).expect(400);
  test.post('/api/user/signup').send({ password: 'password' }).expect(400);
});

it('disallows duplicate emails', async () => {
  test
    .post('/api/users/signup')
    .send({
      email: 'unique@example.com',
      password: 'password',
    })
    .expect(201);

  test
    .post('/api/users/signup')
    .send({
      email: 'unique@example.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await test
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
