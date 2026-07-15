// src/layouts/Layout.tsx

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../../App";

import Navbar from "./Navbar";
import Footer from "../common/Footer";

const Layout = () => {
  const { mode } = useContext(ColorModeContext);
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          overflowX: "hidden",
          pt: "112px",
        }}
      >
        <Outlet />
      </Box>

      {/* Uncomment when Footer is ready */}
      <Footer mode={mode} handleScrollToSection={() => {}} />
    </Box>
  );
};

export default Layout;
