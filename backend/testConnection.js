require('dotenv').config();
const oracledb = require("oracledb");

async function testConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    console.log("Conexiune reusita!");
    await connection.close();
  } catch (err) {
    console.error("Eroare de conexiune:", err);
  }
}

testConnection();