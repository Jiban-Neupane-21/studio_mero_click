import { useState, useContext } from "react";
import { motion } from "motion/react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { FaPhone } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LockIcon from "@mui/icons-material/Lock";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { navItems } from "../../data/navitem";
import { socialMediaData } from "../../data/socialmedia";
import { ColorModeContext } from "../../App";

const drawerWidth = 280;

const Navbar = () => {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const getSocialTitle = (name: string) => {
    switch (name.toLowerCase()) {
      case "youtube":
        return `Subscribe on ${name}`;
      case "whatsapp":
        return `Chat on ${name}`;
      default:
        return `Follow on ${name}`;
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            // backgroundColor: mode === "dark" ? "#000000" : "#111111",
            color: "text.secondary",
            py: 1.25,
            width: "100%",
            zIndex: 1100,
            borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"}`,
            fontSize: "0.75rem",
            fontFamily: '"Space Grotesk", sans-serif',
            "@keyframes slideDownBar": {
              "0%": { opacity: 0, transform: "translateY(-100%)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
            animation: "slideDownBar 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          id="navbar-top-utility-bar"
        >
          <Box sx={{ px: { xs: 2, sm: 4 }, width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: { xs: "center", md: "center" },
                alignItems: "center",
                flexWrap: "wrap",
                gap: { xs: 1, sm: 2 },
              }}
            >
              {/* Left: Contact Info */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                  gap: { xs: 1.5, sm: 4 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    transition: "color 0.2s",
                    "&:hover": { color: "text.primary" },
                    cursor: "pointer",
                  }}
                >
                  <FaPhone size={14} className="text-brand-red" />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 500, letterSpacing: "0.05em" }}
                  >
                    +977-9823367428
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    transition: "color 0.2s",
                    "&:hover": { color: "text.primary" },
                    cursor: "pointer",
                  }}
                >
                  <MdEmail size={14} className="text-brand-red" />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 500, letterSpacing: "0.05em" }}
                  >
                    studiomeroclick@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* Right: Social Media */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                  p: 0.5,
                  px: 1.5,
                  background: mode === 'dark' ? "#1E1E1E" : "#FFFFFF",
                  border: mode === 'dark' ? "1px solid #444" : "1px solid #000000",
                  "@keyframes shimmer": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                  },
                  "@keyframes pulseGlow": {
                    "0%, 100%": { boxShadow: "3px 3px 0px #E50914" },
                    "50%": { boxShadow: "5px 5px 0px #000000" },
                  },
                  "@keyframes iconBounce": {
                    "0%": { transform: "translateY(0) scale(1)" },
                    "50%": { transform: "translateY(-5px) scale(1.15)" },
                    "100%": { transform: "translateY(0) scale(1)" },
                  },
                  animation: "pulseGlow 3s ease-in-out 1",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.1), transparent)",
                    animation: "shimmer 2s linear 1",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontSize: "0.65rem",
                    mr: 1,
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  FOLLOW US:
                </Typography>

                {socialMediaData.map((item, i) => {
                  const Icon = item.icon;
                  const title = getSocialTitle(item.name);

                  return (
                    <Button
                      key={item.id}
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={title}
                      sx={{
                        minWidth: "26px",
                        width: "26px",
                        height: "26px",
                        borderRadius: "4px",
                        p: 0,
                        backgroundColor: mode === 'dark' ? "#333" : "#000000",
                        border: "1px solid #E50914",
                        color: "#FFFFFF",
                        transition:
                          "all 0.25s ease",
                        animation: `iconBounce 1s ease-in-out ${i * 0.15}s 1`,
                        "&:hover": {
                          color: "#E50914",
                          backgroundColor: "#FFFFFF",
                          borderColor: "#000000",
                          boxShadow: "2px 2px 0px #E50914",
                          transform: "translateY(-3px) scale(1.15)",
                        },
                      }}
                    >
                      <Icon size={14} />
                    </Button>
                  );
                })}
              </Box>

              {/* Utility Icons (Theme Toggle & Login) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0, sm: 2 } }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 600, 
                    textTransform: 'capitalize',
                    color: 'text.primary',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {mode} Mode
                </Typography>
                <IconButton
                  onClick={toggleMode}
                  size="small"
                  sx={{ color: mode === 'dark' ? '#fff' : '#000' }}
                  title="Toggle Theme"
                >
                  {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>

                <IconButton
                  onClick={() => navigate('/login')}
                  size="small"
                  sx={{ color: mode === 'dark' ? '#fff' : '#000' }}
                  title="Admin Login"
                >
                  <LockIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Logo and icons */}
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 72 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                flexGrow: 1,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.85 },
              }}
            >
              <Box
                component="img"
                src="/Logo.png" // Assumes logo is in /public/Logo.png
                alt="Studio Mero Click"
                sx={{
                  height: { xs: 34, sm: 42 },
                  width: "auto",
                  display: "block",
                }}
              />

              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  lineHeight: 1.1,
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    letterSpacing: ".05rem",
                    color: "text.primary",
                    lineHeight: 1.1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  STUDIO MERO
                  <Box component="span" sx={{ color: "#E50914", ml: 1 }}>
                    CLICK
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    color: "#ef4444",
                    fontWeight: "bold",
                    display: "block",
                    textTransform: "uppercase",
                    mt: -0.5,
                  }}
                >
                  RUDRAMATI CHOWK, KATHMANDU
                </Typography>
              </Box>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navItems.map((item, index) => (
                <Box key={item.id}>
                  <Button
                    component={NavLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                      display: "flex",
                      "&.active": {
                        color: "#fff",
                        bgcolor: "#E50914",
                      },
                    }}
                  >
                    {item.title.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.01, 
                          delay: (index * 0.15) + (charIndex * 0.04) 
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </Button>
                </Box>
              ))}
              <Button
                component={Link}
                to="/book"
                variant="contained"
                sx={{
                  ml: { md: 2, lg: 3 },
                  bgcolor: "#E50914",
                  color: "#ffffff",
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  borderRadius: "4px",
                  boxShadow: "0 4px 14px rgba(229, 9, 20, 0.4)",
                  "&:hover": {
                    bgcolor: "#B71C1C",
                    boxShadow: "0 6px 20px rgba(229, 9, 20, 0.6)",
                  },
                }}
              >
                Book Studio
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                component={Link}
                to="/book"
                variant="contained"
                sx={{
                  mr: 1,
                  bgcolor: "#E50914",
                  color: "#ffffff",
                  fontWeight: 700,
                  px: { xs: 2, sm: 3 },
                  py: 0.75,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(229, 9, 20, 0.4)",
                  "&:hover": {
                    bgcolor: "#B71C1C",
                  },
                }}
              >
                Book Studio
              </Button>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Button
            component={Link}
            to="/book"
            variant="contained"
            sx={{
              ml: { md: 2, lg: 3 },
              bgcolor: "#E50914",
              color: "#ffffff",
              fontWeight: 700,
              px: 3,
              py: 1,
              borderRadius: "4px",
              boxShadow: "0 4px 14px rgba(229, 9, 20, 0.4)",
              "&:hover": {
                bgcolor: "#B71C1C",
                boxShadow: "0 6px 20px rgba(229, 9, 20, 0.6)",
              },
            }}
          >
            Book Studio
          </Button>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>

          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <ListItemButton
                key={item.id}
                component={NavLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  color: "text.primary",
                  "&.active": {
                    bgcolor: "action.selected",
                    color: "#E50914",
                  },
                }}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}

                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;




