import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        bgcolor: 'grey.50', 
        flexDirection: { xs: 'column', md: 'row' } 
      }}
    >
      <AdminNavbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          mt: { xs: '64px', md: 0 }, 
          p: { xs: 2, md: 4 } 
        }}
        className="custom-scrollbar"
      >
        <Container maxWidth="xl" disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
