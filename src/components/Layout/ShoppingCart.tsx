import Button from "@mui/material/Button";
import Drawer from "../Drawer/Drawer";
import Grid from "@mui/material/Grid2";
import HorizontalCard from "../../pages/Products/HorizontalCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/numeric";
import useShoppingCart from "../../store/cart";
import { useTranslation } from "react-i18next";

const ShoppingCart = () => {
  const { t } = useTranslation();
  const { open, items, hideCart, getTotal } = useShoppingCart();

  return (
    <>
      <Drawer
        open={open}
        onClose={() => hideCart()}
        title={
          <Grid
            container
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Grid>
              <ShoppingBagIcon fontSize="large" />
            </Grid>
            <Grid>
              <Typography variant="h6">
                {t("products_plural", { count: items.reduce((total, item) => total + item.quantity, 0) })}
              </Typography>
            </Grid>
          </Grid>
        }
        body={
          <>
            {items.map((item) => (
              <HorizontalCard key={item.product.id} cartItem={item} />
            ))}
          </>
        }
        footer={
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Typography variant="h5">{t("total")} </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">
                {formatCurrency(getTotal(), "USD", "en-US")}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PaymentsIcon />}
                fullWidth
              >
                {t("checkout")}
              </Button>
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default ShoppingCart;
