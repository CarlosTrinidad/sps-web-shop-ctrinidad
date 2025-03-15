import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const ResourceNotFound = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        bgcolor: "primary.main",
      }}
      spacing={2}
    >
      <Grid
        container
        size={{ sm: 12, md: 6 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Grid
          container
          direction="row"
          size={{ xs: 12 }}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="div" px={10}>
            <Typography
              variant="h2"
              color="secondary"
              align="center"
              sx={{ paddingBottom: "3rem" }}
            >
              404 error
            </Typography>
            <Typography
              variant="h4"
              color="textSecondary"
              align="center"
              sx={{ paddingBottom: "3rem" }}
            >
              This page doesn't exist
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResourceNotFound;
