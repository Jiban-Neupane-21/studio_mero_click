import { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import { FaPhone } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LockIcon from "@mui/icons-material/Lock";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { navItems } from "../../data/navitem";
import { socialMediaData } from "../../data/socialmedia";
import { ColorModeContext } from "../../App";
import { services } from "../../data/service.data";

const drawerWidth = 280;

const Navbar = () => {
  const { mode, toggleMode } = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [servicesMenuAnchorEl, setServicesMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const handleServicesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesMenuAnchorEl(event.currentTarget);
  };

  const handleServicesMenuClose = () => {
    setServicesMenuAnchorEl(null);
  };

  const handleMobileServicesClick = () => {
    setMobileServicesOpen(!mobileServicesOpen);
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
  const getBrandColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return "#1877F2";
      case "instagram":
        return "#E4405F";
      case "twitter":
      case "x":
        return "#000000";
      case "youtube":
        return "#FF0000";
      case "linkedin":
        return "#0A66C2";
      case "tiktok":
        return "#000000";
      case "pinterest":
        return "#E60023";
      case "whatsapp":
        return "#25D366";
      default:
        return "#E50914"; // fallback to brand red
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
            color: "text.secondary",
            py: 1.25,
            width: "100%",
            zIndex: 1100,
            borderBottom: 1,
            borderColor: "divider",
            fontSize: "0.75rem",
            fontFamily: '"Space Grotesk", sans-serif',
            "@keyframes slideDownBar": {
              "0%": { opacity: 0, transform: "translateY(-100%)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
            animation:
              "slideDownBar 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          id="navbar-top-utility-bar"
        >
          <Box sx={{ px: { xs: 2, sm: 4 }, width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
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
                  onClick={() => (window.location.href = "tel:+9779823367428")}
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
                  onClick={() =>
                    (window.location.href = "mailto:studiomeroclick@gmail.com")
                  }
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

              {/* Right: Social Media — 35mm filmstrip treatment */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",

                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    height: "3px",
                  },
                  "&::before": { top: 0 },
                  "&::after": { bottom: 0 },
                }}
              >
                {socialMediaData.map((item, i) => {
                  const Icon = item.icon;
                  const title = getSocialTitle(item.name);
                  const brandColor = getBrandColor(item.name);
                  const isLast = i === socialMediaData.length - 1;

                  return (
                    <Button
                      key={item.id}
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={title}
                      sx={{
                        minWidth: "36px",
                        width: "36px",
                        height: "36px",
                        borderRadius: 0,
                        borderRight: isLast ? "none" : `1px solid`,
                        borderColor: "divider",
                        p: 0,
                        backgroundColor: "transparent",
                        color: brandColor,
                        opacity: 0.85,
                        transition:
                          "opacity 0.2s ease, background-color 0.2s ease",
                        "&:hover, &:focus-visible": {
                          opacity: 1,
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <Icon size={14} />
                    </Button>
                  );
                })}

                {/* Utility Icons (Theme Toggle & Login) */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ml: { xs: 0, sm: 2 },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      color: "text.primary",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {mode} Mode
                  </Typography>
                  <IconButton
                    onClick={toggleMode}
                    size="small"
                    sx={{ color: "text.primary" }}
                    title="Toggle Theme"
                  >
                    {mode === "dark" ? (
                      <Brightness7Icon fontSize="small" />
                    ) : (
                      <Brightness4Icon fontSize="small" />
                    )}
                  </IconButton>

                  <IconButton
                    onClick={() => navigate("/login")}
                    size="small"
                    sx={{ color: "text.primary" }}
                    title="Admin Login"
                  >
                    <LockIcon fontSize="small" />
                  </IconButton>
                </Box>
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
              {navItems.map((item) =>
                item.id === "services" ? (
                  <Box key={item.id} onMouseLeave={handleServicesMenuClose}>
                    <Typography
                      component={item.path ? NavLink : "div"}
                      to={item.path || undefined}
                      aria-controls="services-menu"
                      aria-haspopup="true"
                      onMouseEnter={handleServicesMenuOpen}
                      color="inherit"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        textTransform: "none",
                        textDecoration: "none",
                        color: "text.primary",
                        "&.active": {
                          textDecoration: "underline",
                          textDecorationColor: "#E50914",
                          textUnderlineOffset: "5px",
                          textDecorationThickness: "2px",
                        },
                        "&:hover": {
                          color: "#E50914",
                        },
                      }}
                    >
                      {item.title}
                      <ArrowDropDownIcon />
                    </Typography>
                    <Menu
                      id="services-menu"
                      anchorEl={servicesMenuAnchorEl}
                      keepMounted
                      open={Boolean(servicesMenuAnchorEl)}
                      onClose={handleServicesMenuClose}
                      slotProps={{
                        list: {
                          onMouseLeave: handleServicesMenuClose,
                          sx: { p: 0 },
                        },
                        paper: {
                          elevation: 0,
                          sx: {
                            mt: 1.5,
                            width: 640,
                            maxWidth: "calc(100vw - 32px)",
                            borderRadius: "16px",
                            overflow: "hidden",
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
                            "@keyframes dropdownFadeIn": {
                              "0%": {
                                opacity: 0,
                                transform: "translateY(-8px)",
                              },
                              "100%": {
                                opacity: 1,
                                transform: "translateY(0)",
                              },
                            },
                            animation: "dropdownFadeIn 0.25s ease-out forwards",
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "left", vertical: "top" }}
                      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    >
                      <Box sx={{ p: 3 }}>
                        {/* Header */}
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            color: "#E50914",
                            mb: 0.5,
                          }}
                        >
                          Studio Specialties
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                          }}
                        >
                          Choose an option to see details, pricing, and book
                          online.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Two-column list */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            columnGap: 4,
                            rowGap: 1,
                          }}
                        >
                          {services.map((service) => {
                            const Icon = service.icon;
                            return (
                              <Box
                                key={service.id}
                                component={Link}
                                to={service.path}
                                onClick={handleServicesMenuClose}
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 1.5,
                                  p: 1,
                                  borderRadius: "10px",
                                  textDecoration: "none",
                                  color: "text.primary",
                                  transition: "background-color 0.2s ease",
                                  "&:hover": {
                                    bgcolor: "action.hover",
                                    "& .service-title": { color: "#E50914" },
                                    "& .service-icon": { color: "#E50914" },
                                  },
                                }}
                              >
                                <Box
                                  className="service-icon"
                                  sx={{
                                    flexShrink: 0,
                                    width: 40,
                                    height: 40,
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "action.selected",
                                    color: "text.secondary",
                                    transition: "color 0.2s ease",
                                  }}
                                >
                                  {Icon && <Icon fontSize="small" />}
                                </Box>
                                <Box>
                                  <Typography
                                    className="service-title"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "0.88rem",
                                      color: "text.primary",
                                      lineHeight: 1.3,
                                      transition: "color 0.2s ease",
                                    }}
                                  >
                                    {service.title}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.76rem",
                                      color: "text.secondary",
                                      lineHeight: 1.35,
                                    }}
                                  >
                                    {service.description}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <MenuItem
                          component={Link}
                          to="/services"
                          onClick={handleServicesMenuClose}
                          sx={{
                            p: 1.5,
                            borderRadius: "10px",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: "action.hover",
                              "& .view-all-text": {
                                color: "#E50914",
                              },
                            },
                          }}
                        >
                          <ListItemText
                            primary="View All Services"
                            className="view-all-text"
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: 700,
                                fontSize: "0.88rem",
                              },
                            }}
                          />
                          <ArrowForwardIcon fontSize="small" />
                        </MenuItem>
                      </Box>
                    </Menu>
                  </Box>
                ) : (
                  <Box key={item.id}>
                    <Typography
                      component={NavLink}
                      to={item.path}
                      sx={{
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        textTransform: "none",
                        textDecoration: "none",
                        color: "text.primary",
                        "&.active": {
                          textDecoration: "underline",
                          textDecorationColor: "#E50914",
                          textUnderlineOffset: "5px",
                          textDecorationThickness: "2px",
                        },
                        "&:hover": {
                          color: "#E50914",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                ),
              )}
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

            if (item.id === "services") {
              return (
                <div key={item.id}>
                  <ListItemButton onClick={handleMobileServicesClick}>
                    {Icon && (
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={item.title} />
                    {mobileServicesOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={mobileServicesOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <ListItemButton
                            key={service.id}
                            component={NavLink}
                            to={service.path} // Use NavLink for active styles
                            onClick={toggleDrawer(false)}
                            sx={{
                              pl: 4,
                              "&.active": {
                                color: "#E50914",
                              },
                            }}
                          >
                            {Icon && (
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <Icon fontSize="small" />
                              </ListItemIcon>
                            )}
                            <ListItemText primary={service.title} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </div>
              );
            } else {
              return (
                <ListItemButton
                  key={item.id}
                  component={NavLink}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    "&.active": {
                      bgcolor: "action.selected",
                      color: "#E50914",
                    },
                  }}
                >
                  {Icon && (
                    <ListItemIcon>
                      <Icon /> {/* Icon color will inherit from parent */}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.title} />
                </ListItemButton>
              );
            }
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
