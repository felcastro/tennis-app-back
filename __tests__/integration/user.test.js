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
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("latitude");
    expect(response.body).not.toHaveProperty("longitude");
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
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("latitude");
    expect(response.body).not.toHaveProperty("longitude");
  });

  it("should not authenticate with nonexistent email", async () => {
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

describe("User-Integration", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should get user data without private information when authenticated", async () => {
    const user = await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("placesSearchDistance");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("latitude");
    expect(response.body).not.toHaveProperty("longitude");
  });

  it("should get self data with private information when authenticated", async () => {
    const user = await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get("/api/users/self")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("placesSearchDistance");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("latitude");
    expect(response.body).not.toHaveProperty("longitude");
  });

  it("should update self data when authenticated", async () => {
    const user = await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const token = user.generateToken();

    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .set("Authorization", token)
      .send({
        name: "New Name",
      });

    const updatedUser = await User.findOne({ where: { id: user.id } });

    expect(response.status).toBe(200);
    expect(updatedUser.name).toBe("New Name");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("latitude");
    expect(response.body).not.toHaveProperty("longitude");
  });

  it("should not update user data when authenticated as another user", async () => {
    const user = await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    const anotherUser = await User.create({
      name: "Test User 2",
      birth: "1990-01-01",
      email: "testuser2@gmail.com",
      password: "password",
    });

    const token = user.generateToken();

    const response = await request(app)
      .put(`/api/users/${anotherUser.id}`)
      .set("Authorization", token)
      .send({
        name: "New Name",
      });

    const notUpdatedUser = await User.findOne({
      where: { id: anotherUser.id },
    });

    expect(response.status).toBe(403);
    expect(notUpdatedUser.name).toBe("Test User 2");
  });
});