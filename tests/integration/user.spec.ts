import request from "supertest";

import app from "../../src/app";

describe("User create", () => {
  // truncating tables before each test
  it("should create a user with valid credentials", async () => {
    const response = await request(app).post("/users").send({
      NOME_COMPLETO: "Carolina",
      EMAIL_LOGIN: "carolina@gmail.com",
      // encrypting user password before save in database with bcryptjs
      SENHA: "12345678",
      FONE_LOGIN: "7199999999",
      ID_PERFIL: "EMPRE",
      SN_ATIVO: "S",
    });

    expect(response.status).toBe(200);
  });

  it("should return token with valid credentials", async () => {
    const response = await request(app).post("/users").send({
      NOME_COMPLETO: "Emanuele",
      EMAIL_LOGIN: "emanuele@gmail.com",
      // encrypting user password before save in database with bcryptjs
      SENHA: "12345678",
      FONE_LOGIN: "7199999999",
      ID_PERFIL: "EMPRE",
      SN_ATIVO: "S",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should return error with invalid password", async () => {
    const response = await request(app).post("/users").send({
      NOME_COMPLETO: "Lucas",
      EMAIL_LOGIN: "lucas@gmail.com",
      // encrypting user password before save in database with bcryptjs
      SENHA: "1234",
      FONE_LOGIN: "7199999999",
      ID_PERFIL: "EMPRE",
      SN_ATIVO: "S",
    });

    expect(response.status).toBe(400);
  });

  it("should return error in catch block if anything is wrong", async () => {
    const response = await request(app).post("/users").send({
      NOME_COMPLETO: "Marilia",
      // encrypting user password before save in database with bcryptjs
      SENHA: "123456",
      FONE_LOGIN: "7199999999",
      ID_PERFIL: "EMPRE",
      SN_ATIVO: "S",
    });

    expect(response.status).toBe(400);
  });
});
