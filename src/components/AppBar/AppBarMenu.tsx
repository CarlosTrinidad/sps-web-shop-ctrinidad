import { NavigateFunction, useNavigate } from "react-router";

import LanguageSelectorDialog from "./LanguageSelectorDialog";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Typography from "@mui/material/Typography";
import { auth } from "../../services/Firebase/firebase";
import { signOut } from "firebase/auth";
import useShoppingCart from "../../store/cart";
import { useTranslation } from "react-i18next";

interface AppBarMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const AppBarMenu: React.FC<AppBarMenuProps> = ({ anchorEl, handleClose }) => {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();
  const { clearCart } = useShoppingCart();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        clearCart();
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("error", error);
        // An error happened.
      });
  };

  const [openLangSelector, setOpenLangSelector] =
    React.useState<boolean>(false);

  const handleOpenLangSelector = () => {
    setOpenLangSelector(true);
  };

  const handleCloseLangSelector = () => {
    setOpenLangSelector(false);
  };

  return (
    <>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenLangSelector}>
          <Typography sx={{ textAlign: "center" }}>
            {t("change_language")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: "center" }}>{t("logout")}</Typography>
        </MenuItem>
      </Menu>
      <LanguageSelectorDialog
        open={openLangSelector}
        handleClose={handleCloseLangSelector}
      />
    </>
  );
};

export default AppBarMenu;
