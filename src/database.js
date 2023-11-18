import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Employees Administration</Typography>
      <List>
        {employees.map(employee => (
          <ListItem key={employee.empleadoId}>
            <ListItemText primary={`Employee ID: ${employee.empleadoId}, Role ID: ${employee.rolId}, Salary: ${employee.salario}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Employees;
