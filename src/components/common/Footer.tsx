/* eslint-disable */
import { Box, Container, Typography, Divider } from "@mui/material";
import { MapPin, PhoneCall, Mail, ExternalLink } from "lucide-react";
import logo from "/Logo.png"; 
import { socialMediaData } from "../../data/socialmedia";

interface FooterProps {
  mode: "dark" | "light";
  handleScrollToSection: (sectionId: string) => void;
}

const Footer = ({ mode, handleScrollToSection }: FooterProps) => {
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDark ? "#111111" : "#f1f5f9",
        color: isDark ? "#cbd5e1" : "#475569",
        borderTop: isDark ? "1px solid rgba(229, 9, 20, 0.25)" : "1px solid rgba(229, 9, 20, 0.1)",
        transition: "background-color 0.3s, color 0.3s",
      }}
      id="app-footer"
    >
      <Container maxWidth="xl" id="footer-container">
        {/* Main Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "4.5fr 3.5fr 4fr" },
            gap: { xs: 5, md: 8 },
          }}
        >
          {/* Column 1: Logo & Studio Info */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "rgba(229, 9, 20, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.5,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Studio Mero Click"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  color: isDark ? "#ffffff" : "#0f172a",
                  letterSpacing: "0.05em",
                }}
              >
                STUDIOMERO<Box component="span" sx={{ color: "#E50914" }}>CLICK</Box>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                mb: 3,
                pr: { md: 4 },
                lineHeight: 1.6,
                color: isDark ? "#cbd5e1" : "#475569",
              }}
            >
              Our Kathmandu-based photo studio provides passport validation,
              professional wedding videos, framing solutions, and portrait
              work matching strict criteria.
            </Typography>

            {/* Location */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <MapPin size={16} color="#E50914" />
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontSize: "0.85rem",
                }}
              >
                Rudramati Anamnagar Kathmandu
              </Typography>
            </Box>

            {/* Social Media Integrations */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 2, flexWrap: "wrap" }}>
              {socialMediaData.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Box
                    key={social.id}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                      color: isDark ? "#cbd5e1" : "#475569",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#ffffff",
                        backgroundColor: social.color || "#E50914",
                        borderColor: social.color || "#E50914",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(229, 9, 20, 0.2)",
                      },
                    }}
                  >
                    <IconComponent size={14} />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Column 2: Quick Navigation Links */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: isDark ? "#ffffff" : "#0f172a",
                fontWeight: 600,
                mb: 3,
                letterSpacing: "0.05em",
              }}
            >
              Quick Navigation Links
            </Typography>
            
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("home")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Home (Main)
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("visa-guides")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Online Resizer
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("services")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Studio Services
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("portfolio")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Our Portfolio
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("pricing")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Pricing Sheets
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => handleScrollToSection("contact")}
                  sx={{
                    cursor: "pointer",
                    color: isDark ? "#cbd5e1" : "#475569",
                    "&:hover": { color: "#E50914" },
                    transition: "color 0.2s",
                  }}
                >
                  Contact details
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Column 3: Branch Service Channels */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                color: isDark ? "#ffffff" : "#0f172a",
                fontWeight: 600,
                mb: 3,
                letterSpacing: "0.05em",
              }}
            >
              Branch Service Channels
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneCall size={14} color="#E50914" />
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#cbd5e1" : "#475569" }}
                >
                  +977-9823367428 (Rudramati Anamnagar)
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Mail size={14} color="#E50914" />
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#cbd5e1" : "#475569" }}
                >
                  studiomeroclick@gmail.com
                </Typography>
              </Box>
            </Box>

            <Divider
              sx={{
                my: 2.5,
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                display: "block",
                fontSize: "0.85rem",
              }}
            >
              * Studio hours are Sun - Fri, 08:00 AM to 8:00 PM.
            </Typography>
          </Box>
        </Box>

        {/* Bottom copyright & certification line */}
        <Divider
          sx={{
            my: 4,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: isDark ? "#7c8ba1" : "#64748b", fontSize: "0.85rem" }}
          >
            © 2026 Studio Mero Click Kathmandu. All rights reserved.
          </Typography>

          <Box
            onClick={() => handleScrollToSection("visa-guides")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              color: isDark ? "#7c8ba1" : "#64748b",
              transition: "color 0.2s",
              "&:hover": { color: "#E50914" },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "0.85rem", color: "inherit" }}
            >
              Bespoke design for academic, corporate & biometric compliance.
            </Typography>
            <ExternalLink size={10} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
