/* eslint-disable */
// @ts-nocheck
import { useState, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard";
import type { Product } from "../../types/featureProduct.type";
import { useData } from "../../context/DataContext";
import { services } from "../../data/product.data";

const allCategories = ["All", ...services.map((s) => s.title)];

function BeforeAfterSlider({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [split, setSplit] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSplit((x / rect.width) * 100);
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(e.touches[0].clientX - rect.left, rect.width),
    );
    setSplit((x / rect.width) * 100);
  }, []);

  return (
    <Box
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/5",
        bgcolor: "background.default",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <Box
        component="img"
        src={after}
        alt="After"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          inset: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: `${split}%`,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={before}
          alt="Before"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${split}%`,
          width: 3,
          bgcolor: "white",
          transform: "translateX(-50%)",
          boxShadow: "0 0 8px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&::before": {
              content: '"\u276E"',
              fontSize: 14,
              color: "#333",
              mr: 0.5,
            },
            "&::after": {
              content: '"\u276F"',
              fontSize: 14,
              color: "#333",
              ml: 0.5,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          bgcolor: "rgba(0,0,0,0.7)",
          color: "white",
          px: 1.5,
          py: 0.3,
          borderRadius: 1,
          fontSize: "0.7rem",
          fontWeight: "bold",
          zIndex: 3,
        }}
      >
        Before
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          bgcolor: "rgba(211,47,47,0.9)",
          color: "white",
          px: 1.5,
          py: 0.3,
          borderRadius: 1,
          fontSize: "0.7rem",
          fontWeight: "bold",
          zIndex: 3,
        }}
      >
        After
      </Box>
    </Box>
  );
}

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleIndex, setVisibleIndex] = useState(0);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);

  const { products: rawProducts, restorations, loading, error } = useData();

  const products = rawProducts.map((p: any) => ({
    ...p,
    oldPrice: p.old_price,
    newPrice: p.new_price,
    discountRate: p.discount_rate,
    isFeatured: p.is_featured,
  }));

  const featured = products.filter((p: any) => p.isFeatured);

  const restorationItems = useMemo(() => {
    if (restorations.length === 0) return [];
    const shuffled = [...restorations].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4).map((r: any) => ({
      id: `restoration-${r.id}`,
      title: r.title,
      thumbnail: r.after_image_url,
      _restorationId: r.id,
      _raw: r,
      _restorationOldPrice: r.old_price || r.oldPrice || 0,
      _restorationNewPrice: r.new_price || r.newPrice || 0,
      _restorationDiscountRate: r.discount_rate || r.discountRate || 0,
      isFeatured: true,
    }));
  }, [restorations]);

  const filteredProducts =
    activeCategory === "All"
      ? featured
      : featured.filter((p: any) => p.category === activeCategory);

  const isRestorationTab = activeCategory === "Photo Repair & Restoration";

  const combinedItems = useMemo(() => {
    if (isRestorationTab) return restorationItems;
    if (activeCategory !== "All") return filteredProducts;
    if (restorationItems.length === 0) return filteredProducts;
    const shuffled = [...filteredProducts, ...restorationItems].sort(
      () => 0.5 - Math.random(),
    );
    return shuffled;
  }, [filteredProducts, restorationItems, isRestorationTab, activeCategory]);

  const handleCardClick = useCallback(
    (item: any) => {
      if (item._restorationId) {
        navigate(`/restorations/${item._restorationId}`);
      } else {
        navigate(`/products/${item.id}`);
      }
    },
    [navigate],
  );

  const handleCategoryClick = useCallback((cat: string, index: number) => {
    setActiveCategory(cat);
    setVisibleIndex(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);
  return (
    <Box
      component="section"
      sx={{
        height: { xs: "auto", lg: "calc(100vh - 72px)" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Heading + Category Slider */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: { xs: 26, md: 32 },
            color: "text.primary",
            flexShrink: 0,
          }}
        >
          Featured Products
        </Typography>

        {!loading && featured.length > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flex: { xs: "1 1 100%", sm: "1 1 auto" },
              minWidth: 0,
            }}
          >
            <IconButton
              onClick={() => {
                const prev = Math.max(0, visibleIndex - 1);
                setVisibleIndex(prev);
                itemRefs.current[prev]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
              }}
              size="small"
              sx={{
                flexShrink: 0,
                color: "text.secondary",
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <Box
              ref={trackRef}
              sx={{
                display: "flex",
                gap: { xs: 2, md: 3 },
                overflowX: "auto",
                pb: 1,
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": { display: "none" },
                flex: 1,
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {allCategories.map((cat, idx) => (
                <Box
                  key={cat}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  onClick={() => handleCategoryClick(cat, idx)}
                  sx={{
                    flexShrink: 0,
                    position: "relative",
                    cursor: "pointer",
                    userSelect: "none",
                    pb: 0.5,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: activeCategory === cat ? "100%" : "0%",
                      height: 2,
                      bgcolor: "#E50914",
                      transition: "all 0.3s ease",
                      transform: "translateX(-50%)",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: activeCategory === cat ? 700 : 400,
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      color:
                        activeCategory === cat ? "#E50914" : "text.secondary",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {cat}
                  </Typography>
                </Box>
              ))}
            </Box>

            <IconButton
              onClick={() => {
                const next = Math.min(allCategories.length - 1, visibleIndex + 1);
                setVisibleIndex(next);
                itemRefs.current[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
              }}
              size="small"
              sx={{
                flexShrink: 0,
                color: "text.secondary",
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "center",
              lg: "flex-start",
            },
          }}
        >
        {loading ? (
          [...Array(5)].map((_, index) => (
            <Grid
              key={`skeleton-${index}`}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 2.4,
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: { xs: 350, sm: 320 }, p: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ aspectRatio: "4/5", borderRadius: 2 }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  sx={{ mt: 2, fontSize: "1.25rem" }}
                  animation="wave"
                />
                <Skeleton variant="text" width="60%" animation="wave" />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={42}
                  sx={{ mt: 2, borderRadius: 1 }}
                  animation="wave"
                />
              </Box>
            </Grid>
          ))
        ) : error ? (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="body1" color="error">
              Error loading featured products.
            </Typography>
          </Box>
        ) : combinedItems.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              {activeCategory === "All"
                ? "No featured items available at the moment."
                : `No featured products in "${activeCategory}".`}
            </Typography>
          </Box>
        ) : (
          combinedItems.map((item) => (
            <Grid
              key={item.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 2.4,
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item._restorationId ? (
                <Box
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    width: "100%",
                    maxWidth: { xs: 350, sm: 320 },
                    borderRadius: "12px",
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.08)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    {Number(item._restorationDiscountRate) > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bgcolor: "#E50914",
                          color: "#fff",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          px: 1.25,
                          py: 0.5,
                          borderTopRightRadius: 6,
                          borderBottomRightRadius: 6,
                          zIndex: 10,
                        }}
                      >
                        {item._restorationDiscountRate}% OFF
                      </Box>
                    )}
                    <BeforeAfterSlider
                      before={item._raw.before_image_url}
                      after={item._raw.after_image_url}
                    />
                  </Box>
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "text.primary",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                        gap: 1,
                        my: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontWeight: 700,
                          fontSize: 18,
                          color: "#E50914",
                        }}
                      >
                        Rs.
                        {Number(item._restorationNewPrice).toLocaleString(
                          "en-IN",
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 13,
                          color: "text.secondary",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs.
                        {Number(item._restorationOldPrice).toLocaleString(
                          "en-IN",
                        )}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      onClick={() =>
                        navigate(`/restorations/${item._restorationId}`)
                      }
                      sx={{
                        mt: 1.5,
                        bgcolor: "#E50914",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        py: 1,
                        "&:hover": { bgcolor: "#b8070f" },
                      }}
                    >
                      View More Details
                    </Button>
                  </Box>
                </Box>
              ) : (
                <ProductCard product={item} onViewDetails={handleCardClick} />
              )}
            </Grid>
          ))
        )}
      </Grid>
      </Box>
    </Box>
  );
}
