import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await orquestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
