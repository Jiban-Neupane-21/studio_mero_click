import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Chip, Skeleton } from "@mui/material";

import { useData } from "../context/DataContext";
import { useMinDelay } from "../hooks/useMinDelay";
import { serviceCategoriesApi } from "../api/serviceCategories";
import { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";
import ScrollReveal from "../components/common/ScrollReveal";

interface ServiceItem {
  id: string;
  title: string;
  thumbnail: string;
  is_available?: boolean;
  category?: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

const ServicePage = () => {
  const { services: rawServices = [], loading } = useData() as { services: ServiceItem[]; loading: boolean };
  const loadingSkeleton = useMinDelay(loading);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    serviceCategoriesApi.getCategories()
      .then((data: ServiceCategory[]) => setCategories(data.map((c: ServiceCategory) => ({ id: c.id, name: c.name, slug: c.slug }))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (rawServices.length > 0) {
      setServices(rawServices.filter((s: ServiceItem) => s.is_available !== false));
    }
  }, [rawServices]);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (activeCategory === "All") {
      const shuffled = [...result];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    return result;
  }, [services, activeCategory]);

  return (
    <Box sx={{ px: 0, py: 0 }}>
      <ScrollReveal animation="fadeUp">
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.8rem" },
            textAlign: "center",
            mb: 5,
          }}
        >
          Our Studio Services
        </Typography>
      </ScrollReveal>

      {/* Category Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, md: 1.25 },
          mb: 5,
          overflowX: "auto",
          pb: 1,
          justifyContent: { xs: "flex-start", md: "center" },
          "&::-webkit-scrollbar": { display: "none" },
          px: { xs: 2, md: 0 },
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {[
          { name: "All", slug: "" },
          ...categories,
        ].map((cat) => (
          <Chip
            key={cat.name}
            label={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            sx={{
              fontFamily: "'Fraunces', serif",
              fontWeight: activeCategory === cat.name ? 700 : 400,
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
              px: { xs: 1, sm: 1.5 },
              py: { xs: 1.75, sm: 2.25 },
              cursor: "pointer",
              backgroundColor: activeCategory === cat.name ? "#E50914" : "action.hover",
              color: activeCategory === cat.name ? "#ffffff" : "text.secondary",
              border: "1px solid",
              borderColor: activeCategory === cat.name ? "#E50914" : "divider",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: activeCategory === cat.name ? "#E50914" : "rgba(229, 9, 20, 0.08)",
                borderColor: "#E50914",
              },
            }}
          />
        ))}
      </Box>



      {loadingSkeleton ? (
        <Grid container spacing={4}>
          {[...Array(8)].map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  boxShadow: 2,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={280}
                  animation="wave"
                />
                <Box sx={{ py: 2, px: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Skeleton variant="text" sx={{ fontSize: "1.25rem", mx: "auto" }} width="60%" animation="wave" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : filteredServices.length === 0 ? (
        <Box sx={{ width: '100%', textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" color="text.secondary">No services available at the moment.</Typography>
        </Box>
      ) : (
        <StaggerContainer staggerDelay={0.08}>
          <Grid container spacing={4}>
            {filteredServices.map((service) => (
              <Grid
                key={service.id}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <StaggerItem style={{ height: '100%' }}>
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

export default ServicePage;