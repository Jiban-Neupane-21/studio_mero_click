// src/layouts/MainLayout.tsx

import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 3, md: 5 },
      }}
    >
      <Box
        sx={{
          minHeight: "calc(100vh - 72px)",
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default MainLayout;