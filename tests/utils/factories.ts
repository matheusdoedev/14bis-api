import faker from 'faker';
import factory from 'factory-girl';
// models
import User from '../../src/app/models/User';
import Startup from '../../src/app/models/Startup';
import Mentor from '../../src/app/models/Mentor';
// interfaces
import { UserProps } from './../../src/interfaces/User';
import { StartupProps } from './../../src/interfaces/Startup';

factory.define<UserProps>('User', User, {
  NOME_COMPLETO: faker.name.findName(),
  EMAIL_LOGIN: faker.internet.email(),
  // encrypting user password before save in database with bcryptjs
  SENHA: '123456',
  FONE_LOGIN: faker.phone.phoneNumber(),
  ID_PERFIL: 'EMPRE',
  SN_ATIVO: 'S',
});

factory.define<StartupProps>('Startup', Startup, {
  ID_STARTUP: 1,
  NOME_FANTASIA: faker.company.companyName(),
  RAZAO_SOCIAL: 'Vender pamonhas na internet com um preço camarada',
  CNPJ: '454-526226.5656565',
  DT_FUNDACAO: faker.date.past(),
  ID_SEGUIMENTO_PRINC: 2,
  ID_SEGUIMENTO_SECUN: 2,
  ID_MODELO_NEGOCIO: 2,
  ID_MOMENTO: 2,
  ID_PUBLICO_ALVO: 2,
  ID_TAMANHO_TIME: 2,
  ID_FATURAMENTO_ANUAL: 2,
  CAMINHO_FOTO: '',
  WEBSITE: faker.internet.url(),
  LINKEDIN: '',
  FACEBOOK: '',
  ENDERECO: faker.address.streetName(),
  UF: faker.address.state(),
  CIDADE: faker.address.city(),
});

export default factory;
