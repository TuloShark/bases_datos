import React, { useState, useEffect } from 'react';
import {
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Grid
  } from "@mui/material";
  


function CustomerService() {

  const cellStyles = {
    minWidth: 150, // Adjust the minimum width as needed
  };


  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/consultas')
      .then(res => res.json())
      .then(data => {
        setConsultas(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (

    

    <Container>
      <Typography variant="h4">Customer Service</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="consultas table">
        <TableHead>
          <TableRow>
            <TableCell style={cellStyles}>Nombre del cliente</TableCell>
            <TableCell style={cellStyles}>Nombre del empleado encargado</TableCell>
            <TableCell style={cellStyles}>Fecha y hora</TableCell>
            <TableCell style={cellStyles}>Motivo</TableCell>
            <TableCell style={cellStyles}>Detalles</TableCell>
            <TableCell style={cellStyles}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((d, i) => (
            <TableRow key={i}>
              <TableCell style={cellStyles}>{d.clientenombre}</TableCell>
              <TableCell style={cellStyles}>{d.empleadonombre}</TableCell>
              <TableCell style={cellStyles}>{d.fechahora}</TableCell>
              <TableCell style={cellStyles}>{d.tipoconsulta}</TableCell>
              <TableCell style={cellStyles}>{d.detalle}</TableCell>
              <TableCell style={cellStyles}>{d.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Container>
  );
}

export default CustomerService;
