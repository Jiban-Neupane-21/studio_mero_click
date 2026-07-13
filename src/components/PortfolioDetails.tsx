/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
  Paper,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  useTheme,
  Grid,
} from "@mui/material";
import {
  ArrowLeft,
  User,
  Share2,
  CalendarDays,
  Sparkles,
  CheckCircle,
  Maximize2,
  X,
  Info,
  Sliders,
  Compass,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PortfolioItem } from "../types";
import { portfolioApi } from "../api/portfolio";
import LoadingSpinner from "./common/LoadingSpinner";

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);
      try {
        const list = await portfolioApi.getPortfolioItems();
        const matched = list.find((item) => item.id === id) ?? null;
        setSelectedItem(matched);
      } catch (err) {
        console.error("Error loading portfolio item:", err);
        setSelectedItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPortfolioData();
    }
  }, [id]);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  const handleBackToPortfolio = () => {
    // Navigate back to home section or portfolio section
    navigate("/portfolio");
  };

  const currentIndex =
    selectedItem?.secondaryImages?.findIndex((img) => img === galleryImage) ??
    -1;

  const handleNextImage = React.useCallback(() => {
    if (selectedItem?.secondaryImages && currentIndex > -1) {
      const nextIndex = (currentIndex + 1) % selectedItem.secondaryImages.length;
      setGalleryImage(selectedItem.secondaryImages[nextIndex]);
    }
  }, [currentIndex, selectedItem]);

  const handlePrevImage = React.useCallback(() => {
    if (selectedItem?.secondaryImages && currentIndex > -1) {
      const prevIndex =
        (currentIndex - 1 + selectedItem.secondaryImages.length) %
        selectedItem.secondaryImages.length;
      setGalleryImage(selectedItem.secondaryImages[prevIndex]);
    }
  }, [currentIndex, selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryImage) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryImage, handleNextImage, handlePrevImage]);

  if (loading) {
    return <LoadingSpinner message="Loading masterwork details..." />;
  }

  if (!selectedItem) {
    return (
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          minHeight: "60vh",
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        <Container maxWidth="sm">
          <Info size={48} style={{ color: "#71717a", display: "block", margin: "0 auto 16px" }} />
          <Typography
            variant="h4"
            sx={{ fontFamily: '"Space Grotesk"', fontWeight: 700, mb: 2 }}
          >
            Masterwork Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            The requested portfolio item could not be found. It may have been
            updated or removed.
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackToPortfolio}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              backgroundColor: "#E50914",
              fontFamily: '"Space Grotesk"',
              textTransform: "none",
              borderRadius: "6px",
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: "#b91c1c" },
            }}
          >
            Return to Portfolio Grid
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        minHeight: "90vh",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <Container maxWidth="lg" id="portfolio-detail-page">
        {/* Back navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Button
            onClick={handleBackToPortfolio}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontFamily: '"Space Grotesk", sans-serif',
              "&:hover": { color: "#E50914", backgroundColor: "transparent" },
            }}
          >
            Back to Portfolio Grid
          </Button>

          <Button
            onClick={handleShareClick}
            startIcon={<Share2 size={14} />}
            variant="outlined"
            size="small"
            sx={{
              color: "text.primary",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              textTransform: "none",
              fontFamily: '"Space Grotesk", sans-serif',
              borderRadius: "6px",
              fontSize: "0.8rem",
              "&:hover": {
                borderColor: "#E50914",
                backgroundColor: "rgba(229, 9, 20, 0.05)",
              },
            }}
          >
            Share
          </Button>
        </Box>

        {/* Main layout grid */}
        <Grid container spacing={5} sx={{ mb: 7, alignItems: "flex-start" }}>
          {/* Left Column: Interactive High Resolution Image */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "center",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
              }}
            >
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                style={{
                  width: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1622344028682-1bc6ba6b7f36?q=80&w=800&auto=format&fit=crop";
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(4px)",
                  color: "#ffffff",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  fontFamily: '"Space Grotesk"',
                  letterSpacing: "0.1em",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {selectedItem.category}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Detailed Context Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ff4d4d",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    fontFamily: '"Space Grotesk"',
                    fontSize: "0.75rem",
                  }}
                >
                  Studio Mero Click Highlight
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  mb: 1.5,
                  color: "text.primary",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {selectedItem.title}
              </Typography>

              {/* Sub-meta details badges */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                <Chip
                  icon={<User size={12} style={{ color: "inherit" }} />}
                  label={`Updated By: ${selectedItem.author || "Studio Specialist"}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                    borderColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  }}
                />
              </Box>

              <Divider
                sx={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.05)",
                  mb: 3,
                }}
              />

              {/* About Section */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: '"Space Grotesk"',
                  fontWeight: 700,
                  mb: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Compass size={18} style={{ color: "#E50914" }} />
                About This Capture
              </Typography>
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.875rem", md: "0.92rem" },
                  lineHeight: { xs: 1.7, md: 1.6 },
                  fontWeight: 300,
                  mb: 4,
                  overflowWrap: "break-word",
                  "& p": { margin: 0 },
                  "& h1, & h2": {
                    fontSize: { xs: "1.05rem", md: "1.1rem" },
                    fontWeight: 600,
                    color: "text.primary",
                    mt: 2,
                    mb: 1,
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    selectedItem.description ||
                    "<p>No detailed description available for this artwork.</p>",
                }}
              />

            </Box>
          </Grid>
        </Grid>

        {/* Secondary images gallery */}
        {selectedItem.secondaryImages &&
          selectedItem.secondaryImages.length > 0 && (
            <Box sx={{ mt: 10 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: '"Space Grotesk"', fontWeight: 700 }}
                >
                  More Images from this Project
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ff4d4d",
                    fontWeight: 600,
                    fontFamily: '"Space Grotesk"',
                  }}
                >
                  {selectedItem.secondaryImages.length} additional{" "}
                  {selectedItem.secondaryImages.length === 1
                    ? "photo"
                    : "photos"}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {selectedItem.secondaryImages.map((imageUrl, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={`${imageUrl}-${index}`}>
                    <Card
                      onClick={() => setGalleryImage(imageUrl)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0,0,0,0.05)",
                        boxShadow: "none",
                        borderRadius: "6px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          "& .hover-zoom-img": {
                            transform: "scale(1.05)",
                          },
                          "& .hover-maximize": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          aspectRatio: "4/5",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          alt={`${selectedItem.title} - image ${index + 1}`}
                          className="hover-zoom-img"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                          }}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src =
                              "https://images.unsplash.com/photo-1622344028682-1bc6ba6b7f36?q=80&w=400&auto=format&fit=crop";
                          }}
                        />
                        <Box
                          className="hover-maximize"
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            borderRadius: "4px",
                            p: 0.75,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <Maximize2 size={14} color="#ffffff" />
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
      </Container>

      {/* Secondary image lightbox */}
      <Dialog
        open={!!galleryImage}
        onClose={() => setGalleryImage(null)}
        maxWidth={false}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.08)",
            margin: "24px",
            maxWidth: "calc(100% - 48px)",
            maxHeight: "calc(100% - 48px)",
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Prev/Next Navigation Arrows */}
          {currentIndex > 0 && (
            <IconButton
              onClick={handlePrevImage}
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
          {selectedItem?.secondaryImages &&
            currentIndex < selectedItem.secondaryImages.length - 1 && (
              <IconButton
                onClick={handleNextImage}
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

          {/* Close Button */}
          <IconButton
            onClick={() => setGalleryImage(null)}
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
          <DialogContent sx={{ p: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {galleryImage && (
              <img
                src={galleryImage}
                alt={`${selectedItem.title} enlarged`}
                style={{
                  display: "block",
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
                referrerPolicy="no-referrer"
              />
            )}
          </DialogContent>
        </Box>
      </Dialog>

      {/* Snackbar notification */}
      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", fontFamily: '"Space Grotesk"' }}
        >
          Portfolio image link copied to clipboard successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
