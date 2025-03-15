import Grid from "@mui/material/Grid2";
import RatingMui from "@mui/material/Rating";
import React from "react";
import Typography from "@mui/material/Typography";

interface RatingProps {
  value: number;
  count?: number;
}

const Rating: React.FC<RatingProps> = ({ value = 0, count }) => {
  return (
    <Grid
      container
      sx={{
        alignItems: "center",
      }}
    >
      <Grid>
        <RatingMui value={value} defaultValue={0} precision={0.1} readOnly />
      </Grid>
      {count && (
        <Grid>
          <Typography variant="caption" color="textSecondary">
            {value} ({count})
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Rating;
