import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

describe('User create', () => {
  // truncating tables before each test
  it('should create a user with valid credentials', async () => {
    const response = await request(app).post('/users').send({
      NOME_COMPLETO: faker.name.findName(),
      EMAIL_LOGIN: faker.internet.email(),
      // encrypting user password before save in database with bcryptjs
      SENHA: '12345678',
      FONE_LOGIN: faker.phone.phoneNumber(),
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    });

    expect(response.status).toBe(200);
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

  it('should return error in catch block if anything is wrong', async () => {
    const response = await request(app).post('/users').send({
      NOME_COMPLETO: faker.name.findName(),
      // encrypting user password before save in database with bcryptjs
      SENHA: '123456',
      FONE_LOGIN: faker.phone.phoneNumber(),
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    });

    expect(response.status).toBe(400);
  });
});
