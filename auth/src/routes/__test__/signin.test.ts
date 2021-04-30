import request from 'supertest';
import { app } from '../../app';

const test = request(app);

it('returns a 400 with an invalid email', async () => {
  test
    .post('/api/user/signin')
    .send({ email: 'notanemail', password: 'password' })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  test
    .post('/api/user/signin')
    .send({ email: 'test@example.com', password: 'p' })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  test.post('/api/user/signin').send({ email: 'test@example.com' }).expect(400);
  test.post('/api/user/signin').send({ password: 'password' }).expect(400);
});

it('fails when an email that does not exist is supplied', async () => {
  test
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  test
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
    .expect(201);

  test
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'notcorrect',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await test
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
    .expect(201);

  const response = await test
    .post('/api/users/signin')
    .send({
      email: 'test@example.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
