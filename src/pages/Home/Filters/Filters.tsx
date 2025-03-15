import React, { useEffect, useState } from "react";

import Accordion from "../../../components/Accordion/Accordion";
import { AccordionDetails } from "@mui/material";
import AccordionSummary from "../../../components/Accordion/AccordionSummary";
import Box from "@mui/material/Box";
import CategoryFilter from "./CategoryFilter";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import PriceRangeFilter from "./PriceRangeFilter";
import { PriceRanges } from "../../../hooks/useFetchProducts";
import RatingFilter from "./RatingFilter";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const drawerWidth = 280;

interface FiltersProps {
  loading: boolean;
  open: boolean;
  setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
  prices: PriceRanges;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  prices,
  loading,
  open,
  setOpenFilters,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerVariant, setDrawerVariant] = useState<"permanent" | "temporary">(
    "permanent"
  );

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setDrawerVariant(() => {
        if (matches) {
          return "permanent";
        }
        return "temporary";
      });
    }

    return () => {
      mounted = false;
    };
  }, [matches]);

  useEffect(() => {
    let mounted = true;

    if (mounted && drawerVariant === "permanent") {
      setOpenFilters(false);
    }

    return () => {
      mounted = false;
    };
  }, [drawerVariant, setOpenFilters]);

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      onClose={() => setOpenFilters(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          border: 0,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", p: 2 }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {t("filters")}
        </Typography>
        <Link href="/" color="textSecondary">
          {t("clear_filters")}
        </Link>

        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel-category-filter"
            id="panel-category-header"
          >
            <Typography variant="h6">{t("category")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <CategoryFilter values={categories} />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel-rating-filter"
            id="panel-rating-header"
          >
            <Typography variant="h6">{t("rating")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <RatingFilter />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            aria-controls="panel-price-filter"
            id="panel-price-header"
          >
            <Typography variant="h6">{t("price")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <PriceRangeFilter min={prices.minPrice} max={prices.maxPrice} />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default Filters;
