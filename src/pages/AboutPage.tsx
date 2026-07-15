import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Camera,
  MessageSquare,
  CheckCircle,
  Aperture
} from "lucide-react";
import { aboutData } from "../data/about.data";

export default function AboutPage() {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
  const RED_PRIMARY = "#D32F2F";
  const BG_DEFAULT = theme.palette.background.default;
  const BG_PAPER = theme.palette.background.paper;
  const GREY_LIGHT = isDark ? "rgba(255, 255, 255, 0.02)" : "#F4F5F7";
  const TEXT_PRIMARY = theme.palette.text.primary;
  const TEXT_SECONDARY = theme.palette.text.secondary;
  const BUTTON_BG = isDark ? "#ffffff" : "#2B2B36";
  const BUTTON_TEXT = isDark ? "#000000" : "#FFFFFF";
  const HEADER_BG = isDark ? "rgba(255, 255, 255, 0.05)" : "#2B2B36";

  const iconMap: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare size={30} color="#ffffff" />,
    Aperture: <Aperture size={30} color="#ffffff" />,
    Camera: <Camera size={30} color="#ffffff" />,
    CheckCircle: <CheckCircle size={30} color="#ffffff" />,
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: BG_DEFAULT, overflowX: "hidden" }}>

      {/* 1. Header Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: TEXT_PRIMARY,
            mb: 3,
            fontSize: { xs: "2.5rem", md: "3.5rem" }
          }}
        >
          {aboutData.header.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: TEXT_SECONDARY,
            maxWidth: "600px",
            mx: "auto",
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6,
            whiteSpace: "pre-line"
          }}
        >
          {aboutData.header.subtitle}
        </Typography>
        <Button
          component={RouterLink}
          to={aboutData.header.buttonLink}
          variant="contained"
          sx={{
            backgroundColor: BUTTON_BG,
            color: BUTTON_TEXT,
            borderRadius: 0,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "none",
            "&:hover": { backgroundColor: RED_PRIMARY, boxShadow: "none" }
          }}
        >
          {aboutData.header.buttonText}
        </Button>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          width: "100%",
          py: { xs: 6, md: 10 },
          backgroundColor: GREY_LIGHT,
        }}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          rowSpacing={5}
          sx={{
            maxWidth: "1600px",
            mx: "auto",
            px: { xs: 3, sm: 5, md: 8 },
          }}
        >
          {aboutData.stats.map((stat, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  minWidth: 180,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "3rem",
                      sm: "4rem",
                      md: "4.8rem",
                    },
                    fontWeight: 200,
                    lineHeight: 1,
                    color: "#999595ff",
                  }}
                >
                  {stat.number}
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    fontWeight: 700,
                    fontSize: {
                      xs: "0.9rem",
                      md: "1rem",
                    },
                    letterSpacing: 2,
                    color: TEXT_PRIMARY,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 3. Hero Image */}
      <Box sx={{ width: "100%", height: { xs: "400px", md: "650px" }, mb: { xs: 8, md: 12 } }}>
        <Box
          component="img"
          src={aboutData.heroImage}
          alt="Studio Team working"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </Box>

      {/* 4. Statement Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", pb: { xs: 10, md: 14 } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: TEXT_PRIMARY,
            mb: 4,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            lineHeight: 1.4
          }}
        >
          {aboutData.statement.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: TEXT_SECONDARY,
            maxWidth: "700px",
            mx: "auto",
            mb: 5,
            fontSize: "1rem",
            lineHeight: 1.7
          }}
        >
          {aboutData.statement.description}
        </Typography>
        <Button
          component={RouterLink}
          to={aboutData.statement.buttonLink}
          variant="contained"
          sx={{
            backgroundColor: BUTTON_BG,
            color: BUTTON_TEXT,
            borderRadius: 0,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "none",
            "&:hover": { backgroundColor: RED_PRIMARY, boxShadow: "none" }
          }}
        >
          {aboutData.statement.buttonText}
        </Button>
      </Container>

      {/* 5. Differences Section (Grey Background) */}
      <Box sx={{ backgroundColor: GREY_LIGHT, py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: TEXT_PRIMARY,
              textAlign: "center",
              mb: { xs: 6, md: 10 },
              fontSize: { xs: "2rem", md: "2.8rem" }
            }}
          >
            {aboutData.differences.title}
          </Typography>
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid item xs={12} md={6}>
              {aboutData.differences.paragraphsLeft.map((p, idx) => (
                <Typography key={idx} variant="body1" sx={{ color: TEXT_SECONDARY, mb: idx === aboutData.differences.paragraphsLeft.length - 1 ? 0 : 3, lineHeight: 1.8 }}>
                  {p}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ color: TEXT_SECONDARY, mb: 3, lineHeight: 1.8 }}>
                {aboutData.differences.paragraphsRightIntro}
              </Typography>
              <Box component="ul" sx={{ color: TEXT_SECONDARY, pl: 3, mb: 4, lineHeight: 1.8 }}>
                {aboutData.differences.list.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "8px" }}>{item}</li>
                ))}
              </Box>
              <Typography variant="body1" sx={{ color: TEXT_SECONDARY, lineHeight: 1.8 }}>
                {aboutData.differences.paragraphsRightOutro}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: TEXT_PRIMARY,
            textAlign: "center",
            mb: 3,
            fontSize: { xs: "2rem", md: "2.8rem" }
          }}
        >
          {aboutData.teamSection.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: TEXT_SECONDARY,
            textAlign: "center",
            mb: { xs: 6, md: 10 },
            fontSize: "1.05rem",
          }}
        >
          {aboutData.teamSection.description}
        </Typography>

        <Grid container spacing={4}>
          {aboutData.teamSection.members.map((member, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: "100%",
                    height: 350,
                    objectFit: "cover",
                    mb: 2,
                    filter: "grayscale(100%)",
                    transition: "filter 0.3s ease",
                    "&:hover": { filter: "grayscale(0%)" }
                  }}
                />
                <Typography variant="h6" sx={{ color: TEXT_PRIMARY, fontWeight: 600, mb: 0.5 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: RED_PRIMARY, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 6. Process Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            color: TEXT_PRIMARY,
            mb: 3,
            fontSize: { xs: "2rem", md: "2.8rem" }
          }}
        >
          {aboutData.processSection.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: TEXT_SECONDARY,
            maxWidth: "800px",
            mx: "auto",
            mb: { xs: 8, md: 12 },
            fontSize: "1.05rem",
            lineHeight: 1.7
          }}
        >
          {aboutData.processSection.description}
        </Typography>

        <Grid
          container
          spacing={4}
          alignItems="stretch"
          justifyContent="center"
          sx={{ mb: { xs: 8, md: 10 } }}
        >
          {aboutData.processSection.processes.map((process, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                elevation={3}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 3,
                  overflow: "visible",
                  pt: 6,
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -35,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: RED_PRIMARY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    border: `5px solid ${BG_PAPER}`,
                    boxShadow: 3,
                  }}
                >
                  {iconMap[process.iconName]}
                </Box>

                {/* Header */}
                <CardHeader
                  title={process.title}
                  sx={{
                    bgcolor: HEADER_BG,
                    color: "#ffffff",
                    textAlign: "center",
                    py: 2,
                  }}
                  titleTypographyProps={{
                    variant: "h6",
                    fontWeight: 600,
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    bgcolor: GREY_LIGHT,
                    px: 3,
                    py: 3,
                  }}
                >
                  <Box
                    component="ul"
                    sx={{
                      pl: 2,
                      m: 0,
                      color: TEXT_SECONDARY,
                      "& li": {
                        mb: 1.5,
                        lineHeight: 1.7,
                      },
                    }}
                  >
                    {process.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          component={RouterLink}
          to={aboutData.processSection.buttonLink}
          variant="contained"
          sx={{
            backgroundColor: BUTTON_BG,
            color: BUTTON_TEXT,
            borderRadius: 0,
            px: 5,
            py: 1.5,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: "none",
            "&:hover": { backgroundColor: RED_PRIMARY, boxShadow: "none" }
          }}
        >
          {aboutData.processSection.buttonText}
        </Button>
      </Container>
    </Box>
  );
}
