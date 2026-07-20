import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Button, Skeleton, Paper } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { CameraOff } from "lucide-react";

import { useData } from "../context/DataContext";
import { serviceCategoriesApi } from "../api/serviceCategories";
import {
  StaggerContainer,
  StaggerItem,
} from "../components/common/ScrollReveal";

const CategoryPage = () => {
  const { slug } = useParams();
  const { services: rawServices } = useData();
  const [category, setCategory] = useState<any>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setCategoryLoading(true);
    setCategoryError(false);
    serviceCategoriesApi
      .getCategoryBySlug(slug)
      .then((data) => {
        setCategory(data);
        setCategoryLoading(false);
      })
      .catch(() => {
        setCategoryError(true);
        setCategoryLoading(false);
      });
  }, [slug]);

  const services = rawServices.filter(
    (s: any) => s.is_available !== false && s.category === category?.name,
  );

  if (categoryLoading) {
    return (
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
        <Skeleton variant="text" width="40%" sx={{ fontSize: "2rem", mb: 1 }} />
        <Skeleton variant="text" width="70%" sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          {[...Array(4)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{ aspectRatio: "1/1", borderRadius: 3 }}
              />
              <Skeleton variant="text" sx={{ mt: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (categoryError || !category) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Category not found
        </Typography>
        <Link to="/services" style={{ color: "#E50914" }}>
          Back to All Services
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Box
        component={Link}
        to="/services"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          color: "text.secondary",
          textDecoration: "none",
          mb: 2,
          fontSize: "0.9rem",
          "&:hover": { color: "#E50914" },
        }}
      >
        <ArrowBack sx={{ fontSize: 18 }} />
        Back to All Services
      </Box>

      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.8rem" },
          mb: 1,
        }}
      >
        {category.name}
      </Typography>

      {category.description && (
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            mb: 5,
            maxWidth: 700,
          }}
        >
          {category.description}
        </Typography>
      )}

      {services.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            textAlign: "center",
            py: { xs: 6, md: 10 },
            mt: 4,
            bgcolor: "action.hover",
            borderRadius: 3,
          }}
        >
          <CameraOff size={48} style={{ color: "#E50914", opacity: 0.8 }} />
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: 700,
              fontFamily: "'Fraunces', serif",
            }}
          >
            No Services Found
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
            There are currently no services available in this category. Please
            check back later or explore our other offerings.
          </Typography>
        </Paper>
      ) : (
        <StaggerContainer staggerDelay={0.08}>
          <Grid container spacing={4}>
            {services.map((service: any) => (
              <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <StaggerItem style={{ height: "100%" }}>
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
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={service.thumbnail}
                      alt={service.title}
                      sx={{
                        width: "100%",
                        display: "block",
                        bgcolor: "grey.100",
                      }}
                    />
                    <Box
                      sx={{
                        py: 2,
                        px: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
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
                      <Button
                        component={Link}
                        to={`/booking/${service.id}`}
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 1.5,
                          bgcolor: "#D32F2F",
                          "&:hover": { bgcolor: "#B71C1C" },
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Box>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      )}
    </Box>
  );
};

export default CategoryPage;
