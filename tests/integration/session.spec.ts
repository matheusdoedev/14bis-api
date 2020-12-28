import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../utils/factories';

import { UserProps } from './../../src/interfaces/User';

describe('Session authentication', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate user with valid credentials', async () => {
    await factory
      .create<UserProps>('User')
      .then(async ({ EMAIL_LOGIN, SENHA }) => {
        const response = await request(app).post('/users/authentication').send({
          EMAIL_LOGIN,
          SENHA,
        });

        expect(response.body).toHaveProperty('token');
      })
      .catch((err) => console.log(err));
  });

  it('should return error with invalid email', async () => {
    const response = await request(app).post('/users/authentication').send({
      EMAIL_LOGIN: faker.internet.email(),
      SENHA: '12345678',
    });

    expect(response.status).toBe(400);
  });

  it('should return error with invalid password', async () => {
    const { EMAIL_LOGIN } = await factory.create<UserProps>('User');

    const response = await request(app).post('/users/authentication').send({
      EMAIL_LOGIN,
      SENHA: '12345',
    });

    expect(response.status).toBe(400);
  });
});
