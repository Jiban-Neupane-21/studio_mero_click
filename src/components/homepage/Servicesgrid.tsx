import { useRef } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";

import { useData } from "../../context/DataContext";
import { Service } from "../../types/service.type";

const GAP = 24;

const ServiceGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));

  const { services, loading } = useData();

  const getCardWidth = () => {
    if (isXs) return window.innerWidth * 0.85;
    if (isSm) return 320;
    if (isMd) return 360;
    if (isLg) return 420;
    return 440;
  };

  const scrollByCard = (direction: "left" | "right") => {
    const width = getCardWidth();

    scrollRef.current?.scrollBy({
      left: direction === "left" ? -(width + GAP) : width + GAP,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          px: {
            xs: 2,
            md: 4,
          },
          py: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: {
              xs: "1.8rem",
              md: "2.25rem",
            },
          }}
        >
          Our Studio Services
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            onClick={() => scrollByCard("left")}
            sx={{
              bgcolor: "grey.100",
              "&:hover": {
                bgcolor: "grey.200",
              },
              width: 46,
              height: 46,
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scrollByCard("right")}
            sx={{
              bgcolor: "grey.100",
              "&:hover": {
                bgcolor: "grey.200",
              },
              width: 46,
              height: 46,
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Cards */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",

          px: {
            xs: 2,
            md: 4,
          },

          pb: 2,

          justifyContent: {
            xs: "flex-start",
            sm: "flex-start",
          },

          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loading ? (
          [...Array(4)].map((_, index) => (
            <Box
              key={`skeleton-${index}`}
              sx={{
                flex: {
                  xs: "0 0 85vw",
                  sm: "0 0 320px",
                  md: "0 0 360px",
                  lg: "0 0 420px",
                  xl: "0 0 440px",
                },
                maxWidth: {
                  xs: "85vw",
                  sm: "320px",
                  md: "360px",
                  lg: "420px",
                  xl: "440px",
                },
                scrollSnapAlign: "center",
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
                animation="wave"
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                }}
              />
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Skeleton variant="text" width="60%" height={32} animation="wave" sx={{ mx: "auto" }} />
              </Box>
            </Box>
          ))
        ) : (
          services.map((service) => (
            <Box
            key={service.id}
            component={Link}
            to={`/services/${service.id}`}
            sx={{
              flex: {
                xs: "0 0 85vw",
                sm: "0 0 320px",
                md: "0 0 360px",
                lg: "0 0 420px",
                xl: "0 0 440px",
              },

              maxWidth: {
                xs: "85vw",
                sm: "320px",
                md: "360px",
                lg: "420px",
                xl: "440px",
              },

              scrollSnapAlign: "center",

              display: "flex",
              flexDirection: "column",

              borderRadius: 3,
              overflow: "hidden",

              bgcolor: "background.paper",

              boxShadow: 2,

              textDecoration: "none",

              transition: ".3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
              }}
            >
              <Box
                component="img"
                src={service.thumbnail}
                alt={service.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            <Box
              sx={{
                px: 3,
                py: 2.5,
                textAlign: "center",
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                  fontSize: {
                    xs: "1.1rem",
                    md: "1.25rem",
                  },
                  color: "text.primary",
                }}
              >
                {service.title}
              </Typography>
            </Box>
          </Box>
        )))}
      </Box>
    </Box>
  );
};

export default ServiceGrid;
