import * as React from "react";

import { NavigateFunction, useNavigate } from "react-router";
import useShoppingCart, { CartProduct } from "../../store/cart";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/numeric";

interface HorizontalCardProps {
  cartItem: CartProduct;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ cartItem }) => {
  const navigate: NavigateFunction = useNavigate();

  const { increaseQuantity, decreaseQuantity, hideCart } = useShoppingCart();

  const { product, quantity } = cartItem;
  return (
    <Card sx={{ display: "flex", my: 2 }} elevation={0}>
      <CardMedia
        component="img"
        sx={{ width: 120, p: 3, cursor: "pointer" }}
        image={product.image}
        alt={product.title}
        onClick={() => {
          hideCart();
          navigate(`/product/${product.id}`);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <Typography component="div" variant="subtitle2">
                {product.title}
              </Typography>
            </Grid>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {formatCurrency(product.price, "USD", "en-US")} x {quantity}
            </Typography>
          </Grid>
          <Box sx={{ alignItems: "center", pt: 2 }}>
            <ButtonGroup fullWidth>
              <Button
                aria-label="reduce"
                color={quantity > 1 ? "secondary" : "error"}
                onClick={() => {
                  decreaseQuantity(product.id);
                }}
              >
                {quantity > 1 ? (
                  <RemoveIcon fontSize="small" />
                ) : (
                  <DeleteIcon fontSize="small" />
                )}
              </Button>
              <Button
                aria-label="increase"
                color="secondary"
                onClick={() => {
                  increaseQuantity(product.id);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default HorizontalCard;
