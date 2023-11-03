const express = require("express");
const mssql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a SQL Server
const dbConfig = {
  user: "sa",
  password: "1234",
  server: "Wander",
  database: "ProyectoBD2",
};

// Endpoint para autenticar usuarios
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    await mssql.connect(dbConfig);

    const result =
      await mssql.query`SELECT * FROM usuarios WHERE email = ${email} AND password = ${password}`;

    if (result.recordset.length === 1) {
      // Usuario autenticado correctamente
      const user = result.recordset[0];
      res.json({ message: "Autenticación exitosa", user });
    } else {
      // Autenticación fallida
      res.status(401).json({ message: "Autenticación fallida" });
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(500).json({ message: "Error de autenticación" });
  } finally {
    mssql.close();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
