import Card, { CardProps } from "@mui/material/Card";

import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import React from "react";

interface ActionAreaCardProps {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  CardProps?: CardProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  children,
  onClick,
  footer,
  CardProps,
}) => {
  return (
    <Card
      {...CardProps}
      elevation={0}
      square
      sx={{ flexGrow: 1, flexDirection: "column", alignItems: "stretch" }}
    >
      <CardActionArea onClick={onClick}>{children}</CardActionArea>
      {footer && <CardActions>{footer}</CardActions>}
    </Card>
  );
};

export default ActionAreaCard;
