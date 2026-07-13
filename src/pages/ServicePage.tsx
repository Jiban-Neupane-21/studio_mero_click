import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

import { services } from "../data/service.data";

const ServicePage = () => {
  return (
    <Box
      sx={{
        px: {
          xs: 0,
          md: 0,
        },
        py: 0,
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: {
            xs: "2rem",
            md: "2.8rem",
          },
          textAlign: "center",
          mb: 5,
        }}
      >
        Our Studio Services
      </Typography>

      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid
            key={service.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <Box
              component={Link}
              to={`/services/${service.id}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: 2,
                transition: ".3s",
                height: { xs: "auto", sm: "calc((100vh - 280px) / 2)" },
                minHeight: { sm: 250 },

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  flexGrow: 1,
                  minHeight: { xs: 250, sm: 0 },
                  backgroundImage: `url(${service.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Box
                sx={{
                  py: 2,
                  px: 2,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flexShrink: 0,
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: "text.primary",
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicePage;