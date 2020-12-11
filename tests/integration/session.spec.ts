import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

describe('Session authentication', () => {
  it('should authenticate user with valid credentials', async () => {
    const user = {
      NOME_COMPLETO: faker.name.findName(),
      EMAIL_LOGIN: faker.internet.email(),
      FONE_LOGIN: faker.phone.phoneNumber(),
      SENHA: '12345678',
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    };

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users/authentication').send({
      EMAIL_LOGIN: user.EMAIL_LOGIN,
      SENHA: user.SENHA,
    });

    expect(response.status).toBe(200);
  });

  it('should return error with invalid email', async () => {
    const response = await request(app).post('/users/authentication').send({
      EMAIL_LOGIN: faker.internet.email(),
      SENHA: '12345678',
    });

    expect(response.status).toBe(400);
  });

  it('should return error with invalid password', async () => {
    const response = await request(app).post('/users/authentication').send({
      EMAIL_LOGIN: faker.internet.email(),
      SENHA: '12345',
    });

    expect(response.status).toBe(400);
  });
});
