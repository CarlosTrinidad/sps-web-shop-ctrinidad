import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters/Filters";
import Grid from "@mui/material/Grid2";
import MainLayout from "../../components/Layout/MainLayout";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../Products/ProductCard";
import SortSelector from "./Filters/SortSelector";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFilter from "../../hooks/useFilter";
import useMediaQuery from "@mui/material/useMediaQuery";
import usePagination from "../../hooks/usePagination";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { products, categories, prices, loading } = useFetchProducts();
  const filtered = useFilter(products);
  const { currentPage, currentPageItems, totalPages, handlePageChange } =
    usePagination(filtered);

  const { t } = useTranslation();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [currentPage]); // Run effect when currentPage changes

  return (
    <>
      <MainLayout>
        <Box sx={{ display: "flex" }}>
          <Filters
            loading={loading}
            categories={categories}
            prices={prices}
            open={openFilters}
            setOpenFilters={setOpenFilters}
          />

          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Toolbar />
            <Grid
              container
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Box pb={3}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  {!matches && (
                    <Grid>
                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpenFilters(true)}
                        data-testid="test-filter-button-id"
                      >
                        <FilterAltIcon />
                      </Button>
                    </Grid>
                  )}
                  <Grid>
                    {currentPageItems.length > 0 && (
                      <Typography variant="subtitle1" color="textSecondary">
                        {currentPageItems.length === 1
                          ? t("product_single")
                          : t("products_plural", {
                              count: currentPageItems.length,
                            })}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box pb={3}>
                <SortSelector />
              </Box>
            </Grid>

            {loading ? (
              <Grid
                container
                spacing={1}
                rowSpacing={4}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  spacing={1}
                  rowSpacing={4}
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  {currentPageItems.length === 0 && t("no_products")}
                  {currentPageItems.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, md: 6 }}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                <Grid
                  container
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Box p={3}>
                    <Pagination
                      page={currentPage}
                      onChange={handlePageChange}
                      count={totalPages}
                      shape="rounded"
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export default Home;
