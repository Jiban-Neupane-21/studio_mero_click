import { useRef } from "react";
import { Link } from "react-router-dom";

import { Box, IconButton, Typography, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";

import { useData } from "../../context/DataContext";

const GAP = 24;

const ServiceGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { services, loading, subCategoriesById } = useData();

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const visible = container.clientWidth;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -visible : visible,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", lg: "calc(100vh - 72px)" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                bgcolor: "action.hover",
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
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                bgcolor: "action.hover",
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
          alignItems: "flex-start",
          px: {
            xs: 2,
            md: 4,
          },

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
        {loading
          ? [...Array(4)].map((_, index) => (
              <Box
                key={`skeleton-${index}`}
                sx={{
                  flex: {
                    xs: "0 0 calc(100vw - 32px)",
                    sm: "0 0 calc(50vw - 28px)",
                    md: "0 0 calc(25vw - 34px)",
                  },
                  scrollSnapAlign: "start",
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
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={32}
                    animation="wave"
                    sx={{ mx: "auto" }}
                  />
                </Box>
              </Box>
            ))
          : services.map((service) => (
              <Box
                key={service.id}
                component={Link}
                to={`/services/${service.id}`}
                sx={{
                  flex: {
                    xs: "0 0 calc(100vw - 32px)",
                    sm: "0 0 calc(50vw - 28px)",
                    md: "0 0 calc(25vw - 34px)",
                  },
                  scrollSnapAlign: "start",

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
                  {subCategoriesById[service.sub_category_id]?.name && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#E50914",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      {subCategoriesById[service.sub_category_id].name}
                    </Typography>
                  )}
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
            ))}
      </Box>
    </Box>
  );
};

export default ServiceGrid;
