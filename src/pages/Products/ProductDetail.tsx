import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import MainLayout from "../../components/Layout/MainLayout";
import ProductCard from "../Products/ProductCard";
import Rating from "../../components/Rating/Rating";
import ResourceNotFound from "../Errors/ResourceNotFound";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/numeric";
import useFetchProduct from "../../hooks/useFetchProduct";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFilter from "../../hooks/useFilter";
import usePagination from "../../hooks/usePagination";
import { useParams } from "react-router";
import useShoppingCart from "../../store/cart";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Specify the type of the parameter
  const { t } = useTranslation();

  const { product, loading } = useFetchProduct(Number(id));
  const featuredProducts = useFetchProducts();
  const filteredFeaturedProducts = useFilter(
    featuredProducts.products,
    product?.category ? [product?.category] : [],
    Number(id)
  );
  const { currentPageItems } = usePagination(filteredFeaturedProducts, 4);

  const { addItemToCart } = useShoppingCart();
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const onAddToCart = () => {
    if (product) {
      addItemToCart(product);
      handleOpenSnackbar();
    }
  };

  if (!product && !loading) {
    return <ResourceNotFound />;
  }

  return (
    <>
      <Snackbar
        color="secondary"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleCloseSnackbar}
        message={t("product_added")}
      />
      <MainLayout>
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
            <Toolbar />
            <Grid container>
              <Grid
                container
                size={{ xs: 12, md: 5 }}
                sx={{ justifyContent: "center" }}
              >
                <Grid>
                  <Box p={1}>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={380}
                      />
                    ) : (
                      <div
                        style={{
                          maxWidth: "100%",
                          margin: 30,
                        }}
                      >
                        <img
                          src={product?.image}
                          alt={product?.title}
                          height={500}
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                size={{ xs: 12, md: 7 }}
                spacing={2}
              >
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h2">
                    {loading ? <Skeleton animation="wave" /> : product?.title}
                  </Typography>
                </Grid>
                <Grid>
                  {loading ? (
                    <Skeleton animation="wave" />
                  ) : (
                    <Rating
                      value={product?.rating.rate || 0}
                      count={product?.rating.count}
                    />
                  )}
                </Grid>
                <Grid>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    gutterBottom
                    fontWeight={400}
                  >
                    {loading ? (
                      <Skeleton animation="wave" />
                    ) : (
                      product?.description
                    )}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="h3" fontWeight={700}>
                    {loading ? (
                      <Skeleton animation="wave" />
                    ) : (
                      formatCurrency(product?.price || 0, "USD", "en-US")
                    )}
                  </Typography>
                </Grid>
                <Grid>
                  {product && (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddShoppingCartIcon />}
                      fullWidth
                      onClick={onAddToCart}
                    >
                      {t("add_to_cart")}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Box pt={10}>
              {featuredProducts.loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Grid container spacing={4}>
                  <Grid size={12}>
                    <Typography variant="h5" fontWeight={500}>
                      {t("feature_products")}
                    </Typography>
                  </Grid>
                  {currentPageItems.map((product) => (
                    <Grid size={{ xs: 12, md: 3 }}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default ProductDetail;
