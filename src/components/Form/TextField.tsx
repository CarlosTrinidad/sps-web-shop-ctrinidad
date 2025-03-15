import TextFieldMui, { TextFieldProps } from "@mui/material/TextField";

const TextField = (props: TextFieldProps) => {
  return (
    <TextFieldMui
      {...props}
      variant="outlined"
      fullWidth
      margin="dense"
      size="small"
      color="secondary"
    />
  );
};

export default TextField;
