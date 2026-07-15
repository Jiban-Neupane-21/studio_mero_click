import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Navigation,
} from "lucide-react";
import { socialMediaData } from "../data/socialmedia";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";

export default function ContactSection() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceName = params.get("service") || params.get("serviceId");
    if (serviceName) {
      setMessage(`Hello, I would like to book a studio session for "${serviceName}". Please let me know your available slots and pricing options. Thank you!`);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 5000);
  };

  const mapCoordinates = "27.6915° N, 85.3422° E";

  const contactDetails = [
    {
      icon: <MapPin size={18} />,
      title: "Our Address",
      lines: ["Rudramati Chowk, Kathmandu"],
    },
    {
      icon: <Clock size={18} />,
      title: "Business Hours",
      lines: ["Sun – Fri: 10:00 AM – 6:30 PM", "Saturday: Closed"],
    },
    {
      icon: <Phone size={18} />,
      title: "Phone",
      lines: ["+977-982336742"],
    },
    {
      icon: <Mail size={18} />,
      title: "Email",
      lines: ["studiomeroclick@gmail.com"],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Header */}
        <ScrollReveal animation="fadeUp">
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 700,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                mb: 1.5,
                color: "text.primary",
                lineHeight: 1.2,
              }}
            >
              Get In Touch With Us
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Main Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 5 },
            mb: { xs: 5, md: 7 },
          }}
        >
          {/* Left — Contact Details */}
          <ScrollReveal animation="slideLeft">
            <Box>
              <StaggerContainer staggerDelay={0.08}>
                <Stack spacing={2.5}>
                  {contactDetails.map((detail) => (
                    <StaggerItem key={detail.title}>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            backgroundColor: "rgba(229, 9, 20, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#E50914",
                            flexShrink: 0,
                          }}
                        >
                          {detail.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              fontSize: "0.875rem",
                              fontFamily: '"Space Grotesk", sans-serif',
                            }}
                          >
                            {detail.title}
                          </Typography>
                          {detail.lines.map((line, i) => (
                            <Typography
                              key={i}
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                fontWeight: 300,
                                mt: 0.3,
                                lineHeight: 1.5,
                                fontSize: "0.85rem",
                              }}
                            >
                              {line}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </StaggerItem>
                  ))}
                </Stack>
              </StaggerContainer>

              {/* Map Card */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: { xs: 2.5, sm: 3 },
                  border: "1px solid",
                  borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  borderRadius: "12px",
                  backgroundColor: "background.paper",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: 120 },
                    height: { xs: 100, sm: 120 },
                    borderRadius: "8px",
                    backgroundColor: isDark ? "#111" : "#f8fafc",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {[20, 45, 75].map((top) => (
                    <Box
                      key={`h-${top}`}
                      sx={{
                        position: "absolute",
                        top: `${top}%`,
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                      }}
                    />
                  ))}
                  {[20, 50, 80].map((left) => (
                    <Box
                      key={`v-${left}`}
                      sx={{
                        position: "absolute",
                        left: `${left}%`,
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                      }}
                    />
                  ))}
                  <Box
                    sx={{
                      color: "#E50914",
                      "@keyframes bounce": {
                        "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
                        "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
                      },
                      animation: "bounce 1s infinite",
                    }}
                  >
                    <MapPin size={22} />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.5rem", color: "text.secondary", mt: 0.5, fontFamily: "var(--font-mono)" }}
                  >
                    Rudramati Chowk
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#E50914", mb: 0.5, fontFamily: '"Space Grotesk", sans-serif' }}>
                    Interactive Satellite Nav Map
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2, fontFamily: "var(--font-mono)" }}>
                    {mapCoordinates}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open("https://maps.app.goo.gl/sswkczFkdBhMqDkR9", "_blank")}
                    startIcon={<Navigation size={12} />}
                    sx={{
                      color: "text.primary",
                      borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                      textTransform: "none",
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "0.75rem",
                      "&:hover": { borderColor: "#E50914", color: "#ff4d4d", backgroundColor: "rgba(229,9,20,0.05)" },
                    }}
                  >
                    Pinpoint Direction
                  </Button>
                </Box>
              </Paper>
            </Box>
          </ScrollReveal>

          {/* Right — Contact Form */}
          <ScrollReveal animation="slideRight">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                border: "1px solid",
                borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                borderRadius: "12px",
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                Send Us an Instant Inquiry
              </Typography>

              {isSubmitted ? (
                <Alert
                  severity="error"
                  sx={{
                    backgroundColor: "rgba(229, 9, 20, 0.08)",
                    color: "#E50914",
                    border: "1px solid rgba(229, 9, 20, 0.2)",
                    ".MuiAlert-icon": { color: "#E50914" },
                  }}
                >
                  We&apos;re currently unable to send your message through this form.
                  Please contact us directly:
                  <br />
                  Email: studiomeroclick@gmail.com
                  <br />
                  Phone: +977-9823367428
                </Alert>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small"
                        sx={textFieldSx(isDark)}
                      />
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        size="small"
                        sx={textFieldSx(isDark)}
                      />
                    </Box>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Write your message here..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      error={!!errors.message}
                      helperText={errors.message}
                      size="small"
                      sx={textFieldSx(isDark)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<Send size={14} />}
                      sx={{
                        backgroundColor: "#E50914",
                        color: "#ffffff",
                        fontFamily: '"Space Grotesk", sans-serif',
                        textTransform: "none",
                        px: 4,
                        py: 1.25,
                        fontWeight: 600,
                        borderRadius: "8px",
                        alignSelf: "flex-start",
                        "&:hover": {
                          backgroundColor: "#c40812",
                          boxShadow: "0 8px 24px rgba(229,9,20,0.35)",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </form>
              )}
            </Paper>
          </ScrollReveal>
        </Box>

        {/* Social Media Section */}
        <ScrollReveal animation="fadeUp">
          <Box
            sx={{
              pt: { xs: 4, md: 5 },
              borderTop: "1px solid",
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#E50914",
                mb: 1,
              }}
            >
              Follow Our Creative Work
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 300,
                mb: 3,
                lineHeight: 1.5,
                fontSize: "0.9rem",
              }}
            >
              Catch live backstage reels, composition tips, and daily cinematic stories.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(5, 1fr)",
                  sm: "repeat(5, 1fr)",
                },
                gap: { xs: 1, sm: 2 },
              }}
            >
              {socialMediaData.map((social) => {
                const Icon = social.icon;

                return (
                  <Box
                    key={social.id}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        p: { xs: 1.5, sm: 2.5 },
                        borderRadius: { xs: "10px", sm: "12px" },
                        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
                        border: "1px solid",
                        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: { xs: 0.5, sm: 1.5 },
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": {
                          borderColor: social.color,
                          transform: "translateY(-4px)",
                          boxShadow: `0 12px 30px ${social.color}25`,
                          "& .social-icon-wrapper": {
                            transform: "scale(1.1) rotate(5deg)",
                            backgroundColor: social.color,
                            color: "#ffffff",
                            boxShadow: `0 4px 15px ${social.color}50`,
                          },
                          "& .social-bg-glow": { opacity: 1 },
                        },
                      }}
                    >
                      <Box
                        className="social-bg-glow"
                        sx={{
                          position: "absolute",
                          right: "-10%",
                          top: "-20%",
                          width: "80px",
                          height: "80px",
                          background: `radial-gradient(circle, ${social.color} 0%, transparent 70%)`,
                          opacity: 0,
                          filter: "blur(20px)",
                          transition: "opacity 0.4s ease",
                        }}
                      />
                      <Box
                        className="social-icon-wrapper"
                        sx={{
                          width: { xs: 36, sm: 48 },
                          height: { xs: 36, sm: 48 },
                          borderRadius: "10px",
                          backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                          color: social.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          zIndex: 1,
                        }}
                      >
                        <Icon size={20} />
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: { xs: "0.65rem", sm: "0.85rem" },
                          textAlign: "center",
                          zIndex: 1,
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {social.name}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

function textFieldSx(isDark: boolean) {
  return {
    "& .MuiOutlinedInput-root": {
      color: "text.primary",
      borderRadius: "8px",
      "& fieldset": {
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
      },
      "&:hover fieldset": { borderColor: "#E50914" },
      "&.Mui-focused fieldset": { borderColor: "#E50914" },
    },
    "& .MuiInputLabel-root": { color: "text.secondary" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#E50914" },
  };
}
