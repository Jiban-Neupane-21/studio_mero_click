/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Container,
  Tabs,
  Tab,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Camera,
  X,
  ZoomIn,
  Award,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PortfolioItem } from "../types";
import { useNavigate } from "react-router-dom";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    return categoryParam || "all";
  });

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const theme = useTheme();

  // Reset zoom scale when item changes or modal closes
  useEffect(() => {
    if (!selectedItem) {
      setZoomScale(1);
    }
  }, [selectedItem]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.5, 1));

  // Watch for external query updates and update active filters
  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    } else {
      setActiveTab("all");
    }
  }, [categoryParam]);

  // Scroll to top on mount or active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  const isDark = theme.palette.mode === "dark";

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "Wedding", label: "Wedding" },
    { id: "Maternity", label: "Maternity" },
    { id: "Cake Smash", label: "Cake Smash" },
    { id: "Fashion", label: "Fashion" },
    { id: "Portrait", label: "Portrait" },
    { id: "Identity Photo", label: "Identity Photo" },
    { id: "Commercial", label: "Commercial" },
    { id: "Customize Gifts", label: "Customize Gifts" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: newValue });
    }
  };

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab);

  const currentIndex = selectedItem
    ? filteredItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const handleNext = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
        setSelectedItem(filteredItems[currentIndex + 1]);
      }
    },
    [currentIndex, filteredItems],
  );

  const handlePrev = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex > 0) {
        setSelectedItem(filteredItems[currentIndex - 1]);
      }
    },
    [currentIndex, filteredItems],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  return (
    <Box
      sx={{
        pt: { xs: 3, md: 5 },
        pb: { xs: 10, md: 14 },
        backgroundColor: "#ffffff",
        color: "#000000",
        transition: "background-color 0.3s, color 0.3s",
        minHeight: "100vh",
      }}
      id="portfolio-root"
    >
      <Container maxWidth="xl" id="portfolio-container">
        {/* Categories Tabs Filter - Top Aligned without Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 6,
            borderBottom: "1.5px solid rgba(0, 0, 0, 0.08)",
          }}
          id="portfolio-filters"
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#E50914",
                height: "3px",
              },
              "& .MuiTab-root": {
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                textTransform: "none",
                fontWeight: 700,
                color: "#52525b",
                opacity: 0.75,
                minWidth: "auto",
                px: { xs: 2.5, md: 4 },
                py: 2,
                transition: "opacity 0.2s ease, color 0.2s ease",
                "&.Mui-selected": { 
                  color: "#000000",
                  opacity: 1, 
                },
                "&:hover": {
                  opacity: 1,
                  color: "#000000",
                }
              },
            }}
          >
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                label={cat.label}
                value={cat.id}
                id={`portfolio-tab-${cat.id}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* Portfolio Grid Layout */}
        <Grid container spacing={3} id="portfolio-grid-items">
          {filteredItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <Card
                onClick={() => navigate(`/portfolio/${item.id}`)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(229, 9, 20, 0.08)",
                    borderColor: "rgba(229, 9, 20, 0.25)",
                    "& .hover-zoom-img": {
                      transform: "scale(1.05)",
                    },
                    "& .hover-overlay": {
                      opacity: 1,
                    },
                  },
                }}
                id={`portfolio-item-${item.id}`}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    backgroundColor: "#f4f4f5",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.title}
                    className="hover-zoom-img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    referrerPolicy="no-referrer"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1622344028682-1bc6ba6b7f36?q=80&w=400&auto=format&fit=crop";
                    }}
                  />
                  
                  {/* Subtle hover icon zoom overlay */}
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.45)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 3,
                    }}
                  >
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#000000",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "#D32F2F",
                          color: "#ffffff",
                        },
                      }}
                      title="Quick Lightbox Preview"
                    >
                      <ZoomIn size={18} />
                    </Box>
                  </Box>
                </Box>
                <CardContent 
                  sx={{ 
                    p: 2.5, 
                    backgroundColor: "#ffffff",
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    "&:last-child": { pb: 2.5 } 
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "0.95rem",
                      color: "#18181b",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Button
                    variant="text"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/portfolio/${item.id}`);
                    }}
                    sx={{
                      color: "#E50914",
                      fontWeight: 700,
                      textTransform: "none",
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "0.85rem",
                      padding: 0,
                      minWidth: "auto",
                      flexShrink: 0,
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#ff4d4d",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    View More Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Lightbox Modal Dialog */}
      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth={false}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "background.paper",
            color: "text.primary",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.08)",
            margin: "24px",
            maxWidth: "calc(100% - 48px)",
            maxHeight: "calc(100% - 48px)",
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
          },
        }}
        id="portfolio-lightbox"
      >
        {selectedItem && (
          <Box sx={{ position: "relative" }}>
            {/* Prev/Next Controls */}
            {currentIndex > 0 && (
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 12,
                  transform: "translateY(-50%)",
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={28} />
              </IconButton>
            )}

            {currentIndex >= 0 && currentIndex < filteredItems.length - 1 && (
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 12,
                  transform: "translateY(-50%)",
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  zIndex: 10,
                }}
              >
                <ChevronRight size={28} />
              </IconButton>
            )}

            {/* Close trigger button */}
            <IconButton
              onClick={() => setSelectedItem(null)}
              id="close-lightbox-btn"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "#ffffff",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                zIndex: 10,
              }}
            >
              <X size={18} />
            </IconButton>

            {/* Zoom Controls */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                display: "flex",
                gap: 1,
                zIndex: 10,
              }}
            >
              <IconButton
                onClick={handleZoomOut}
                disabled={zoomScale <= 1}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
                }}
              >
                <ZoomOut size={18} />
              </IconButton>
              <IconButton
                onClick={handleZoomIn}
                disabled={zoomScale >= 3}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
                }}
              >
                <ZoomIn size={18} />
              </IconButton>
            </Box>

             <DialogContent sx={{ p: 0, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "85vh",
                  overflow: zoomScale > 1 ? "auto" : "hidden",
                  display: "flex",
                  justifyContent: zoomScale > 1 ? "flex-start" : "center",
                  alignItems: zoomScale > 1 ? "flex-start" : "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  onClick={() => setZoomScale((prev) => (prev === 1 ? 2 : 1))}
                  style={{
                    display: "block",
                    maxWidth: zoomScale === 1 ? "90vw" : "none",
                    maxHeight: zoomScale === 1 ? "80vh" : "none",
                    width: zoomScale > 1 ? `${100 * zoomScale}%` : "auto",
                    height: "auto",
                    objectFit: "contain",
                    transition: "width 0.3s ease, max-width 0.3s ease",
                    cursor: zoomScale > 1 ? "zoom-out" : "zoom-in",
                    margin: "auto",
                  }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1622344028682-1bc6ba6b7f36?q=80&w=800&auto=format&fit=crop";
                  }}
                  referrerPolicy="no-referrer"
                />
              </Box>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
