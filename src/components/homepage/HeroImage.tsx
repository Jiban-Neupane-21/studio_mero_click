/* eslint-disable */
// @ts-nocheck
import { Box, Paper, Typography, Skeleton } from "@mui/material";
import { useData } from "../../context/DataContext";

const Hero = () => {
  const { homeItems, loading } = useData();

  const homeImage = homeItems && homeItems.length > 0 ? homeItems[0].imageUrl : "/Images/CompressJPEG.Online_img(1280x720).jpg";
  const homeDescription = homeItems && homeItems.length > 0 ? homeItems[0].description : "";

  return (
    <Box
      sx={{
        height: { xs: "auto", lg: "calc(100vh - 72px)" },
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
      >
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        ) : (
          <>
            <Box
              component="img"
              src={homeImage}
              alt="Hero"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
            {homeDescription && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  px: { xs: 3, md: 6 },
                  py: { xs: 3, md: 5 },
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "1rem", md: "1.35rem" },
                    fontWeight: 500,
                    fontFamily: "'Fraunces', serif",
                    maxWidth: 700,
                    lineHeight: 1.5,
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {homeDescription}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Hero;
