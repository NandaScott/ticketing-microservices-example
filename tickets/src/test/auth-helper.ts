import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signup = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id: id,
    email: 'test@example.com',
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`express:sess=${base64}`]; // An array makes supertest happy
};
