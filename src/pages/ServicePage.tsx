import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Chip, Skeleton } from "@mui/material";

import { useData } from "../context/DataContext";
import { useMinDelay } from "../hooks/useMinDelay";
import { serviceCategoriesApi } from "../api/serviceCategories";
import { serviceSubCategoriesApi } from "../api/serviceSubCategories";
import { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";
import ScrollReveal from "../components/common/ScrollReveal";

const ServicePage = () => {
  const navigate = useNavigate();
  const { services: rawServices, loading } = useData();
  const loadingSkeleton = useMinDelay(loading);
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [subCategories, setSubCategories] = useState<{ id: string; name: string; slug: string; category_id: string }[]>([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState<Record<string, any[]>>({});
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  useEffect(() => {
    serviceCategoriesApi.getCategories()
      .then(data => setCategories(data.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug }))))
      .catch(() => {});
    serviceSubCategoriesApi.getSubCategories()
      .then(data => {
        const map: Record<string, any[]> = {};
        data.forEach((sc: any) => {
          if (!map[sc.category_id]) map[sc.category_id] = [];
          map[sc.category_id].push(sc);
        });
        setSubCategoriesMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (rawServices.length > 0) {
      setServices(rawServices.filter((s: any) => s.is_available !== false));
    }
  }, [rawServices]);

  useEffect(() => {
    const cat = categories.find((c) => c.name === activeCategory);
    if (cat && subCategoriesMap[cat.id]) {
      setSubCategories(subCategoriesMap[cat.id]);
    } else {
      setSubCategories([]);
    }
    setActiveSubCategory("All");
  }, [activeCategory, categories, subCategoriesMap]);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (activeSubCategory !== "All" && activeCategory !== "All") {
      result = result.filter((s) => s.sub_category_id === activeSubCategory);
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
  }, [services, activeCategory, activeSubCategory]);

  const groupedServices = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredServices.forEach((s) => {
      const cat = s.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [filteredServices]);

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
          mb: subCategories.length > 0 ? 2 : 5,
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

      {/* Sub-Category Tabs */}
      {subCategories.length > 0 && (
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
          <Chip
            label="All"
            onClick={() => setActiveSubCategory("All")}
            sx={{
              fontFamily: "'Fraunces', serif",
              fontWeight: activeSubCategory === "All" ? 700 : 400,
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
              px: { xs: 1, sm: 1.5 },
              py: { xs: 1.75, sm: 2.25 },
              cursor: "pointer",
              backgroundColor: activeSubCategory === "All" ? "#E50914" : "action.hover",
              color: activeSubCategory === "All" ? "#ffffff" : "text.secondary",
              border: "1px solid",
              borderColor: activeSubCategory === "All" ? "#E50914" : "divider",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: activeSubCategory === "All" ? "#E50914" : "rgba(229, 9, 20, 0.08)",
                borderColor: "#E50914",
              },
            }}
          />
          {subCategories.map((sc) => (
            <Chip
              key={sc.id}
              label={sc.name}
              onClick={() => setActiveSubCategory(sc.id)}
              sx={{
                fontFamily: "'Fraunces', serif",
                fontWeight: activeSubCategory === sc.id ? 700 : 400,
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                px: { xs: 1, sm: 1.5 },
                py: { xs: 1.75, sm: 2.25 },
                cursor: "pointer",
                backgroundColor: activeSubCategory === sc.id ? "#E50914" : "action.hover",
                color: activeSubCategory === sc.id ? "#ffffff" : "text.secondary",
                border: "1px solid",
                borderColor: activeSubCategory === sc.id ? "#E50914" : "divider",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: activeSubCategory === sc.id ? "#E50914" : "rgba(229, 9, 20, 0.08)",
                  borderColor: "#E50914",
                },
              }}
            />
          ))}
        </Box>
      )}

      {loadingSkeleton ? (
        <Grid container spacing={4}>
          {[...Array(8)].map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
          ))}
        </Grid>
      ) : filteredServices.length === 0 ? (
        <Box sx={{ width: '100%', textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" color="text.secondary">No services available at the moment.</Typography>
        </Box>
      ) : (
        <StaggerContainer staggerDelay={0.08}>
          {activeCategory === "All" || activeSubCategory !== "All" ? (
            <Grid container spacing={4}>
              {filteredServices.map((service) => (
                <Grid
                  key={service.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
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
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          ) : (
            subCategories.map((sc) => {
              const scServices = filteredServices.filter((s) => s.sub_category_id === sc.id);
              if (scServices.length === 0) return null;
              return (
                <Box key={sc.id} sx={{ mb: 6 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 700,
                      mb: 3,
                      px: { xs: 2, md: 0 },
                      color: "text.primary",
                      borderLeft: "4px solid",
                      borderColor: "#E50914",
                      pl: 2,
                    }}
                  >
                    {sc.name}
                  </Typography>
                  <Grid container spacing={4}>
                    {scServices.map((service) => (
                      <Grid
                        key={service.id}
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
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
                        </StaggerItem>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })
          )}
        </StaggerContainer>
      )}
    </Box>
  );
};

export default ServicePage;