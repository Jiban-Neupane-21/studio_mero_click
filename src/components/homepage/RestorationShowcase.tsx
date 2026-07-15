import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, Grid, Button, Skeleton } from "@mui/material";
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
        const [data] = await Promise.all([
          restorationApi.getRestorations(),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
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

  if (!loading && restorations.length === 0) {
    return null; // Don't render section if no items
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default', transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="xl">
        <Box sx={{
          textAlign: "left",
          mb: 6,
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
        }}>

          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: {
                xs: "1.8rem",
                md: "2.25rem",
              },
            }}
          >
            Image <Box component="span" sx={{ color: "#d32f2f" }}>Restoration</Box>

          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)'
            },
            gap: 2,
          }}
        >
          {loading ? (
            [...Array(5)].map((_, index) => (
              <Box key={`skeleton-${index}`}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  <Box sx={{ p: 1.5 }}>
                    <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '4/5', borderRadius: 3 }} animation="wave" />
                  </Box>
                  <Box sx={{ p: 2, pt: 1, textAlign: 'left', flexGrow: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} animation="wave" />
                    <Skeleton variant="text" width="60%" animation="wave" />
                    <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Skeleton variant="rectangular" width="100%" height={36} animation="wave" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            restorations.map((item) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
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
                        bgcolor: 'background.default'
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
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3, mb: 1 }}>
                      {item.title}
                    </Typography>
                    {item.description && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2 }}>
                        {item.description}
                      </Typography>
                    )}
                    <Box sx={{ mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
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
              </Box>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}
