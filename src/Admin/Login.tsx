import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Link as MuiLink,
  Divider
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // TODO: Connect to backend authentication
    // For now, mock a successful login redirect
    navigate('/admin');
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: '#f9fafb', // Very light grey background for contrast
        p: 2
      }}
    >
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          borderTop: '6px solid',
          borderColor: 'error.main',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white'
        }}
      >
        
        {/* Brand / System Name */}
        <Box sx={{ 
          width: 64, 
          height: 64, 
          bgcolor: '#fff1f2', // light red background
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 2,
          border: '1px solid',
          borderColor: 'error.100'
        }}>
          <Lock size={32} color="#d32f2f" />
        </Box>

        <Typography variant="h4" fontWeight="800" color="error.main" mb={0.5} align="center" letterSpacing={-0.5}>
          Studio Mero Click
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4} align="center">
          Sign in to access the admin portal
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              color="error"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} color="#9e9e9e" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              color="error"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color="#9e9e9e" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            size="large"
            sx={{ 
              py: 1.5, 
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: 2,
              mb: 4,
              '&:hover': {
                boxShadow: 4
              }
            }}
          >
            Sign In
          </Button>
        </form>

        <Divider sx={{ width: '100%', mb: 3 }} />

        {/* Redirect Navigation to Home */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <MuiLink 
            component={Link} 
            to="/" 
            color="text.secondary"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: 'error.main' }
            }}
          >
            <ArrowLeft size={18} />
            <Typography variant="body2" fontWeight="600">
              Return to Website
            </Typography>
          </MuiLink>
        </Box>

      </Paper>
    </Box>
  );
}
