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
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para iniciar sesión
    console.log("Login data submitted: ", loginData);

    // Redireccionar a la página de productos.
    navigate("/products");
  };

  return (
    <Container maxWidth="xs">
      <Box my={8}>
        <Typography variant="h4" gutterBottom>
          Inicio de Sesión
        </Typography>

        <form onSubmit={handleSubmit}>
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

          <Box mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Iniciar Sesión
            </Button>
          </Box>

          {/* Botón para navegar a la página de registro */}
          <Box mt={2}>
            <Button
              fullWidth
              variant="text"
              color="inherit" // Asegúrate de que el color sea heredado.
              onClick={() => navigate("/register")}
            >
              ¿No tienes una cuenta? Regístrate
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
