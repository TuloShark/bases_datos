const express = require("express");
const mssql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
      await mssql.query`SELECT * FROM Users WHERE Email = ${email} AND PasswordHash = ${password}`;

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

// ... (Rutas y configuración adicional)

// Define una ruta predeterminada para la raíz del servidor
app.get("/", (req, res) => {
  // Redirige a la página de inicio de sesión
  res.redirect("/login");
});

// Sirve los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, "client/build")));

// Ruta para manejar todas las demás solicitudes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
