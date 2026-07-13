/* eslint-disable */
// @ts-nocheck
import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { specialityData } from "../data/speciality.data";

// --- Component ---
export const SpecialitySection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#0A0A0A" : "#FFFFFF",
        color: (theme) =>
          theme.palette.mode === "dark" ? "#FAFAF7" : "#0A0A0A",
        py: { xs: 8, md: 10 },
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: { xs: 26, md: 32 },
          mb: 3,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Specialities
      </Typography>
      <Container maxWidth="lg">
        {/* Responsive Grid with spacing matched to image_589674.png */}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {specialityData.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="article"
                sx={{
                  height: "100%",
                  minHeight: {
                    xs: "auto",
                    md: item.description ? "380px" : "240px",
                  },
                  p: { xs: 4, md: 5 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textAlign: "center",
                  borderRadius: "24px",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#161618" : "#F5F6F8",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 30px rgba(0, 0, 0, 0.2)"
                      : "0 8px 30px rgba(160, 165, 175, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 12px 35px rgba(0, 0, 0, 0.35)"
                        : "0 12px 35px rgba(160, 165, 175, 0.15)",
                  },
                }}
              >
                {/* Clean Centered Icon Container */}
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.iconUrl}
                    alt={item.altText}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Card Title */}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    lineHeight: 1.35,
                    mb: item.description ? 2 : 0, // Zero bottom margin if no body copy
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#FFFFFF" : "#0A0D14",
                    maxWidth: "280px",
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SpecialitySection;
