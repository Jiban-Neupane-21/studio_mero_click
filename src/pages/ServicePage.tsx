import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Skeleton } from "@mui/material";

import { servicesApi } from "../api/services";

const ServicePage = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const [data] = await Promise.all([
          servicesApi.getServices(),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
        // optionally filter for is_available if you want
        setServices(data.filter((s: any) => s.is_available));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
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
        {loading ? (
          [...Array(8)].map((_, index) => (
            <Grid
              key={`skeleton-${index}`}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  height: { xs: "auto", sm: "calc((100vh - 280px) / 2)" },
                  minHeight: { sm: 250 },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ flexGrow: 1, minHeight: { xs: 250, sm: 0 } }}
                  animation="wave"
                />
                <Box sx={{ py: 2, px: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Skeleton variant="text" sx={{ fontSize: "1.25rem", mx: "auto" }} width="60%" animation="wave" />
                </Box>
              </Box>
            </Grid>
          ))
        ) : services.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">No services available at the moment.</Typography>
          </Box>
        ) : (
          services.map((service) => (
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
        )))}
      </Grid>
    </Box>
  );
};

export default ServicePage;