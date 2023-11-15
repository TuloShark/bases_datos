const express = require("express");
const { mssql } = require("./server"); // Importamos el objeto mssql del servidor
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Intentando autenticar...");

    const result = await mssql
      .request()
      .input("Email", mssql.NVarChar, email)
      .input("Password", mssql.NVarChar, password)
      .execute("sp_AuthenticateUser");

    console.log("Resultado de la autenticación:", result);

    switch (result.returnValue) {
      case 0:
        res.json({ message: "Autenticación exitosa" });
        break;
      case 1:
        res.status(401).json({ message: "Autenticación fallida" });
        break;
      case 2:
        res.status(404).json({ message: "Usuario no encontrado" });
        break;
      default:
        res.status(500).json({ message: "Error de autenticación" });
    }
  } catch (error) {
    console.error("Error de autenticación:", error);
    res
      .status(500)
      .json({ message: "Error de autenticación", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de autenticación en ejecución en el puerto ${PORT}`);
});
