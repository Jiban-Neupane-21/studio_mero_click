/* eslint-disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  IconButton,
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
  CheckCircle2,
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

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s",
      }}
      id="contact-root"
    >
      <Container maxWidth="xl" id="contact-container">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" }, gap: 6 }}>
          {/* Left Branch Contact Details */}
          <ScrollReveal animation="slideLeft">
            <Box sx={{ gridColumn: { md: "span 5" } }}>
            <Box sx={{ mb: 4 }}>
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
                  mb: 2.5,
                }}
              >
                <MapPin size={14} color="#E50914" />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    color: "#ff4d4d",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1rem",
                  }}
                >
                  Locate Our Studio
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  mb: 1.5,
                  color: "text.primary",
                }}
              >
                Get In Touch With Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  maxWidth: "420px",
                }}
              >
                Have custom dimensions required or need corporate booking rates?
                Contact us or drop by our studio in Central Kathmandu.
              </Typography>
            </Box>

            {/* Quick Details Cards stack */}
            <Stack spacing={3} sx={{ mb: 4 }} id="contact-details-stack">
              {/* Address card */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "rgba(229, 9, 20, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E50914",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: "0.875rem",
                    }}
                  >
                    Our Address
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 300,
                      mt: 0.5,
                      lineHeight: 1.4,
                    }}
                  >
                    Rudramati Chowk <br />
                  </Typography>
                </Box>
              </Box>

              {/* Time opening card */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "rgba(229, 9, 20, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E50914",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={18} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: "0.875rem",
                    }}
                  >
                    Studio Business Hours
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 300,
                      mt: 0.5,
                      lineHeight: 1.4,
                    }}
                  >
                    Sunday – Friday: 10:00 AM – 6:30 PM <br />
                    Saturday: Closed (Pre-booked events only)
                  </Typography>
                </Box>
              </Box>

              {/* Contact numbers card */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "rgba(229, 9, 20, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E50914",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={18} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: "0.875rem",
                    }}
                  >
                    Phone Contacts
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 300,
                      mt: 0.5,
                      lineHeight: 1.4,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Cell / WhatsApp: +977-982336742
                  </Typography>
                </Box>
              </Box>

              {/* Email contact */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    backgroundColor: "rgba(229, 9, 20, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E50914",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      fontSize: "0.875rem",
                    }}
                  >
                    Email Inquiries
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 300,
                      mt: 0.5,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    studiomeroclick@gmail.com{" "}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
          </ScrollReveal>

          {/* Right Interactive Messaging Form / Map representation */}
          <ScrollReveal animation="slideRight">
            <Box sx={{ gridColumn: { md: "span 7" } }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 3 }}>
              {/* Form card */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    border: "1px solid",
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    transition: "background-color 0.3s, border-color 0.3s",
                  }}
                  id="contact-form-panel"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 600,
                      mb: 3,
                      color: "text.primary",
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
                        mb: 1,
                        ".MuiAlert-icon": { color: "#E50914" },
                      }}
                    >
                      We're sorry, but we're currently unable to send your message through this form. Please contact us directly using the details below, and we'll be happy to assist you. <br />
                      Email: studiomeroclick@gmail.com
                      Phone: +977-9823367428
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} id="contact-inquiry-form">
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2.5 }}>
                        <Box>
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
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "text.primary",
                                "& fieldset": {
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.1)",
                                },
                                "&:hover fieldset": { borderColor: "#E50914" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#E50914",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "text.secondary",
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#E50914",
                              },
                            }}
                          />
                        </Box>
                        <Box>
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
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "text.primary",
                                "& fieldset": {
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.1)",
                                },
                                "&:hover fieldset": { borderColor: "#E50914" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#E50914",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "text.secondary",
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#E50914",
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ gridColumn: { sm: "span 2" } }}>
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
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "text.primary",
                                "& fieldset": {
                                  borderColor: isDark
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(0,0,0,0.1)",
                                },
                                "&:hover fieldset": { borderColor: "#E50914" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#E50914",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "text.secondary",
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#E50914",
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ gridColumn: { sm: "span 2" } }}>
                          <Button
                            type="submit"
                            variant="contained"
                            endIcon={<Send size={14} />}
                            id="submit-contact-form-btn"
                            sx={{
                              backgroundColor: isDark ? "#ffffff" : "#0f172a",
                              color: isDark ? "#000000" : "#ffffff",
                              fontFamily: '"Space Grotesk", sans-serif',
                              textTransform: "none",
                              px: 3.5,
                              py: 1.25,
                              fontWeight: 600,
                              borderRadius: "4px",
                              "&:hover": {
                                backgroundColor: "#E50914",
                                color: "#ffffff",
                              },
                            }}
                          >
                            Send Message
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </Paper>
              </Box>

              {/* Map mockup card */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 3,
                    transition: "background-color 0.3s, border-color 0.3s",
                  }}
                  id="contact-map-mockup"
                >
                  {/* Decorative Map graphic */}
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 110 },
                      height: 110,
                      borderRadius: "6px",
                      backgroundColor: isDark ? "#111111" : "#f8fafc",
                      border: "1px solid",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {/* Simulated abstract maps grid */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "15%",
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "45%",
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "75%",
                        left: 0,
                        right: 0,
                        height: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "15%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "80%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    />

                    {/* Coordinates Gold pin */}
                    <Box
                      sx={{
                        color: "#E50914",
                        position: "relative",
                        zIndex: 2,
                        "@keyframes bounce": {
                          "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
                          "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" }
                        },
                        animation: "bounce 1s infinite"
                      }}
                    >
                      <MapPin size={24} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "0.55rem",
                        color: "text.secondary",
                        mt: 0.5,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Rudramati Chowck
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "#E50914", mb: 0.5 }}
                    >
                      Interactive Satellite Nav Map
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 2,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Latitude/Longitude: {mapCoordinates}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        window.open(
                          "https://maps.app.goo.gl/sswkczFkdBhMqDkR9",
                          "_blank",
                        )
                      }
                      id="external-maps-btn"
                      sx={{
                        color: "text.primary",
                        borderColor: isDark
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.15)",
                        textTransform: "none",
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontSize: "0.75rem",
                        "&:hover": {
                          borderColor: "#E50914",
                          color: "#ff4d4d",
                          backgroundColor: "rgba(229,9,20,0.05)",
                        },
                      }}
                      startIcon={<Navigation size={12} />}
                    >
                      Pinpoint Direction
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
          </ScrollReveal>
        </Box>
        <ScrollReveal animation="fadeUp">
        <Box
          sx={{
            mt: 5,
            pt: 4,
            borderTop: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          }}
          id="contact-socials-block"
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
              mb: 1.5,
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
            }}
          >
            Catch live backstage production reels, discover professional
            composition tips, and see our daily cinematic stories on our social
            feeds.
          </Typography>

          <Box
            sx={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", gap: { xs: 1.5, md: 2 } }}
            id="socials-container-grid"
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
                  sx={{ textDecoration: "none", display: "block", flex: 1, minWidth: { xs: '45px', sm: '150px' } }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      p: { xs: 1.5, md: 2.5 },
                      borderRadius: { xs: "12px", md: "16px" },
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.02)"
                        : "#ffffff",
                      border: "1px solid",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.06)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1.5,
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      "&:hover": {
                        backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                        borderColor: social.color,
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 30px ${social.color}25`,
                        "& .social-icon-wrapper": {
                          transform: "scale(1.1) rotate(5deg)",
                          backgroundColor: social.color,
                          color: "#ffffff",
                          boxShadow: `0 4px 15px ${social.color}50`
                        },
                        "& .social-bg-glow": {
                           opacity: 1
                        }
                      },
                    }}
                  >
                    <Box
                      className="social-bg-glow"
                      sx={{
                        position: 'absolute',
                        right: '-10%',
                        top: '-20%',
                        width: '80px',
                        height: '80px',
                        background: `radial-gradient(circle, ${social.color} 0%, transparent 70%)`,
                        opacity: 0,
                        filter: 'blur(20px)',
                        transition: 'opacity 0.4s ease'
                      }}
                    />
                    <Box
                      className="social-icon-wrapper"
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                        color: social.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        zIndex: 1
                      }}
                    >
                      <Icon size={24} />
                    </Box>
                    <Box sx={{ zIndex: 1, display: { xs: 'none', sm: 'block' } }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontFamily: '"Space Grotesk", sans-serif',
                          letterSpacing: '-0.01em',
                          fontSize: '1.05rem',
                          textAlign: 'center'
                        }}
                      >
                        {social.name}
                      </Typography>
                    </Box>
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
