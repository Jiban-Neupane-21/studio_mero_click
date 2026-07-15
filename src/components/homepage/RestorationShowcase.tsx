import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, CircularProgress, Grid, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { restorationApi } from "../../api/restoration";
import { RestorationImage } from "../../types/restoration.type";
import { MoveHorizontal } from "lucide-react";

export default function RestorationShowcase() {
  const [restorations, setRestorations] = useState<RestorationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchRestorations = async () => {
      try {
        const data = await restorationApi.getRestorations();
        setRestorations(data);
        // Initialize all sliders to 50%
        const initialPositions: { [key: string]: number } = {};
        data.forEach(item => {
          initialPositions[item.id] = 50;
        });
        setSliderPositions(initialPositions);
      } catch (error) {
        console.error("Failed to fetch restoration images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestorations();
  }, []);

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions(prev => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (restorations.length === 0) {
    return null; // Don't render section if no items
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.75rem" },
              color: "text.primary",
              mb: 2,
            }}
          >
            Image <Box component="span" sx={{ color: "#d32f2f" }}>Restoration</Box>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}
          >
            Watch the magic happen. Drag the slider to see how we bring old, blurred, or damaged photos back to life.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {restorations.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  bgcolor: 'white',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <Box sx={{ p: 1.5 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      aspectRatio: '4/5',
                      bgcolor: '#eee'
                    }}
                  >
                {/* Before Image (Base) */}
                <Box
                  component="img"
                  src={item.before_image_url}
                  alt="Before Restoration"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none'
                  }}
                />

                {/* After Image (Overlay with Clip Path) */}
                <Box
                  component="img"
                  src={item.after_image_url}
                  alt="After Restoration"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                    clipPath: `inset(0 0 0 ${sliderPositions[item.id] || 50}%)`
                  }}
                />

                {/* Visible Slider Handle Line */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderPositions[item.id] || 50}%`,
                    width: '4px',
                    bgcolor: 'white',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      color: '#424242'
                    }}
                  >
                    <MoveHorizontal size={20} strokeWidth={2.5} />
                  </Box>
                </Box>

                {/* Invisible Range Input for Dragging */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPositions[item.id] || 50}
                  onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'ew-resize',
                    margin: 0
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ p: 2, pt: 1, textAlign: 'left', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#102a43', lineHeight: 1.3, mb: 1 }}>
                {item.title}
              </Typography>
              {item.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2 }}>
                  {item.description}
                </Typography>
              )}
              <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'grey.100' }}>
                <Button 
                  component={RouterLink} 
                  to={`/restorations/${item.id}`}
                  variant="text" 
                  color="error" 
                  fullWidth
                  sx={{ textTransform: 'none', fontWeight: 600, justifyContent: 'center' }}
                >
                  View More Detail
                </Button>
              </Box>
            </Box>
          </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
