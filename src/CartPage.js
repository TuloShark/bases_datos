import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";

const CartPage = ({ cartItems, removeFromCart }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar src={item.imageUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.name} - x${item.quantity}`} // Mostrar la cantidad
              secondary={`Descripción: ${item.description}`}
            />
            <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CartPage;
