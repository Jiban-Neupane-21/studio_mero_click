/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Skeleton
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { offerAdsApi } from "../../api/offerAds";
import { homeItemsApi } from "../../api/homeItems";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [offers, setOffers] = useState<any[]>([]);
  const [homeImage, setHomeImage] = useState<string>("/Images/CompressJPEG.Online_img(1280x720).jpg");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersData, homeData] = await Promise.all([
          offerAdsApi.getOfferAds(),
          homeItemsApi.getHomeItems()
        ]);
        setOffers(offersData);
        if (homeData && homeData.length > 0) {
          setHomeImage(homeData[0].imageUrl);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (offers.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000); // Change offer every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [offers]);

  const activeOffer = offers[activeIndex];

  return (
    <Box
      sx={{
        height: {
          xs: "auto",
          lg: "calc(100vh - 180px)",
        },
        minHeight: {
          lg: "500px",
        },
        maxHeight: {
          lg: "700px",
        },
        mb: { xs: 6, md: 8 },
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          height: "100%",
        }}
      >
        {/* Left */}
        <Grid size={{ xs: 12, lg: 8.5 }} sx={{ height: { xs: "auto", lg: "100%" } }}>
          <Paper
            elevation={3}
            sx={{
              height: { xs: "280px", sm: "400px", lg: "100%" },
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              ) : (
                <Box
                  component="img"
                  src={homeImage}
                  alt="Hero"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right */}
        {/* Offer Section */}

        <Grid size={{ xs: 12, lg: 3.5 }} sx={{ height: { xs: "auto", lg: "100%" } }}>
          {loading ? (
            <Skeleton variant="rounded" width="100%" height="100%" sx={{ minHeight: { xs: "360px", sm: "450px", lg: "100%" }, borderRadius: 4 }} animation="wave" />
          ) : activeOffer ? (
            <Paper
              elevation={3}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "360px", sm: "450px", lg: "100%" },
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              {/* Background image fills the whole card */}
              <Box
                component="img"
                src={activeOffer.image}
                alt={activeOffer.title}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Gradient so text stays legible over any photo */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.15) 45%, transparent 65%)",
                }}
              />

              {/* Discount badge — top corner */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 56,
                  height: 56,
                  borderRadius: "20%",
                  bgcolor: "#E50914",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(229,9,20,.45)",
                  border: "2px solid rgba(255,255,255,0.85)",
                }}
              >
                <Typography
                  sx={{ fontWeight: 800, fontSize: "1rem", lineHeight: 1 }}
                >
                  {activeOffer.discount}
                </Typography>
                <Typography sx={{ fontSize: "0.5rem", letterSpacing: "0.05em" }}>
                  OFF
                </Typography>
              </Box>

              {/* Chevron nav — sits on the image, vertically centered */}
              <IconButton
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + offers.length) % offers.length,
                  )
                }
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.35)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
                }}
              >
                <ChevronLeft sx={{ fontSize: 20 }} />
              </IconButton>

              <IconButton
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % offers.length)
                }
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.35)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
                }}
              >
                <ChevronRight sx={{ fontSize: 20 }} />
              </IconButton>

              {/* Foreground content — title + dots, sitting on the gradient at the bottom */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Pagination dots */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    {offers.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          width: activeIndex === index ? 18 : 6,
                          height: 6,
                          borderRadius: 999,
                          cursor: "pointer",
                          transition: "all .3s ease",
                          bgcolor:
                            activeIndex === index
                              ? "#E50914"
                              : "rgba(255,255,255,0.45)",
                        }}
                      />
                    ))}
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: '"Fraunces", serif',
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      lineHeight: 1.25,
                      color: "#fff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {activeOffer.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Ending Soon
                  </Typography>

                  {/* View More */}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/offers/${activeOffer.id}`)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 99,
                      px: 1.75,
                      py: 0.5,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      bgcolor: "#E50914",
                      boxShadow: "0 6px 18px rgba(229,9,20,.3)",
                      "&:hover": {
                        bgcolor: "#c40812",
                        boxShadow: "0 10px 24px rgba(229,9,20,.45)",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </Paper>
          ) : (
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                height: { xs: "360px", sm: "450px", lg: "100%" },
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">Loading offers...</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
