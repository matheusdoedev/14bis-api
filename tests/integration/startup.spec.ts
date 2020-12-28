import request from 'supertest';

import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../utils/factories';

import { UserProps } from './../../src/interfaces/User';
import { StartupProps } from './../../src/interfaces/Startup';

describe('Startup create', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should create a new startup with valid credentials', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User');

    const response = await request(app).post('/startups').send({
      ID_USUARIO,
      NOME_FANTASIA: 'Pamonha Digital',
      RAZAO_SOCIAL: 'Vender pamonhas na internet com um preço camarada',
      CNPJ: '454-526226.5656565',
      DT_FUNDACAO: '29/09/2019',
      ID_SEGUIMENTO_PRINC: 2,
      ID_SEGUIMENTO_SECUN: 2,
      ID_MODELO_NEGOCIO: 2,
      ID_MOMENTO: 2,
      ID_PUBLICO_ALVO: 2,
      ID_TAMANHO_TIME: 2,
      ID_FATURAMENTO_ANUAL: 2,
      CAMINHO_FOTO: 2,
      WEBSITE: '',
      LINKEDIN: '',
      FACEBOOK: '',
      ENDERECO: 'Rua Ali Perto',
      UF: 'BA',
      CIDADE: 'Salvador',
    });

    expect(response.status).toBe(200);
  });

  it('should return error for creation with any invalid credentials', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User');

    const response = await request(app).post('/startups').send({
      ID_USUARIO,
      NOME_FANTASIA: null,
      RAZAO_SOCIAL: null,
      CNPJ: '454-526226.5656565',
      DT_FUNDACAO: '29/09/2019',
      ID_SEGUIMENTO_PRINC: 2,
      ID_SEGUIMENTO_SECUN: 2,
      ID_MODELO_NEGOCIO: 2,
      ID_MOMENTO: 2,
      ID_PUBLICO_ALVO: 2,
      ID_TAMANHO_TIME: 2,
      ID_FATURAMENTO_ANUAL: 2,
      CAMINHO_FOTO: 2,
      WEBSITE: '',
      LINKEDIN: '',
      FACEBOOK: '',
      ENDERECO: 'Rua Ali Perto',
      UF: 'BA',
      CIDADE: 'Salvador',
    });

    expect(response.status).toBe(400);
  });
});

describe('Get Startup data', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should return startup data', async () => {
    const ID_USUARIO = await factory
      .create<UserProps>('User')
      .then((r) => r.ID_USUARIO);

    const { ID_STARTUP } = await factory.create<StartupProps>('Startup', {
      ID_STARTUP: Number(ID_USUARIO),
    });

    const response = await request(app).get(`/startups/${ID_STARTUP}`);

    expect(response.status).toBe(200);
  });

  it('should return error for req with invalid id param', async () => {
    const response = await request(app).get(`/startups/x`);

    expect(response.status).toBe(400);
  });

  it("should return error if startup doesn't exists", async () => {
    const response = await request(app).get(`/startups/100`);

    expect(response.status).toBe(400);
  });
});

describe('Startup data update', () => {
  // truncating tables before each test
  beforeEach(async () => {
    await truncate();
  });

  it('should update startup data', async () => {
    const { ID_USUARIO } = await factory.create<UserProps>('User');
    const { ID_STARTUP } = await factory.create<StartupProps>('Startup', {
      ID_STARTUP: ID_USUARIO,
    });

    const response = await request(app).put(`/startups/${ID_STARTUP}`).send({
      NOME_FANTASIA: 'Maria da Pamonha',
    });

    expect(response.status).toBe(200);
  });
});
