import database from "../../../../infra/database";

async function status(req, res) {
  const result = await database.query("SELECT 1");
  console.log(result);
  res.status(200).json({ message: "Olá" });
}

export default status;
