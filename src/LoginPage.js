import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Autenticación exitosa, redirigir a la página de productos
        navigate("/products");
      } else {
        // Autenticación fallida, mostrar mensaje de error
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      setErrorMessage("Ocurrió un error durante la autenticación.");
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

        {errorMessage && (
          <div style={{ marginTop: "1rem", color: "red" }}>{errorMessage}</div>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
