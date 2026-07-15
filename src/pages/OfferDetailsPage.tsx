import React, { useState, useEffect, useMemo } from "react";
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
  CircularProgress,
  Skeleton,
  useTheme
} from "@mui/material";
import { ArrowLeft, Tag, Calendar } from "lucide-react";
import { OfferAd } from "../types";
import { useData } from "../context/DataContext";
import { useMinDelay } from "../hooks/useMinDelay";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/common/ScrollReveal";

export default function OfferDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const { offerAds: allOffers, loading: contextLoading } = useData();
  const loadingSkeleton = useMinDelay(contextLoading);

  const offer = useMemo(() => {
    if (!id || allOffers.length === 0) return null;
    return allOffers.find((o) => o.id === id) ?? null;
  }, [id, allOffers]);

  const otherOffers = useMemo(() => {
    if (!id) return allOffers;
    return allOffers.filter((o) => o.id !== id);
  }, [id, allOffers]);

  useEffect(() => {
    if (!contextLoading && !offer && allOffers.length > 0) {
      navigate("/claim-offer");
    }
  }, [contextLoading, offer, allOffers, navigate]);

  const RED_PRIMARY = "#D32F2F";
  const RED_LIGHT = isDark ? "rgba(211, 47, 47, 0.12)" : "#FFEBEE";
  const WHITE = "#FFFFFF";
  const BG_PAPER = theme.palette.background.paper;
  const BG_DEFAULT = theme.palette.background.default;
  const BORDER_COLOR = theme.palette.divider;

  if (loadingSkeleton) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Skeleton variant="rounded" width={140} height={36} sx={{ mb: 3 }} />
        <Paper elevation={3} sx={{ overflow: "hidden", mb: 4, backgroundColor: BG_PAPER, borderRadius: 2, border: "1px solid", borderColor: BORDER_COLOR }}>
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2 }}>
                <Skeleton variant="rounded" width="100%" sx={{ height: { xs: 300, md: 450 }, borderRadius: 1.5 }} animation="wave" />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Skeleton variant="rounded" width={80} height={24} />
                  <Skeleton variant="rounded" width={60} height={24} />
                  <Skeleton variant="rounded" width={120} height={24} />
                </Box>
                <Skeleton variant="text" width="70%" height={48} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={40} sx={{ my: 2 }} />
                <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
                  <Skeleton variant="rounded" width="50%" height={48} />
                  <Skeleton variant="rounded" width="50%" height={48} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  if (!offer) return null;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Back Navigation */}
      <ScrollReveal animation="fadeUp">
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
      </ScrollReveal>

      {/* Main Hero Card */}
      <ScrollReveal animation="fadeUp" delay={0.1}>
      <Paper
        elevation={3}
        sx={{
          overflow: "hidden",
          mb: 4,
          backgroundColor: BG_PAPER,
          borderRadius: 2,
          border: "1px solid",
          borderColor: BORDER_COLOR,
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
                backgroundColor: BG_PAPER,
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
                  backgroundColor: BG_DEFAULT,
                  border: "1px solid",
                  borderColor: BORDER_COLOR,
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
                backgroundColor: BG_PAPER,
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
                    sx={{ fontWeight: "600", color: "text.secondary" }}
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
                  color: "text.primary",
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
      </ScrollReveal>

      {/* Secondary Information Layout Stack - Terms & Conditions */}
      <ScrollReveal animation="fadeUp" delay={0.15}>
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
      </ScrollReveal>

      {/* Other Offers Section */}
      {otherOffers.length > 0 && (
        <ScrollReveal animation="fadeUp">
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, mb: 4, color: "text.primary" }}
          >
            Explore Other Offers
          </Typography>
          <StaggerContainer staggerDelay={0.08}>
          <Grid container spacing={4}>
            {otherOffers.map((other) => (
              <StaggerItem key={other.id}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              </StaggerItem>
            ))}
          </Grid>
          </StaggerContainer>
        </Box>
        </ScrollReveal>
      )}
    </Container>
  );
}
