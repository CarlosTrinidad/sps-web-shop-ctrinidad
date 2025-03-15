import { NavigateFunction, useNavigate } from "react-router";
import React, { useState } from "react";

import ActionAreaCard from "../../components/Card/ActionAreaCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Product } from "../../services/FakeStore/fakeStore";
import Rating from "../../components/Rating/Rating";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/numeric";
import useShoppingCart from "../../store/cart";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const { addItemToCart } = useShoppingCart();
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const onAddToCart = () => {
    addItemToCart(product);
    handleOpenSnackbar();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleCloseSnackbar}
        message={t("product_added")}
      />
      <ActionAreaCard
        onClick={() => navigate(`/product/${product.id}`)}
        footer={
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddShoppingCartIcon />}
            fullWidth
            onClick={onAddToCart}
          >
            {t("add_to_cart")}
          </Button>
        }
      >
        <CardMedia
          sx={{
            objectFit: "contain",
          }}
          component="img"
          height={300}
          src={product.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Rating value={product.rating.rate} count={product.rating.count} />
          <Typography gutterBottom variant="h4" component="div">
            {formatCurrency(product.price, "USD", "en-US")}
          </Typography>
        </CardContent>
      </ActionAreaCard>
    </>
  );
};

export default ProductCard;
