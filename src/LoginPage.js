import React, { useState } from "react";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await authenticateUser(
        loginData.email,
        loginData.password
      );

      if (response === "Authentication Successful") {
        navigate("/products");
      } else if (response === "Authentication Failed") {
        alert("La autenticación falló. Verifica tus credenciales.");
      } else if (response === "User Not Found") {
        alert("Usuario no encontrado. Regístrate si no tienes una cuenta.");
      }
    } catch (error) {
      alert("Ocurrió un error durante la autenticación.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={8}>
        <Typography variant="h4" gutterBottom>
          Inicio de Sesión
        </Typography>

        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoFocus
            value={loginData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </div>

        <div>
          <Button
            fullWidth
            variant="text"
            color="inherit"
            onClick={() => navigate("/register")}
          >
            ¿No tienes una cuenta? Regístrate
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default LoginPage;
