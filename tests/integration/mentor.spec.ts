import request from 'supertest';

import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../utils/factories';

import { UserProps } from '../../src/interfaces/User';
import { MentorProps } from '../../src/interfaces/Mentor';

describe('Mentor create', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should create a new mentor with valid credentials', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User', {
      ID_PERFIL: 'MENTO',
    });

    const response = await request(app).post('/mentor').send({
      ID_MENTOR: ID_USUARIO,
      ID_PERFIL: 'MENTO',
      CPF: '888.999.555-11',
      DT_NASCIMENTO: '29/09/2019',
      SEXO: 'F',
      CEP: '44555999',
      ENDERECO: 'Rua Ali Perto',
      UF: 'BA',
      CIDADE: 'Salvador',
      FONE_FIXO: '77999995555',
      FONE_CELULAR: '71555556666',
      LINKEDIN: '',
      ESCOLARIDADE: 'Superior completo',
      ID_AREA_ATUACAO: 2,
      CURRICULO_RESUMIDO: '',
      CAMINHO_FOTO: '',
    });

    expect(response.status).toBe(200);
  });

  it('should return error for creation with any invalid credentials', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User', {
      ID_PERFIL: 'MENTO',
    });

    const response = await request(app).post('/mentor').send({
      ID_MENTOR: ID_USUARIO,
      ID_PERFIL: 'MENTO',
      CPF: null,
      DT_NASCIMENTO: null,
      SEXO: 'F',
      CEP: '44555999',
      ENDERECO: 'Rua Ali Perto',
      UF: 'BA',
      CIDADE: 'Salvador',
      FONE_FIXO: '77999995555',
      FONE_CELULAR: '71555556666',
      LINKEDIN: '',
      ESCOLARIDADE: 'Superior completo',
      ID_AREA_ATUACAO: 2,
      CURRICULO_RESUMIDO: '',
      CAMINHO_FOTO: '',
    });

    expect(response.status).toBe(400);
  });

  it('should return error for update mentor data with invalid ID_PERFIL', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User');

    const response = await request(app).post(`/mentor`).send({
      ID_PERFIL: 'EMPRE',
      ID_MENTOR: ID_USUARIO,
      CPF: null,
      DT_NASCIMENTO: null,
      SEXO: 'F',
      CEP: '44555999',
      ENDERECO: 'Rua Ali Perto',
      UF: 'BA',
      CIDADE: 'Salvador',
      FONE_FIXO: '77999995555',
      FONE_CELULAR: '71555556666',
      LINKEDIN: '',
      ESCOLARIDADE: 'Superior completo',
      ID_AREA_ATUACAO: 2,
      CURRICULO_RESUMIDO: '',
      CAMINHO_FOTO: '',
    });

    expect(response.status).toBe(400);
  });
});

describe('Get Mentor data', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should return mentor data', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User', {
      ID_PERFIL: 'MENTO',
    });
    await factory.create<MentorProps>('Mentor', {
      ID_MENTOR: ID_USUARIO,
    });

    const response = await request(app).get(`/mentor/${ID_USUARIO}`);

    expect(response.status).toBe(200);
  });

  it('should return error for req with invalid id param', async () => {
    const response = await request(app).get(`/mentor/x`);

    expect(response.status).toBe(400);
  });

  it("should return error if Mentor doesn't exists", async () => {
    const response = await request(app).get(`/mentor/100`);

    expect(response.status).toBe(400);
  });
});

describe('Mentor data update', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should update mentor data', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User', {
      ID_PERFIL: 'MENTO',
    });

    await factory.create<MentorProps>('Mentor', {
      ID_MENTOR: ID_USUARIO,
    });

    const response = await request(app).put(`/mentor/${ID_USUARIO}`).send({
      ID_PERFIL: 'MENTO',
      ID_AREA_ATUACAO: 3,
      CURRICULO_RESUMIDO: 'AHDUIASHDOISD',
    });

    expect(response.status).toBe(200);
  });
});
