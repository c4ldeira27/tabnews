import database from "infra/database.js";
import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("GET TO /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(responseBody.length).toBeGreaterThan(0);
});
