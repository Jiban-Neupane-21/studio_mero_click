import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        color: 'text.primary',
        px: 2,
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Logo Animation */}
          <Box
            component={motion.img}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
            src="/Logo.png"
            alt="Studio Mero Click Logo"
            sx={{
              width: { xs: 120, md: 160 },
              height: 'auto',
              mb: 2,
              filter: 'drop-shadow(0px 10px 20px rgba(229, 9, 20, 0.15))'
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '4.5rem', md: '7rem' },
              color: '#E50914',
              lineHeight: 1,
              textShadow: '0px 10px 30px rgba(229, 9, 20, 0.25)',
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: '85%',
              lineHeight: 1.6,
            }}
          >
            Oops! The page you are looking for at Studio Mero Click doesn't exist or might have been moved.
          </Typography>

          <Button
            variant="contained"
            startIcon={<Home size={18} />}
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #E50914 0%, #B71C1C 100%)',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(229, 9, 20, 0.35)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff4c4c 0%, #a60000 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 30px rgba(229, 9, 20, 0.45)',
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}