import database from "infra/database.js";
import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST TO /api/v1/migrations should return 200 and the list of applied migrations", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response1Body = await response1.json();
  expect(response1.status).toBe(201);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const response2Body = await response2.json();
  expect(response2.status).toBe(200);
  expect(response2Body.length).toBe(0);
});
