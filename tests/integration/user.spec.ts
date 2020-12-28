import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../utils/factories';

import { UserProps } from './../../src/interfaces/User';

describe('User create', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should return token with valid credentials', async () => {
    const response = await request(app).post('/users').send({
      NOME_COMPLETO: faker.name.findName(),
      EMAIL_LOGIN: faker.internet.email(),
      // encrypting user password before save in database with bcryptjs
      SENHA: '12345678',
      FONE_LOGIN: faker.phone.phoneNumber(),
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('should return error with invalid password', async () => {
    const response = await request(app).post('/users').send({
      NOME_COMPLETO: faker.name.findName(),
      EMAIL_LOGIN: faker.internet.email(),
      // encrypting user password before save in database with bcryptjs
      SENHA: '1234',
      FONE_LOGIN: faker.phone.phoneNumber(),
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    });

    expect(response.status).toBe(400);
  });
});

describe('Get User data', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should return user data', async () => {
    const ID_USUARIO = await factory
      .create<UserProps>('User')
      .then((r) => r.ID_USUARIO);

    const response = await request(app).get(`/users/${ID_USUARIO}`);

    expect(response.status).toBe(200);
  });

  it("should return error if user doesn't exists", async () => {
    const response = await request(app).get(`/users/10000000`);

    expect(response.status).toBe(400);
  });
});

describe('User data update', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should update user data', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User');

    const response = await request(app).put(`/users/${ID_USUARIO}`).send({
      ID_PERFIL: 'MENTO',
    });

    expect(response.status).toBe(200);
  });
});
