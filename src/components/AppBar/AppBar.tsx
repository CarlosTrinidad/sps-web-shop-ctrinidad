import AppBarMenu from "./AppBarMenu";
import AppBarMui from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Icon from "../../assets/icon.png";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useShoppingCart from "../../store/cart";
import { useTranslation } from "react-i18next";

const AppBar = () => {
  const { t } = useTranslation();
  const { toggleOpenCart, items } = useShoppingCart();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBarMui
      position="fixed"
      elevation={0}
      variant="outlined"
      color="primary"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Icon} height={30} />
          </Typography>

          <Box>
            <Tooltip title={t("show_settings")}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, mr: "0.5rem" }}
              >
                <Avatar alt={t("open_shopping_cart")}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("open_shopping_cart")}>
              <Badge
                badgeContent={items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
                color="secondary"
              >
                <IconButton onClick={toggleOpenCart} sx={{ p: 0 }}>
                  <Avatar alt={t("show_settings")}>
                    <ShoppingCartIcon />
                  </Avatar>
                </IconButton>
              </Badge>
            </Tooltip>
          </Box>
          <AppBarMenu
            anchorEl={anchorElUser}
            handleClose={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBarMui>
  );
};
export default AppBar;
