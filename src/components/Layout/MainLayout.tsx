import AppBar from "../AppBar/AppBar";
import Container from "@mui/material/Container";
import React from "react";
import ShoppingCart from "./ShoppingCart";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar />
      <ShoppingCart />
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default MainLayout;
