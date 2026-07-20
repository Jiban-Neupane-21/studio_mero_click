/* eslint-disable */
// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography, Skeleton, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/DataContext";

const AUTO_PLAY_INTERVAL = 5000;

const Hero = () => {
  const { homeItems, loading } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides =
    homeItems && homeItems.length > 0
      ? homeItems
      : [
          {
            imageUrl: "/Images/CompressJPEG.Online_img(1280x720).jpg",
            description: "",
          },
        ];

  const current = slides[currentIndex] || slides[0];

  useEffect(() => {
    if (slides.length <= 1) return;
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, isHovered]);

  const goTo = (index: number) => setCurrentIndex(index);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const showControls = slides.length > 1;

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: { xs: 3, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ lineHeight: 0 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: { xs: 300, sm: 400, md: 500, lg: 600 },
                    overflow: "hidden",
                    bgcolor: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={current.imageUrl}
                    alt={`Hero ${currentIndex + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Box>
              </motion.div>
            </AnimatePresence>


            {showControls && (
              <>
                <IconButton
                  onClick={goPrev}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.45)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)", opacity: 1 },
                    opacity: 0.7,
                    transition: "opacity 0.3s",
                    zIndex: 2,
                  }}
                >
                  <ChevronLeft size={24} />
                </IconButton>
                <IconButton
                  onClick={goNext}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.45)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)", opacity: 1 },
                    opacity: 0.7,
                    transition: "opacity 0.3s",
                    zIndex: 2,
                  }}
                >
                  <ChevronRight size={24} />
                </IconButton>
              </>
            )}
          </>
        )}
      </Paper>

      {showControls && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goTo(index)}
              sx={{
                width: index === currentIndex ? 24 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: index === currentIndex ? "#E50914" : "grey.400",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Hero;
