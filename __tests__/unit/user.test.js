const app = require("../../src/app");
const bcrypt = require("bcrypt");
const truncate = require("../utils/truncate");

const { User } = require("../../src/models");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Test User",
      birth: "1990-01-01",
      email: "testuser@gmail.com",
      password: "password",
    });

    expect(await user.checkPassword("password")).toBe(true);
  });
});
