import request from 'supertest';
import * as faker from 'faker';

import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../utils/factories';

import { UserProps } from './../../src/interfaces/User';

describe('Check User Activity middleware', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return error for inactive user', async () => {
    const ID_USUARIO = await factory
      .create<UserProps>('User', {
        SN_ATIVO: 'N',
      })
      .then((r) => r.ID_USUARIO);

    const response = await request(app).get(`/users/${ID_USUARIO}`);

    expect(response.status).toBe(400);
  });
});
