/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useContext, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useMinDelay } from "../hooks/useMinDelay";
import ScrollReveal from "../components/common/ScrollReveal";
import {
  Play,
  Calendar,
  Clock,
  Share2,
  X,
  ChevronRight,
  Video,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VideoItem } from "../types";
import { extractYoutubeId } from "../utils/youtube";
import { ColorModeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function VideoSection() {
  const { mode } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const navigate = useNavigate();

  const { videoItems: videos, loading } = useData();
  const loadingSkeleton = useMinDelay(loading);

  // State managers
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [theaterVideo, setTheaterVideo] = useState<VideoItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return ["All", "YouTube", "Facebook", "TikTok"];
  }, []);

  const normalizedVideos = useMemo(() => {
    return videos.map((video) => ({
      ...video,
      youtubeId: extractYoutubeId(video.youtube_id || video.youtubeId) || "",
    }));
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return normalizedVideos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (selectedCategory === "YouTube") {
        matchesCategory = !!video.youtube_id;
      } else if (selectedCategory === "Facebook") {
        matchesCategory = !!video.facebook_link;
      } else if (selectedCategory === "TikTok") {
        matchesCategory = !!video.tiktok_link;
      } else {
        matchesCategory = selectedCategory === "All";
      }

      return matchesSearch && matchesCategory;
    });
  }, [normalizedVideos, searchQuery, selectedCategory]);

  const handleShare = (video: VideoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    let url = '';
    if (video.youtubeId) {
      url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    } else if (video.facebook_link) {
      url = video.facebook_link;
    } else if (video.tiktok_link) {
      url = video.tiktok_link;
    }
    if (url) {
      navigator.clipboard.writeText(url);
      setCopiedId(video.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleBookRedirect = () => {
    navigate("/book");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isTikTokVideo =
    theaterVideo &&
    !theaterVideo.youtubeId &&
    !theaterVideo.facebook_link &&
    !!theaterVideo.tiktok_link;

  return (
    <Box
      id="page-videos"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isDark ? "#020202" : "#f8fafc",
        color: "text.primary",
        transition: "background-color 0.3s",
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="xl">
        {/* Animated Header Section */}
        <ScrollReveal animation="fadeUp">
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 2.5,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Our Masterclass Cinematic Videos
              <Box
                component="span"
                sx={{ color: "#E50914", display: "inline-block", ml: 1.5 }}
              >
                4K Motion
              </Box>
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Search & Navigation Toolbar */}
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              mb: 5,
              p: 3,
              backgroundColor: isDark ? "rgba(10, 10, 12, 0.6)" : "#ffffff",
              border: "1px solid",
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              borderRadius: "12px",
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.3)"
                : "0 10px 20px rgba(0,0,0,0.01)",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.12em",
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              Studio Broadcast Gallery
            </Typography>

            <TextField
              placeholder="Search our video showreel..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  style: {
                    color: isDark ? "#ffffff" : "#0f172a",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.9rem",
                  },
                },
              }}
              sx={{
                width: { xs: "100%", md: "320px" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.01)",
                  "& fieldset": {
                    borderColor: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  },
                  "&:hover fieldset": { borderColor: "#E50914" },
                  "&.Mui-focused fieldset": { borderColor: "#E50914" },
                },
              }}
            />
          </Box>
        </ScrollReveal>

        {/* Dynamic Category Filter bar */}
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <Box
            sx={{
              display: "flex",
              gap: 1.25,
              mb: 6,
              overflowX: "auto",
              pb: 1.5,
              justifyContent: "center",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.85rem",
                    px: 1.5,
                    py: 2.25,
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? "#E50914"
                      : isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                    color: isActive ? "#ffffff" : "text.secondary",
                    border: "1px solid",
                    borderColor: isActive
                      ? "#E50914"
                      : isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.08)",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "#E50914"
                        : "rgba(229, 9, 20, 0.08)",
                      borderColor: "#E50914",
                      color: isActive ? "#ffffff" : "#E50914",
                    },
                  }}
                />
              );
            })}
          </Box>
        </ScrollReveal>

        {/* LOADER OR GRID LISTINGS */}
        {loadingSkeleton ? (
          <Box>
            {/* Toolbar Skeleton */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 5,
                p: 3,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="rounded" width={280} height={36} />
            </Box>

            {/* Category Chips Skeleton */}
            <Box
              sx={{
                display: "flex",
                gap: 1.25,
                mb: 6,
                justifyContent: "center",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={100}
                  height={36}
                  sx={{ borderRadius: "100px" }}
                />
              ))}
            </Box>

            {/* Cards Grid Skeleton */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 4,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card
                  key={i}
                  sx={{
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ aspectRatio: "16/10" }}
                    animation="wave"
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={16} />
                    <Skeleton variant="text" width="90%" height={16} />
                    <Skeleton variant="text" width="60%" height={16} sx={{ mb: 2 }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Skeleton variant="text" width="30%" height={14} />
                      <Skeleton variant="text" width="20%" height={14} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            {filteredVideos.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
              >
                <Typography color="textSecondary">
                  No videos found matching "{searchQuery}".
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 4,
                }}
              >
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      background: isDark ? "#121214" : "#ffffff",
                      border: "1px solid",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.06)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: isDark
                        ? "0 8px 24px rgba(0,0,0,0.3)"
                        : "0 8px 24px rgba(0,0,0,0.02)",
                      transition:
                        "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        borderColor: "#E50914",
                        "& .hover-play-icon": {
                          transform: "scale(1.15)",
                          backgroundColor: "#E50914",
                        },
                      },
                    }}
                  >
                    {/* Video Preview Image Frame */}
                    <Box
                      onClick={() => setTheaterVideo(video)}
                      sx={{
                        position: "relative",
                        aspectRatio: "16/10",
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "#000000",
                      }}
                    >
                      {video.youtubeId ? (
                        <CardMedia
                          component="img"
                          image={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.title}
                          onError={(e: any) => {
                            e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
                          }}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
                            color: "rgba(255,255,255,0.7)",
                            gap: 1.5,
                          }}
                        >
                          <Video size={48} strokeWidth={1} />
                          <Typography
                            variant="overline"
                            sx={{ fontWeight: 600, letterSpacing: "0.1em" }}
                          >
                            {video.facebook_link
                              ? "Facebook Video"
                              : video.tiktok_link
                                ? "TikTok Video"
                                : "Video"}
                          </Typography>
                        </Box>
                      )}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(0,0,0,0.25)",
                        }}
                      />

                      {/* Hover Play Bubble overlay */}
                      <Box
                        className="hover-play-icon"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          backgroundColor: "rgba(229, 9, 20, 0.9)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 15px rgba(229, 9, 20, 0.4)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Play size={20} fill="#ffffff" style={{ marginLeft: "4px" }} />
                      </Box>

                      {/* Category Badge */}
                      <Box sx={{ position: "absolute", top: 12, left: 12 }}>
                        <Chip
                          label={video.category}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.85)",
                            color: "#ffffff",
                            border: "1px solid rgba(255,255,255,0.15)",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            borderRadius: "4px",
                          }}
                        />
                      </Box>

                      {/* Video Duration */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          backgroundColor: "rgba(0,0,0,0.85)",
                          color: "#ffffff",
                          px: 1,
                          py: 0.35,
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: 650,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Clock size={10} color="#E50914" />
                        {video.duration}
                      </Box>
                    </Box>

                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        onClick={() => setTheaterVideo(video)}
                        sx={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          mb: 1.5,
                          lineHeight: 1.35,
                          cursor: "pointer",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          "&:hover": { color: "#E50914" },
                        }}
                      >
                        {video.title}
                      </Typography>

                      <Box
                        sx={{
                          color: "text.secondary",
                          fontWeight: 300,
                          lineHeight: 1.6,
                          fontSize: "0.85rem",
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{ __html: video.description }}
                      />

                      {/* Card Footer actions */}
                      <Box
                        sx={{
                          mt: "auto",
                          pt: 2,
                          borderTop: "1px solid",
                          borderColor: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.05)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            color: "#64748b",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                          component="span"
                        >
                          <Calendar size={11} color="#E50914" /> Released{" "}
                          {video.upload_date}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={(e) => handleShare(video, e)}
                            sx={{
                              color:
                                copiedId === video.id
                                  ? "#10b981"
                                  : "text.secondary",
                            }}
                          >
                            <Share2 size={14} />
                          </IconButton>
                          <Button
                            size="small"
                            onClick={() => setTheaterVideo(video)}
                            endIcon={<ChevronRight size={12} />}
                            sx={{
                              textTransform: "none",
                              color: "#E50914",
                              fontSize: "0.75rem",
                              fontWeight: 650,
                              p: 0,
                              minWidth: "auto",
                            }}
                          >
                            Watch Video
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* BOTTOM CALL-TO-ACTION FOR KATHMANDU VIDEOGRAPHY SERVICES */}
        <ScrollReveal animation="scaleUp">
          <Box
            sx={{
              mt: 10,
              p: { xs: 4, md: 6 },
              borderRadius: "12px",
              border: "2px solid rgba(229, 9, 20, 0.2)",
              background: isDark
                ? "radial-gradient(ellipse at bottom, rgba(229,9,20,0.12) 0%, rgba(5,5,5,1) 80%)"
                : "radial-gradient(ellipse at bottom, rgba(229,9,20,0.05) 0%, rgba(255,255,255,1) 80%)",
              textAlign: "center",
            }}
            id="videography-services-cta"
          >
            <Typography
              variant="overline"
              sx={{
                color: "#E50914",
                fontWeight: 600,
                letterSpacing: "0.15em",
                display: "block",
                mb: 1,
              }}
            >
              CUSTOM RESERVATIONS & REELS
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                mb: 1.5,
              }}
            >
              Planning an Event or Promo in Kathmandu?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? "#cbd5e1" : "#475569",
                fontWeight: 300,
                maxWidth: "750px",
                mx: "auto",
                mb: 4,
              }}
            >
              We provide complete high-end videography solutions with expert
              editing, color grading, multi-lens configurations, and premium
              sound design for traditional weddings, musical gigs, and corporate
              brand showcases.
            </Typography>
            <Button
              variant="contained"
              onClick={handleBookRedirect}
              sx={{
                background: "linear-gradient(135deg, #E50914 0%, #B71C1C 100%)",
                boxShadow: "0 8px 24px rgba(229, 9, 20, 0.35)",
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 600,
                textTransform: "none",
                px: 5,
                py: 1.5,
                borderRadius: "4px",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ff4c4c 0%, #a60000 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 30px rgba(229, 9, 20, 0.45)",
                },
              }}
            >
              Hire Videographer Service
            </Button>
          </Box>
        </ScrollReveal>
      </Container>

      {/* FULLSTAGE THEATER MODE INTERACTIVE OVERLAY MODAL */}
      <AnimatePresence>
        {theaterVideo && (
          <Dialog
            fullWidth
            maxWidth={isTikTokVideo ? "xs" : "lg"}
            open={Boolean(theaterVideo)}
            onClose={() => setTheaterVideo(null)}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.92)",
                  backdropFilter: "blur(8px)",
                },
              },
              paper: {
                sx: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  overflow: "hidden",
                  borderRadius: "8px",
                  mx: { xs: 2, sm: 4 },
                },
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Box sx={{ width: "100%", position: "relative" }}>
                {/* Header Close triggers */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    px: 1,
                    color: "#ffffff",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Video size={15} color="#E50914" />
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      STUDIO BROADCAST: {theaterVideo.category.toUpperCase()}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setTheaterVideo(null)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        color: "#ffffff",
                        backgroundColor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>

                {/* Main video player — adapts to platform */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: isTikTokVideo ? { xs: "100%", sm: "340px" } : "none",
                    aspectRatio: isTikTokVideo ? "9/16" : "16/9",
                    maxHeight: isTikTokVideo ? "80vh" : "none",
                    margin: isTikTokVideo ? "0 auto" : "0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#000000",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.85)",
                  }}
                >
                  {theaterVideo.youtubeId ? (
                    <iframe
                      title={theaterVideo.title}
                      src={`https://www.youtube.com/embed/${theaterVideo.youtubeId}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ width: "100%", height: "100%", border: "none" }}
                    />
                  ) : theaterVideo.facebook_link ? (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(theaterVideo.facebook_link)}&show_text=false&width=auto`}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        overflow: "hidden",
                      }}
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  ) : theaterVideo.tiktok_link ? (
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${(theaterVideo.tiktok_link.match(/\/video\/(\d+)/) || [])[1] || ''}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        overflow: "hidden",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#111111",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Video size={48} style={{ opacity: 0.5 }} />
                    </Box>
                  )}
                </Box>

                {/* Video Info Foot */}
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "rgba(0,0,0,0.6)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    color: "#ffffff",
                    maxWidth: isTikTokVideo ? { xs: "100%", sm: "340px" } : "none",
                    mx: isTikTokVideo ? "auto" : 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {theaterVideo.title}
                  </Typography>
                  <Box
                    sx={{
                      color: "#cbd5e1",
                      fontWeight: 300,
                      fontSize: "0.82rem",
                      lineHeight: 1.45,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: theaterVideo.description,
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
}
