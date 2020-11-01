const app = require("../../src/app");
const request = require("supertest");
const truncate = require("../utils/truncate");

const { User } = require("../../src/models");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate when creating account with valid credentials", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.header).toHaveProperty("authorization");
  });

  it("should authenticate with valid credentials", async () => {
    await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const response = await request(app).post("/api/users/signIn").send({
      email: "testuser@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.header).toHaveProperty("authorization");
  });

  it("should not authenticate with invalid email", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: "testuser@gmail.com",
      password: "password",
    });

    expect(response.status).toBe(401);
  });

  it("should not authenticate with invalid password", async () => {
    await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const response = await request(app).post("/api/users/signIn").send({
      email: "testuser@gmail.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });
});
