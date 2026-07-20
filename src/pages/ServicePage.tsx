import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Chip, Skeleton, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MoveHorizontal } from "lucide-react";

import { useData } from "../context/DataContext";
import { RestorationImage } from "../types/restoration.type";
import { useMinDelay } from "../hooks/useMinDelay";
import { services as serviceItems } from "../data/product.data";
import { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";
import ScrollReveal from "../components/common/ScrollReveal";

interface ServiceItem {
  id: string;
  title: string;
  thumbnail: string;
  is_available?: boolean;
  category?: string;
}

const ServicePage = () => {
  const { services: rawServices = [], restorations = [], loading } = useData() as { services: ServiceItem[]; restorations: RestorationImage[]; loading: boolean };
  const loadingSkeleton = useMinDelay(loading);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({});
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCategoryClick = useCallback((cat: string, index: number) => {
    setActiveCategory(cat);
    setVisibleIndex(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    if (rawServices.length > 0) {
      setServices(rawServices.filter((s: ServiceItem) => s.is_available !== false));
    }
  }, [rawServices]);

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (restorations.length > 0) {
      const initialPositions: { [key: string]: number } = {};
      restorations.forEach((item: RestorationImage) => {
        initialPositions[item.id] = 50;
      });
      setSliderPositions(initialPositions);
    }
  }, [restorations]);

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

      {/* Category Tabs with Slider */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 5,
          px: { xs: 2, md: 0 },
        }}
      >
        <IconButton
          onClick={() => {
            const prev = Math.max(0, visibleIndex - 1);
            setVisibleIndex(prev);
            itemRefs.current[prev]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
          }}
          size="small"
          sx={{ flexShrink: 0, color: "text.secondary", display: { xs: "none", sm: "inline-flex" } }}
        >
          <ChevronLeft />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 1.25 },
            overflowX: "auto",
            pb: 1,
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            flex: 1,
          }}
        >
          {["All", ...serviceItems.map((s) => s.title)].map((cat, idx) => (
            <Box
              key={cat}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <Chip
                label={cat}
                onClick={() => handleCategoryClick(cat, idx)}
                sx={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: activeCategory === cat ? 700 : 400,
                  fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 1.75, sm: 2.25 },
                  cursor: "pointer",
                  backgroundColor: activeCategory === cat ? "#E50914" : "action.hover",
                  color: activeCategory === cat ? "#ffffff" : "text.secondary",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "#E50914" : "divider",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: activeCategory === cat ? "#E50914" : "rgba(229, 9, 20, 0.08)",
                    borderColor: "#E50914",
                  },
                }}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => {
            const next = Math.min(serviceItems.length, visibleIndex + 1);
            setVisibleIndex(next);
            itemRefs.current[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
          }}
          size="small"
          sx={{ flexShrink: 0, color: "text.secondary", display: { xs: "none", sm: "inline-flex" } }}
        >
          <ChevronRight />
        </IconButton>
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
      ) : activeCategory === "Photo Repair & Restoration" ? (
        restorations.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">No restorations available at the moment.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
              },
              gap: 2,
            }}
          >
            {restorations.map((item) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  <Box sx={{ p: 1.5 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        aspectRatio: '4/5',
                        bgcolor: 'background.default'
                      }}
                    >
                      <Box
                        component="img"
                        src={item.before_image_url}
                        alt="Before Restoration"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          pointerEvents: 'none'
                        }}
                      />
                      <Box
                        component="img"
                        src={item.after_image_url}
                        alt="After Restoration"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          pointerEvents: 'none',
                          clipPath: `inset(0 0 0 ${sliderPositions[item.id] || 50}%)`
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: `${sliderPositions[item.id] || 50}%`,
                          width: '4px',
                          bgcolor: 'white',
                          transform: 'translateX(-50%)',
                          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                          pointerEvents: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            color: '#424242'
                          }}
                        >
                          <MoveHorizontal size={20} strokeWidth={2.5} />
                        </Box>
                      </Box>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPositions[item.id] || 50}
                        onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          cursor: 'ew-resize',
                          margin: 0
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ p: 2, pt: 1, textAlign: 'left', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3, mb: 1 }}>
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2 }}>
                        {item.description}
                      </Typography>
                    )}
                    <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Box
                        component={Link}
                        to={`/restorations/${item.id}`}
                        sx={{
                          display: 'block',
                          textAlign: 'center',
                          textTransform: 'none',
                          fontWeight: 600,
                          color: 'error.main',
                          textDecoration: 'none',
                          py: 0.5,
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        View More Detail
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )
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