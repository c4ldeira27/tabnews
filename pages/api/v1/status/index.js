import database from "infra/database";
import { InternalServerError } from "infra/errors";

async function status(req, res) {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const maxNumberOfConnectionsResult = await database.query(
      "SHOW max_connections",
    );
    const maxNumberOfConnectionsValue =
      maxNumberOfConnectionsResult.rows[0].max_connections;

    const databaseName = process.env.POSTGRES_DB;
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT COUNT(*) FROM pg_stat_activity where datname = $1;",
      values: [databaseName],
    });
    const databaseOpenedConnectionsValue = parseInt(
      databaseOpenedConnectionsResult.rows[0].count,
    );

    res.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(maxNumberOfConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });
    console.log(publicErrorObject);
    res.status(500).json(publicErrorObject);
  }
}

export default status;
