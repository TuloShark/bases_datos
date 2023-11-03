const sql = require("mssql");

const config = {
  user: "sa",
  password: "1234",
  server: "Wander", // Puede ser una dirección IP o un nombre de servidor
  database: "ProyectoBD2",
};

const pool = new sql.ConnectionPool(config);

async function authenticateUser(email, password) {
  try {
    await pool.connect();
    const request = pool.request();

    // Configura los parámetros del procedimiento almacenado
    request.input("Email", sql.NVarChar(255), email);
    request.input("Password", sql.NVarChar(255), password);

    // Ejecuta el procedimiento almacenado
    const result = await request.execute("sp_AuthenticateUser");

    // Verifica el resultado del procedimiento almacenado
    if (result.recordset.length > 0) {
      // Autenticación exitosa, devuelve los datos del usuario
      return result.recordset[0];
    } else {
      // Autenticación fallida
      return null;
    }
  } catch (error) {
    console.error("Error de autenticación:", error.message);
    throw error;
  }
}

module.exports = {
  authenticateUser,
};
