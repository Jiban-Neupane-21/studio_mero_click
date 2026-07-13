import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress
} from "@mui/material";
import { ArrowLeft, Tag, Calendar } from "lucide-react";
import { apiService } from "../utils/supabase";
import { OfferAd } from "../types";

export default function OfferDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<OfferAd | null>(null);
  const [otherOffers, setOtherOffers] = useState<OfferAd[]>([]);
  const [loading, setLoading] = useState(true);

  // Theme Constants (matching ServiceDetails)
  const RED_PRIMARY = "#D32F2F";
  const RED_LIGHT = "#FFEBEE";
  const WHITE = "#FFFFFF";

  useEffect(() => {
    const fetchOffer = async () => {
      setLoading(true);
      try {
        const data = await apiService.getOffers();
        const found = data.find((o) => o.id === id);
        if (found) {
          setOffer(found);
          setOtherOffers(data.filter((o) => o.id !== id));
        } else {
          navigate("/claim-offer");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: RED_PRIMARY }} />
      </Box>
    );
  }

  if (!offer) return null;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Back Navigation */}
      <Button
        onClick={() => navigate("/claim-offer")}
        startIcon={<ArrowLeft size={16} />}
        sx={{
          mb: 3,
          color: RED_PRIMARY,
          textTransform: "none",
          "&:hover": { backgroundColor: RED_LIGHT },
        }}
      >
        Back to Offers
      </Button>

      {/* Main Hero Card */}
      <Paper
        elevation={3}
        sx={{
          overflow: "hidden",
          mb: 4,
          backgroundColor: WHITE,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Grid container>
          {/* Left Column: Visuals */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: WHITE,
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={offer.image}
                alt={offer.title}
                sx={{
                  width: "100%",
                  height: { xs: 300, sm: 400, md: "100%" },
                  minHeight: { md: 450 },
                  objectFit: "cover",
                  borderRadius: 1.5,
                  backgroundColor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.100",
                }}
              />
            </Box>
          </Grid>

          {/* Right Column: Key Details */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: WHITE,
              }}
            >
              {/* Category & Badge Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <Chip
                  label={offer.targetCategory}
                  sx={{
                    backgroundColor: RED_PRIMARY,
                    color: WHITE,
                    fontWeight: "bold",
                  }}
                  size="small"
                />
                {offer.badge && (
                  <Chip
                    label={offer.badge}
                    sx={{
                      backgroundColor: RED_LIGHT,
                      color: RED_PRIMARY,
                      fontWeight: "600",
                    }}
                    size="small"
                  />
                )}
                {offer.validUntil && (
                  <Chip
                    label={`Valid until: ${offer.validUntil}`}
                    variant="outlined"
                    color="default"
                    size="small"
                    sx={{ fontWeight: "600", color: "grey.600" }}
                  />
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "grey.900",
                }}
              >
                {offer.title}
              </Typography>

              {/* Detailed Long Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                component="p"
                sx={{ lineHeight: 1.7, mb: 3 }}
              >
                {offer.description}
              </Typography>

              {/* Discount Block */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 4,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 700,
                    color: RED_PRIMARY,
                  }}
                >
                  {offer.discount}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: "auto", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  component={RouterLink}
                  to={`/book?serviceId=${encodeURIComponent(offer.targetCategory)}`}
                  variant="contained"
                  size="large"
                  startIcon={<Calendar size={18} />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: RED_PRIMARY,
                    color: WHITE,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#B71C1C",
                    },
                  }}
                >
                  Book Session Now
                </Button>

                <Button
                  component={RouterLink}
                  to={`/claim-offer?offerId=${offer.id}`}
                  variant="outlined"
                  size="large"
                  startIcon={<Tag size={18} />}
                  fullWidth
                  sx={{
                    py: 1.5,
                    color: RED_PRIMARY,
                    borderColor: RED_PRIMARY,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#B71C1C",
                      backgroundColor: RED_LIGHT,
                    },
                  }}
                >
                  Claim Offer
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Secondary Information Layout Stack - Terms & Conditions */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, mb: 2 }}
          >
            Terms & Conditions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {offer.terms || "Standard studio terms and conditions apply. This offer cannot be combined with other ongoing promotions. Booking must be made before the offer expires to lock in the discount rate."}
          </Typography>
        </Grid>
      </Grid>

      {/* Other Offers Section */}
      {otherOffers.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 4, color: "grey.900" }}
          >
            Explore Other Offers
          </Typography>
          <Grid container spacing={4}>
            {otherOffers.map((other) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={other.id}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={other.image}
                    alt={other.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip
                      label={other.targetCategory}
                      sx={{
                        backgroundColor: RED_LIGHT,
                        color: RED_PRIMARY,
                        fontWeight: "bold",
                        width: "fit-content",
                        mb: 2
                      }}
                      size="small"
                    />
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                      {other.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {other.description?.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h5" sx={{ color: RED_PRIMARY, fontWeight: 'bold' }}>
                      {other.discount}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/offers/${other.id}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        color: RED_PRIMARY,
                        borderColor: RED_PRIMARY,
                        '&:hover': {
                          backgroundColor: RED_PRIMARY,
                          color: WHITE,
                          borderColor: RED_PRIMARY
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
