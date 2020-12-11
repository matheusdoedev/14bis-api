import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

describe('Startup create', () => {
  it('should create a new startup with valid credentials', async () => {
    const user = {
      NOME_COMPLETO: faker.name.findName(),
      EMAIL_LOGIN: faker.internet.email(),
      FONE_LOGIN: faker.phone.phoneNumber(),
      SENHA: '12345678',
      ID_PERFIL: 'EMPRE',
      SN_ATIVO: 'S',
    };

    const id = await request(app)
      .post('/users')
      .send(user)
      .then((r) => r.body.user_id);

    const response = await request(app).post('/startups').send({
      ID_USUARIO: id,
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
});
