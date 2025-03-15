import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

const SortSelector = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<string>("default");

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSearchParams((searchParams) => {
        searchParams.set("sortBy", sort);
        return searchParams;
      });
    }

    return () => {
      mounted = false;
    };
  }, [searchParams, setSearchParams, sort]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel color="secondary" id="sort-select-label">
          {t("sort_by")}
        </InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sort}
          label={t("sort_by")}
          onChange={handleChange}
          size="small"
          color="secondary"
        >
          <MenuItem value={"default"}>{t("featured")}</MenuItem>
          <MenuItem value={"priceAsc"}>{t("price_asc")}</MenuItem>
          <MenuItem value={"priceDesc"}>{t("price_desc")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelector;
