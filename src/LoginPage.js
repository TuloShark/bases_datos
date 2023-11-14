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

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación si es necesario
    // Por ahora, simplemente redirigiremos al usuario a la página de productos
    navigate("/products");
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
