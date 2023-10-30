import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí vendría la lógica para registrarse
    // Por simplicidad, asumimos que el registro es exitoso y navegamos a la página de inicio.
    // navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registrar Usuario
      </Typography>
      <Box mt={3}>
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            name="email"
            value={userData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            variant="outlined"
            name="password"
            value={userData.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Confirmar Contraseña"
            variant="outlined"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              variant="text"
              color="default"
              fullWidth
              onClick={() => navigate("/login")}
            >
              ¿Ya tienes cuenta? Iniciar Sesión
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
