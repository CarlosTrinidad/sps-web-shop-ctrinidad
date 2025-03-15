import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import DrawerMui from "@mui/material/Drawer";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React from "react";

const defaultWidth = 350;

interface AnchorDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Drawer: React.FC<AnchorDrawerProps> = ({
  open,
  onClose,
  title,
  body,
  footer,
}) => {
  const closeDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    onClose();
  };

  return (
    <div>
      <React.Fragment>
        <DrawerMui anchor={"right"} open={open} onClose={closeDrawer()}>
          <Box
            sx={{
              width: defaultWidth,
              marginTop: "64px"
            }}
            role="presentation"
            onKeyDown={closeDrawer()}
          >
            <Box px={3} py={1}>
              <Grid
                container
                spacing={2}
                wrap="nowrap"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>{title}</Grid>
                <Grid>
                  <IconButton onClick={closeDrawer()}>
                    <CloseIcon color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box px={3} py={2}>
              {body}
            </Box>
            {footer && (
              <Paper
                sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
                elevation={0}
              >
                <Divider />
                <Box p={3}>
                  {footer}
                </Box>
              </Paper>
            )}
          </Box>
        </DrawerMui>
      </React.Fragment>
    </div>
  );
};

export default Drawer;
