import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Camera,
  MessageSquare,
  CheckCircle,
  Aperture,
} from "lucide-react";
import { aboutData } from "../data/about.data";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={24} />,
  Aperture: <Aperture size={24} />,
  Camera: <Camera size={24} />,
  CheckCircle: <CheckCircle size={24} />,
};

export default function AboutPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const RED = "#E50914";
  const TEXT_PRIMARY = theme.palette.text.primary;
  const TEXT_SECONDARY = theme.palette.text.secondary;
  const BG_DEFAULT = theme.palette.background.default;

  return (
    <Box sx={{ width: "100%", backgroundColor: BG_DEFAULT, overflowX: "hidden" }}>

      {/* ─── Hero Header ─── */}
      <ScrollReveal animation="fadeUp">
        <Container maxWidth="md" sx={{ textAlign: "center", pt: { xs: 8, md: 12 }, pb: { xs: 5, md: 7 } }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.5,
              borderRadius: "100px",
              backgroundColor: "rgba(229, 9, 20, 0.08)",
              border: "1px solid rgba(229, 9, 20, 0.25)",
              mb: 3,
            }}
          >
            <Camera size={14} color={RED} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: RED,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
              }}
            >
              About Studio
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 700,
              color: TEXT_PRIMARY,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
              lineHeight: 1.15,
            }}
          >
            {aboutData.header.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: TEXT_SECONDARY,
              maxWidth: "560px",
              mx: "auto",
              mb: 4,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {aboutData.header.subtitle}
          </Typography>
          <Button
            component={RouterLink}
            to={aboutData.header.buttonLink}
            variant="contained"
            sx={{
              backgroundColor: RED,
              color: "#fff",
              borderRadius: "8px",
              px: 4,
              py: 1.25,
              fontWeight: 600,
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: "none",
              letterSpacing: 0.5,
              "&:hover": { backgroundColor: "#c40812", boxShadow: "0 8px 24px rgba(229,9,20,0.3)" },
            }}
          >
            {aboutData.header.buttonText}
          </Button>
        </Container>
      </ScrollReveal>

      {/* ─── Stats ─── */}
      <ScrollReveal animation="fadeUp" delay={0.05}>
        <Box sx={{ width: "100%", py: { xs: 5, md: 8 }, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#F4F5F7" }}>
          <Container maxWidth="lg">
            <StaggerContainer staggerDelay={0.1}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                  gap: { xs: 3, md: 4 },
                }}
              >
                {aboutData.stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                          fontWeight: 200,
                          lineHeight: 1,
                          color: TEXT_PRIMARY,
                          opacity: 0.25,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", md: "0.8rem" },
                          letterSpacing: "0.15em",
                          color: TEXT_SECONDARY,
                          textTransform: "uppercase",
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </StaggerItem>
                ))}
              </Box>
            </StaggerContainer>
          </Container>
        </Box>
      </ScrollReveal>

      {/* ─── Hero Image ─── */}
      <ScrollReveal animation="scaleUp">
        <Box
          sx={{
            width: "100%",
            height: { xs: "300px", sm: "450px", md: "600px" },
            my: { xs: 6, md: 10 },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={aboutData.heroImage}
            alt="Studio Team working"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          />
        </Box>
      </ScrollReveal>

      {/* ─── Statement ─── */}
      <ScrollReveal animation="fadeUp">
        <Container maxWidth="md" sx={{ textAlign: "center", pb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 600,
              color: TEXT_PRIMARY,
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.3rem" },
              lineHeight: 1.35,
            }}
          >
            {aboutData.statement.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: TEXT_SECONDARY,
              maxWidth: "620px",
              mx: "auto",
              mb: 4,
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.7,
            }}
          >
            {aboutData.statement.description}
          </Typography>
          <Button
            component={RouterLink}
            to={aboutData.statement.buttonLink}
            variant="contained"
            sx={{
              backgroundColor: RED,
              color: "#fff",
              borderRadius: "8px",
              px: 4,
              py: 1.25,
              fontWeight: 600,
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: "none",
              "&:hover": { backgroundColor: "#c40812", boxShadow: "0 8px 24px rgba(229,9,20,0.3)" },
            }}
          >
            {aboutData.statement.buttonText}
          </Button>
        </Container>
      </ScrollReveal>

      {/* ─── Differences ─── */}
      <ScrollReveal animation="fadeUp">
        <Box sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#F4F5F7", py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 600,
                color: TEXT_PRIMARY,
                textAlign: "center",
                mb: { xs: 5, md: 8 },
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              {aboutData.differences.title}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 5, md: 8 },
              }}
            >
              {/* Left column */}
              <Stack spacing={3}>
                {aboutData.differences.paragraphsLeft.map((p, idx) => (
                  <ScrollReveal key={idx} animation="slideLeft" delay={idx * 0.1}>
                    <Typography variant="body1" sx={{ color: TEXT_SECONDARY, lineHeight: 1.8, fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
                      {p}
                    </Typography>
                  </ScrollReveal>
                ))}
              </Stack>

              {/* Right column */}
              <Box>
                <ScrollReveal animation="slideRight">
                  <Typography variant="body1" sx={{ color: TEXT_SECONDARY, mb: 2, lineHeight: 1.8, fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
                    {aboutData.differences.paragraphsRightIntro}
                  </Typography>
                </ScrollReveal>
                <ScrollReveal animation="slideRight" delay={0.1}>
                  <Box
                    component="ul"
                    sx={{
                      color: TEXT_SECONDARY,
                      pl: 2,
                      mb: 3,
                      "& li": { mb: 1.5, lineHeight: 1.8, fontSize: { xs: "0.9rem", md: "0.95rem" } },
                    }}
                  >
                    {aboutData.differences.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </Box>
                </ScrollReveal>
                <ScrollReveal animation="slideRight" delay={0.2}>
                  <Typography variant="body1" sx={{ color: TEXT_SECONDARY, lineHeight: 1.8, fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
                    {aboutData.differences.paragraphsRightOutro}
                  </Typography>
                </ScrollReveal>
              </Box>
            </Box>
          </Container>
        </Box>
      </ScrollReveal>

      {/* ─── Team ─── */}
      <ScrollReveal animation="fadeUp">
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 600,
                color: TEXT_PRIMARY,
                mb: 1.5,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              {aboutData.teamSection.title}
            </Typography>
            <Typography variant="body1" sx={{ color: TEXT_SECONDARY, fontSize: { xs: "0.9rem", md: "1rem" } }}>
              {aboutData.teamSection.description}
            </Typography>
          </Box>

          <StaggerContainer staggerDelay={0.12}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                gap: { xs: 3, md: 4 },
              }}
            >
              {aboutData.teamSection.members.map((member, idx) => (
                <StaggerItem key={idx}>
                  <Box
                    sx={{
                      textAlign: "center",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                        "& img": { filter: "grayscale(0%)" },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: "100%",
                        height: { xs: 220, sm: 280, md: 320 },
                        objectFit: "cover",
                        filter: "grayscale(80%)",
                        transition: "filter 0.4s ease",
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: TEXT_PRIMARY, fontSize: "0.95rem" }}>
                        {member.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: RED, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.7rem" }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                </StaggerItem>
              ))}
            </Box>
          </StaggerContainer>
        </Container>
      </ScrollReveal>

      {/* ─── Process ─── */}
      <ScrollReveal animation="fadeUp">
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 600,
              color: TEXT_PRIMARY,
              mb: 1.5,
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {aboutData.processSection.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: TEXT_SECONDARY,
              maxWidth: "640px",
              mx: "auto",
              mb: { xs: 6, md: 10 },
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.7,
            }}
          >
            {aboutData.processSection.description}
          </Typography>

          <StaggerContainer staggerDelay={0.12}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
                gap: { xs: 3, md: 4 },
                mb: { xs: 6, md: 8 },
              }}
            >
              {aboutData.processSection.processes.map((process, index) => (
                <StaggerItem key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "visible",
                      pt: 5,
                      textAlign: "center",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {/* Icon circle */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -32,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: RED,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        border: `4px solid ${BG_DEFAULT}`,
                        boxShadow: "0 4px 20px rgba(229,9,20,0.3)",
                        zIndex: 2,
                      }}
                    >
                      {iconMap[process.iconName]}
                    </Box>

                    {/* Card body */}
                    <Box
                      sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      }}
                    >
                      <Box sx={{ bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#1a1a2e", py: 2, px: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#fff", fontFamily: '"Space Grotesk", sans-serif' }}>
                          {process.title}
                        </Typography>
                      </Box>
                      <Box
                        component="ul"
                        sx={{
                          px: 2.5,
                          py: 2.5,
                          m: 0,
                          textAlign: "left",
                          color: TEXT_SECONDARY,
                          "& li": { mb: 1, lineHeight: 1.7, fontSize: "0.85rem" },
                        }}
                      >
                        {process.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </StaggerItem>
              ))}
            </Box>
          </StaggerContainer>

          <Button
            component={RouterLink}
            to={aboutData.processSection.buttonLink}
            variant="contained"
            sx={{
              backgroundColor: RED,
              color: "#fff",
              borderRadius: "8px",
              px: 5,
              py: 1.25,
              fontWeight: 600,
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: "none",
              "&:hover": { backgroundColor: "#c40812", boxShadow: "0 8px 24px rgba(229,9,20,0.3)" },
            }}
          >
            {aboutData.processSection.buttonText}
          </Button>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
