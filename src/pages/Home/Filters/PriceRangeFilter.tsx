import React, { useEffect } from "react";

import Grid from "@mui/material/Grid2";
import Slider from "@mui/material/Slider";
import TextField from "../../../components/Form/TextField";
import { useSearchParams } from "react-router";

interface PriceRangeFilterProps {
  min: number;
  max: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ min, max }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [value, setValue] = React.useState<number[]>([
    Number.parseFloat(minPrice) || min,
    Number.parseFloat(maxPrice) || max,
  ]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleLowerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setValue((p) => [value, p[1]]);
  };
  const handleHigherInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setValue((p) => [p[0], value]);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // Only filter if the values are different than the initial values
      setSearchParams((searchParams) => {
        searchParams.set("minPrice", value[0].toString());
        searchParams.set("maxPrice", value[1].toString());
        return searchParams;
      });
    }

    return () => {
      mounted = false;
    };
  }, [value, searchParams, setSearchParams, min, max]);

  return (
    <>
      <Slider
        color="secondary"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={5}>
          <TextField
            value={value[0]}
            onChange={handleLowerInputChange}
            type="number"
          />
        </Grid>
        <Grid>-</Grid>
        <Grid size={5}>
          <TextField
            value={value[1]}
            onChange={handleHigherInputChange}
            type="number"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PriceRangeFilter;
