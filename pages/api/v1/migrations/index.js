import migrationRunner from "node-pg-migrate";
import { join } from "path";
import database from "infra/database.js";

export default async function migrations(req, res) {
  let dbClient;
  if (req.method !== "GET" || req.method !== "POST")
    return res.status(405).end("Bad Method Request");

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (req.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);

      return res.status(200).json(pendingMigrations);
    }

    if (req.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      if (migratedMigrations.length > 0)
        return res.status(201).json(migratedMigrations);

      return res.status(200).json(migratedMigrations);
    }
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await dbClient.end();
  }
}
