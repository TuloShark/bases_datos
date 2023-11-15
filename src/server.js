const mssql = require("mssql");

const dbConfig = {
  user: "sa",
  password: "1234",
  server: "Wander",
  database: "ProyectoBD2",
  options: {
    trustServerCertificate: true,
  },
};

async function establishDatabaseConnection() {
  try {
    console.log("Intentando conectar a la base de datos...");
    await mssql.connect(dbConfig);
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
}

// Llamamos a la función para establecer la conexión al iniciar el servidor
establishDatabaseConnection();

module.exports = {
  mssql, // Exportamos el objeto mssql para que pueda ser utilizado en otros archivos
};
