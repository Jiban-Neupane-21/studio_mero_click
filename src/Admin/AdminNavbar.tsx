import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  LayoutDashboard,
  Briefcase,
  Package,
  Image as ImageIcon,
  Video,
  PlaySquare,
  BookOpen,
  Megaphone,
  Tag,
  Star,
  HelpCircle,
  Share2,
  Navigation,
  Menu,
  LogOut,
  Settings
} from 'lucide-react';
import { supabase } from '../utils/supabase';

const DRAWER_WIDTH = 260;

const adminLinks = [
  { name: 'Home', path: '/admin', icon: LayoutDashboard },
  { name: 'Services', path: '/admin/services', icon: Briefcase },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Portfolio', path: '/admin/portfolio', icon: ImageIcon },
  { name: 'Video Items', path: '/admin/videos', icon: Video },
  { name: 'Tutorial Videos', path: '/admin/tutorials', icon: PlaySquare },
  { name: 'Learning Articles', path: '/admin/learning', icon: BookOpen },
  { name: 'Offer Ads', path: '/admin/offer-ads', icon: Megaphone },
];

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, height: 64, flexShrink: 0 }}>
        <Box
          sx={{
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1.5
          }}
        >
          <img src="/Logo.png" alt="Logo" style={{ height: '100%', objectFit: 'contain' }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary" letterSpacing={-0.5}>
          Admin Panel
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box sx={{ overflow: 'auto', flex: 1, px: 2, py: 2 }} className="custom-scrollbar">
        <List sx={{ pt: 0, gap: 0.5, display: 'flex', flexDirection: 'column' }}>
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.path === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(link.path);

            return (
              <ListItem key={link.name} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: isActive ? '#ffebee' : 'transparent',
                    color: isActive ? 'error.dark' : 'text.secondary',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: isActive ? '#ffebee' : 'grey.50',
                      color: isActive ? 'error.dark' : 'text.primary',
                    },
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: 32,
                      width: 4,
                      bgcolor: 'error.main',
                      borderTopRightRadius: 4,
                      borderBottomRightRadius: 4,
                    } : {}
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'error.main' : 'inherit' }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={link.name}
                    slotProps={{ primary: { fontWeight: isActive ? 600 : 500, fontSize: '0.875rem' } }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Area */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut} sx={{ borderRadius: 2, color: 'error.main', '&:hover': { bgcolor: 'error.50' } }}>
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}><LogOut size={20} /></ListItemIcon>
                <ListItemText primary="Sign Out" slotProps={{ primary: { fontWeight: 500, fontSize: '0.875rem' } }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { md: 'none' },
          bgcolor: 'white',
          borderBottom: 1,
          borderColor: 'grey.200',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
              <img src="./Image/Logo.png" alt="Logo" style={{ height: '100%', objectFit: 'contain' }} />
            </Box>
            <Typography variant="h6" fontWeight="bold" color="text.primary" letterSpacing={-0.5}>
              Admin Panel
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.secondary' }}>
            <Menu size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: 1, borderColor: 'grey.200' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: 1, borderColor: 'grey.200' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}
