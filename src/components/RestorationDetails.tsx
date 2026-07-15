import React, { useState, useEffect, useMemo } from "react";
import { useParams, Navigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress
} from "@mui/material";
import { RestorationImage } from "../types/restoration.type";
import { ArrowLeft } from "lucide-react";
import { useData } from "../context/DataContext";

export default function RestorationDetails() {
  const { id } = useParams<{ id: string }>();
  const { restorations: allRestorations, loading: contextLoading } = useData();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomRestorations, setRandomRestorations] = useState<RestorationImage[]>([]);

  const restoration = useMemo(() => {
    if (!id || allRestorations.length === 0) return null;
    return allRestorations.find((r: any) => r.id === id) ?? null;
  }, [id, allRestorations]);

  useEffect(() => {
    if (!contextLoading && id) {
      setLoading(false);
      if (restoration) {
        const otherItems = allRestorations.filter((r: any) => r.id !== id);
        const shuffled = [...otherItems].sort(() => 0.5 - Math.random());
        setRandomRestorations(shuffled.slice(0, 3));
      } else if (allRestorations.length > 0) {
        setError(true);
      }
    }
  }, [contextLoading, id, restoration, allRestorations]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="error" />
      </Container>
    );
  }

  if (error || !restoration) {
    return <Navigate to="/404" replace />;
  }

  const RED_PRIMARY = "#D32F2F";
  const RED_LIGHT = "#FFEBEE";

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Back Navigation */}
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowLeft size={16} />}
        sx={{
          mb: 3,
          color: RED_PRIMARY,
          "&:hover": { backgroundColor: RED_LIGHT },
        }}
      >
        Back to Home
      </Button>

      {/* Main Detail Section */}
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          mb: 6,
          backgroundColor: "background.paper",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          p: { xs: 2, md: 4 }
        }}
      >
        <Grid container spacing={4}>
          {/* Left Column: Images side by side */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    bgcolor: 'background.default',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={restoration.before_image_url}
                    alt="Before Restoration"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', px: 2, py: 0.5, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Before
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    bgcolor: 'background.default',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={restoration.after_image_url}
                    alt="After Restoration"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <Box sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(211,47,47,0.9)', color: 'white', px: 2, py: 0.5, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
                    After
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column: Text Details */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', pt: 2 }}>
              <Typography variant="h3" fontWeight="800" color="text.primary" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.2 }}>
                {restoration.title}
              </Typography>
              
              <Box sx={{ width: 60, height: 4, bgcolor: RED_PRIMARY, borderRadius: 2, mb: 4 }} />
              
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: 1.7 }}>
                {restoration.description || "No description provided for this restoration."}
              </Typography>
              
              <Box sx={{ mt: 'auto', pt: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
                  Need your photos restored?
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/contact" 
                  variant="contained" 
                  color="error" 
                  size="large" 
                  fullWidth
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, fontSize: '1.1rem', textTransform: 'none' }}
                >
                  Contact Us Today
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* More Restorations Section */}
      {randomRestorations.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" color="text.primary" mb={4}>
            More Restorations
          </Typography>
          <Grid container spacing={4}>
            {randomRestorations.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box 
                  component={RouterLink} 
                  to={`/restorations/${item.id}`}
                  sx={{ 
                    display: 'block',
                    textDecoration: 'none',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4/5',
                      bgcolor: 'background.default'
                    }}
                  >
                    <Box component="img" src={item.after_image_url} alt="After" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </Box>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="700" color="text.primary" noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="error.main" fontWeight="600" sx={{ mt: 0.5 }}>
                      View Details &rarr;
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
