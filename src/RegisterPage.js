import React, { useState } from "react";
import { Container, Typography, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para el registro, como enviar los datos al servidor
    console.log("User data submitted: ", userData);

    // Una vez se complete el registro, redirecciona a la página de productos
    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Box my={8}>
        <Typography variant="h4" gutterBottom>
          Registro
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoFocus
            value={userData.username}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            value={userData.email}
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
            value={userData.password}
            onChange={handleInputChange}
          />

          <Box mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Registrarse
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
