import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

export interface LanguageSelectorDialogProps {
  open: boolean;
  handleClose: () => void;
}

const LanguageSelectorDialog = (props: LanguageSelectorDialogProps) => {
  const { t, i18n } = useTranslation();
  const { handleClose, open } = props;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{t('select_lang')}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage("es")}>
            <ListItemText primary="Español" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => changeLanguage("en")}>
            <ListItemText primary="English" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default LanguageSelectorDialog;
